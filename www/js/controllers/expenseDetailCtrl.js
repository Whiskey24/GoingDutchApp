/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseDetailCtrl', ['$stateParams', '$scope', '$filter', '$state', 'iso4217', '$cordovaDialogs', '$cordovaDatePicker', 'gdApi', '$ionicHistory', ExpenseDetailCtrl]);


    function ExpenseDetailCtrl($stateParams, $scope, $filter, $state, iso4217, $cordovaDialogs, $cordovaDatePicker,gdApi, $ionicHistory) {

        $scope.$on('$ionicView.enter', function () {
            // put this here in case group details change
            $scope.currency = gdApi.getGroupCurrency($stateParams.gid);
        });

        $scope.newExpense = false;

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = Number($stateParams.gid);
        $scope.eid = Number($stateParams.eid);
        $scope.expense = gdApi.getExpense($scope.gid, $scope.eid);
        if ($scope.eid > 0) {
            if (typeof ($scope.expense.uids) === "string")
                $scope.participants = $scope.expense.uids.split(",");
            else
                $scope.participants = [ $scope.expense.uids ];
        }

        else {
            $scope.newExpense = true;
            $scope.participants = [];
            $scope.expense = {};
            $scope.expense.ecreated = Math.floor(Date.now() / 1000);
            $scope.expense.timezoneoffset = new Date().getTimezoneOffset();
        }


        $scope.members = gdApi.getGroupMembers($stateParams.gid);

        $scope.memberNames = [];
        Object.keys($scope.members).forEach(function (key) {
            // do something with obj[key]
            $scope.memberNames.push({uid: Number(key), name:gdApi.getUserName(key)})
        });


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
            if ($scope.participants.length == 1 && $scope.participants[0] == uid) {
                return true;
            }
            if ($scope.participants.indexOf(uid) >= 0) {
                // console.log("UID " + uid + " checked");
                return true;
            } else {
                // console.log("UID " + uid + " NOT checked");
                return false;
            }
        };

        $scope.flipMember = function (uid) {
           var index = $scope.participants.indexOf(uid);
            if (index > -1)
                $scope.participants.splice(index,1);
              else
                $scope.participants.push(uid);
        };

        $scope.selectedCurrencyCode = gdApi.getGroupCurrency($stateParams.gid);
        $scope.selectedCurrency = iso4217.getCurrencyByCode($scope.selectedCurrencyCode);

        var expenseTimestampUTC = $scope.expense.ecreated;
        var expenseTimestampLocal = expenseTimestampUTC - ($scope.expense.timezoneoffset * 60);
        var dayInSeconds = 60 * 60 * 24;
        var expenseTimeEpochLocalSec = expenseTimestampLocal % dayInSeconds; // remainder of dividing timestamp seconds with seconds in a day
        var expenseTimeEpochLocalSecDay = expenseTimestampLocal - expenseTimeEpochLocalSec;
        var expenseTimeEpochLocalSecRounded = expenseTimeEpochLocalSec - (expenseTimeEpochLocalSec % 60);  // we only care about rounding to minutes

        $scope.expenseDateUTC = new Date(($scope.expense.ecreated - ($scope.expense.timezoneoffset * 60)) * 1000);
        // console.log("Time=" + $scope.expenseDateUTC.getHours() * 60 + "+" + $scope.expenseDateUTC.getMinutes() + "=" + ($scope.expenseDateUTC.getHours() * 60 + $scope.expenseDateUTC.getMinutes()));
        // $scope.slots = {epochTime:  ($scope.expenseDateUTC.getHours()*60+ $scope.expenseDateUTC.getMinutes())*60, format: 24, step: 1};

        $scope.slots = {epochTime: expenseTimeEpochLocalSecRounded, format: 24, step: 15};

        $scope.timePickerCallback = function (val) {
            if (typeof (val) === 'undefined') {
                // console.log('Time not selected');
            } else {
                $scope.newValues.time = val + ($scope.expense.timezoneoffset * 60);
            }
        };

        $scope.datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                // console.log('Date not selected');
            } else {
                $scope.newValues.date = Math.floor(val.getTime()/ 1000) - ($scope.expense.timezoneoffset * 60);
            }
        };

        $scope.categories = gdApi.getGroupCategories($scope.gid);
        $scope.category = gdApi.getGroupCategory($scope.gid, $scope.expense.cid);


        $scope.newValues = {
            date: expenseTimeEpochLocalSecDay,
            time: expenseTimeEpochLocalSecRounded + ($scope.expense.timezoneoffset * 60),
            title: $scope.expense.etitle,
            paidBy: $scope.expense.uid,
            cid: $scope.expense.cid
        }

        if ($scope.newExpense) {
            $scope.newValues.paidBy = $scope.memberNames[0].uid;
            $scope.newValues.cid = $scope.categories[0].cid;
        }

        $scope.saveExpense = function() {
            $scope.expense.etitle = $scope.newValues.title;
            $scope.expense.ecreated = $scope.newValues.date + $scope.newValues.time   ;
            $scope.expense.eupdated = Math.floor(Date.now() / 1000);
            $scope.expense.uids = $scope.participants.join();
            $scope.expense.uid = $scope.newValues.paidBy;
            $scope.expense.cid = $scope.newValues.cid;

            if (!$scope.newExpense) {
                gdApi.updateExpense($scope.gid, $scope.expense);
                $ionicHistory.clearCache().then((function () {
                    return $state.go('group.expense-detail', {gid: $scope.gid, eid: $scope.eid})
                }));
            } else {
                console.log($scope.expense);
                gdApi.addExpense($scope.gid, $scope.expense);
                $ionicHistory.clearCache().then((function () {
                    return $state.go('group.expenses')
                }));
            }

        };

    }

})
();