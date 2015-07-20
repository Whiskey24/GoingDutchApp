/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseDetailCtrl', ['$stateParams', '$scope', '$filter', '$state', '$cordovaDialogs', '$cordovaDatePicker', 'gdApi', '$ionicHistory', ExpenseDetailCtrl]);


    function ExpenseDetailCtrl($stateParams, $scope, $filter, $state, $cordovaDialogs, $cordovaDatePicker,gdApi, $ionicHistory) {

        $scope.$on('$ionicView.enter', function () {
            // put this here in case group details change
            $scope.currency = gdApi.getGroupCurrency($stateParams.gid);
        });


        //TODO: implement this (needs Ionic 1.0.1): http://stackoverflow.com/questions/28676631/is-it-possible-to-clear-the-view-cache-in-ionic/30224972#30224972


        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = Number($stateParams.gid);
        $scope.eid = Number($stateParams.eid);
        $scope.expense = gdApi.getExpense($scope.gid, $scope.eid);
        if ($scope.eid > 0)
            $scope.participants = $scope.expense.uids.split(",");
        else
            $scope.participants = [];


        $scope.members = gdApi.getGroupMembers($stateParams.gid);

        $scope.memberName = function (uid) {
            return gdApi.getUserName(uid);
        };

        $scope.formatDateTimeLocal = function (timestamp, offset) {
            return $scope.formatDateTime(timestamp - offset * 60);
        };

        $scope.formatDateTime = function (timestamp) {
            return $filter('date')(timestamp * 1000, gdApi.getDateFormat(), 'UTC');
        };

        $scope.formatDateLocal = function (timestamp, offset) {
            return $scope.formatDate(timestamp - offset * 60);
        };

        $scope.formatDate = function (timestamp) {
            return $filter('date')(timestamp * 1000, gdApi.getDateFormat('date'), 'UTC');
        };

        $scope.formatTimeLocal = function (timestamp, offset) {
            return $scope.formatTime(timestamp - offset * 60);
        };

        $scope.formatTime = function (timestamp) {
            return $filter('date')(timestamp * 1000, gdApi.getDateFormat('time'), 'UTC');
        };

        $scope.showConfirm = function (eid) {
            $cordovaDialogs.confirm('Are you sure you want to delete this expense?', 'Delete Expense', ['OK', 'Cancel'])
                .then(function (buttonIndex) {
                    if (buttonIndex == 1) {
                        gdApi.deleteExpense(eid, $scope.gid);
                        $state.go('group.expenses', {gid: $scope.gid});
                    }
                });
        };

        $scope.checkMember = function (uid) {
            if ($scope.participants.indexOf(uid) >= 0) {
                console.log("UID " + uid + " checked");
                return true;
            } else {
                console.log("UID " + uid + " NOT checked");
                return false;
            }
        };

        $scope.flipMember = function (uid) {
           var index = $scope.participants.indexOf(uid);
            if (index > -1)
                $scope.participants.splice(index,1);
              else
                $scope.participants.push(uid);
            $scope.expense.uids = $scope.participants.join();
        };

        $scope.saveExpense = function() {
            $ionicHistory.clearCache().then(function(){ $state.go('group.expense-detail', {gid: $scope.gid, eid: $scope.eid})});
        };

        //var options = {
        //    date: new Date(),
        //    mode: 'date', // or 'time'
        //    minDate: new Date() - 10000,
        //    allowOldDates: true,
        //    allowFutureDates: true,
        //    doneButtonLabel: 'DONE',
        //    doneButtonColor: '#F2F3F4',
        //    cancelButtonLabel: 'CANCEL',
        //    cancelButtonColor: '#000000'
        //};
        //$scope.pickDate = function (dateOrTime) {
        //    if (dateOrTime == 'time') {
        //        options.mode = 'time';
        //    } else {
        //        options.mode = 'date';
        //    }
        //    $cordovaDatePicker.show(options).then(function (date) {
        //        alert(date);
        //    });
        //};

        var expenseTimestampUTC = $scope.expense.ecreated;
        var expenseTimestampLocal = expenseTimestampUTC - ($scope.expense.timezoneoffset * 60);
        var dayInSeconds = 60 * 60 * 24;
        var expenseTimeEpochLocalSec = expenseTimestampLocal % dayInSeconds; // remainder of dividing timestamp seconds with seconds in a day
        var expenseTimeEpochLocalSecDay = expenseTimestampLocal - expenseTimeEpochLocalSec;
        var expenseTimeEpochLocalSecRounded = expenseTimeEpochLocalSec - (expenseTimeEpochLocalSec % 60);  // we only care about rounding to minutes

        console.log('expenseTimeEpochLocal:' + expenseTimeEpochLocalSecRounded);

        $scope.expenseDateUTC = new Date(($scope.expense.ecreated - ($scope.expense.timezoneoffset * 60)) * 1000);
        console.log("Time=" + $scope.expenseDateUTC.getHours() * 60 + "+" + $scope.expenseDateUTC.getMinutes() + "=" + ($scope.expenseDateUTC.getHours() * 60 + $scope.expenseDateUTC.getMinutes()));
        //$scope.slots = {epochTime:  ($scope.expenseDateUTC.getHours()*60+ $scope.expenseDateUTC.getMinutes())*60, format: 24, step: 1};

        $scope.slots = {epochTime: expenseTimeEpochLocalSecRounded, format: 24, step: 15};

        $scope.timePickerCallback = function (val) {
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
                $scope.expense.ecreated = expenseTimeEpochLocalSecDay + val + ($scope.expense.timezoneoffset * 60);
                $scope.expense.eupdated = Math.floor(Date.now() / 1000);
                gdApi.updateExpense($scope.gid, $scope.expense);
            }
        };

        $scope.datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                console.log('Date not selected');
            } else {
                console.log('Selected date is : ', val);
            }
        };

        //console.log($scope.expense);
    }

})
();