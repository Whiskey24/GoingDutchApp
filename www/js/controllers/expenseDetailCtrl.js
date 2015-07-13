/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
        'use strict';

        angular.module('GoingDutchApp').controller('ExpenseDetailCtrl', ['$stateParams', '$scope', '$filter', '$state', '$cordovaDialogs', '$cordovaDatePicker', 'gdApi', ExpenseDetailCtrl]);


        function ExpenseDetailCtrl($stateParams, $scope, $filter, $state, $cordovaDialogs, $cordovaDatePicker, gdApi) {

            $scope.$on('$ionicView.enter', function () {
                // put this here in case group details change
                $scope.currency = gdApi.getGroupCurrency($stateParams.gid);
            });

            $scope.groupTitle = gdApi.getGroupTitle($stateParams);
            $scope.gid = Number($stateParams.gid);
            $scope.eid = Number($stateParams.eid);
            $scope.expense = gdApi.getExpense($scope.gid, $scope.eid);
            if ($scope.eid > 0)
                $scope.participants = $scope.expense.uids.split(",");
            else
                $scope.participants = [];


            $scope.memberName = function (uid) {
                return gdApi.getUserName(uid);
            };

            $scope.formatDateTimeLocal = function (timestamp, offset) {
                return $scope.formatDateTime(timestamp - offset * 60);
            };

            $scope.formatDateTime = function (timestamp) {
                return $filter('date')(timestamp * 1000, gdApi.getDateFormat());
            };

            $scope.formatDateLocal = function (timestamp, offset) {
                return $scope.formatDate(timestamp - offset * 60);
            };

            $scope.formatDate = function (timestamp) {
                return $filter('date')(timestamp * 1000, gdApi.getDateFormat('date'));
            };

            $scope.formatTimeLocal = function (timestamp, offset) {
                return $scope.formatTime(timestamp - offset * 60);
            };

            $scope.formatTime = function (timestamp) {
                return $filter('date')(timestamp * 1000, gdApi.getDateFormat('time'));
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

            $scope.expenseDate = new Date(($scope.expense.ecreated-($scope.expense.timezoneoffset *60))*1000);
            console.log("Time=" + $scope.expenseDate.getHours()*60 + "+" + $scope.expenseDate.getMinutes() + "=" + ($scope.expenseDate.getHours()*60+ $scope.expenseDate.getMinutes()));
            $scope.slots = {epochTime:  ($scope.expenseDate.getHours()*60+ $scope.expenseDate.getMinutes())*60, format: 24, step: 1};
            $scope.timePickerCallback = function (val) {
                if (typeof (val) === 'undefined') {
                    console.log('Time not selected');
                } else {
                    console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
                }
            };

            $scope.datePickerCallback = function (val) {
                if(typeof(val)==='undefined'){
                    console.log('Date not selected');
                }else{
                    console.log('Selected date is : ', val);
                }
            };

            //console.log($scope.expense);
        }

    })
();