/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseDetailCtrl', ['$stateParams', '$scope', '$filter', '$state', 'iso4217', '$cordovaDialogs', '$cordovaDatePicker', 'gdApi', '$ionicHistory', '$log', ExpenseDetailCtrl]);


    function ExpenseDetailCtrl($stateParams, $scope, $filter, $state, iso4217, $cordovaDialogs, $cordovaDatePicker,gdApi, $ionicHistory, $log) {

        $scope.$on('$ionicView.enter', function () {
            // put this here in case expense details have been updated
            var cacheExpense = gdApi.checkTempCache(Number($stateParams.eid));
            if (cacheExpense){
                $scope.expense = cacheExpense;
                if (typeof ($scope.expense.uids) === "string")
                    $scope.participants = $scope.expense.uids.split(",");
                else
                    $scope.participants = [$scope.expense.uids];
                setExpenseProperties($scope.expense);

                if (gdApi.isOwner($scope.gid) || $scope.expense.uid == gdApi.UID())
                    $scope.canDelete = true;
            }
            //$log.debug($scope.participants);
        });

        var UID = gdApi.UID();
        $scope.newExpense = false;

        //$scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = Number($stateParams.gid);
        $scope.eid = Number($stateParams.eid);

        var dayInSeconds = 60 * 60 * 24;
        var expenseTimestampUTC;
        var expenseTimestampLocal;
        var expenseTimeEpochLocalSec; // remainder of dividing timestamp seconds with seconds in a day
        var expenseTimeEpochLocalSecDay;
        var expenseTimeEpochLocalSecRounded;  // we only care about rounding to minutes

        $scope.canDelete = false;

        updateExpenseDetails();

        $scope.$watch(
            function () {
                return gdApi.expenseCacheCreated($scope.gid);
            },

            function(newVal, oldVal) {
                $log.info("Expenses were updated, reloading");
                updateExpenseDetails();
            }, true
        );

        function updateExpenseDetails() {
            if ($scope.eid > 0) {
                gdApi.fetchExpensesData($stateParams.gid).then(
                    function (expensesData) {
                        $scope.expenses = expensesData;
                        $scope.expense = _.filter($scope.expenses, {'eid': Number($scope.eid)})[0];
                        // $log.debug($scope.expense);
                        if (typeof ($scope.expense.uids) === "string")
                            $scope.participants = $scope.expense.uids.split(",");
                        else
                            $scope.participants = [$scope.expense.uids];
                        setExpenseProperties($scope.expense);

                        if (gdApi.isOwner($scope.gid) || $scope.expense.uid == gdApi.UID())
                            $scope.canDelete = true;
                    },
                    function (msg) {
                        logErrorMessage(msg);
                    }
                );


            } else {
                $scope.newExpense = true;
                $scope.participants = [];
                $scope.expense = {};
                $scope.expense.ecreated = Math.floor(Date.now() / 1000);
                $scope.expense.timezoneoffset = new Date().getTimezoneOffset();
                setExpenseProperties($scope.expense);
            }
        }

        function setExpenseProperties() {
            expenseTimestampUTC = $scope.expense.ecreated;
            expenseTimestampLocal = expenseTimestampUTC - ($scope.expense.timezoneoffset * 60);
            expenseTimeEpochLocalSec = expenseTimestampLocal % dayInSeconds; // remainder of dividing timestamp seconds with seconds in a day
            expenseTimeEpochLocalSecDay = expenseTimestampLocal - expenseTimeEpochLocalSec;
            expenseTimeEpochLocalSecRounded = expenseTimeEpochLocalSec - (expenseTimeEpochLocalSec % 60);  // we only care about rounding to minutes
            $scope.expenseDateUTC = new Date(($scope.expense.ecreated - ($scope.expense.timezoneoffset * 60)) * 1000);
            $scope.slots = {epochTime: expenseTimeEpochLocalSecRounded, format: 24, step: 1};

            $scope.newValues = {
                date: expenseTimeEpochLocalSecDay,
                time: expenseTimeEpochLocalSecRounded + ($scope.expense.timezoneoffset * 60),
                title: $scope.expense.etitle,
                paidBy: $scope.expense.uid,
                cid: $scope.expense.cid
            };
        }

        var members;
        gdApi.fetchGroupsData().then(
            function (groupsData) {
                $scope.groups = groupsData;
            },
            function (msg) {
                logErrorMessage(msg);
            }
        ).then(
            function () {
                //members = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'members')[0];
                members = _.filter(_.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'members')[0], {'removed': 0});
                members =  gdApi.sortByKey(members, 'uid', 'ASC');

                $scope.currency = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'currency')[0];
                $scope.groupTitle = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'name')[0];

                $scope.selectedCurrencyCode = $scope.currency;
                $scope.selectedCurrency = iso4217.getCurrencyByCode($scope.selectedCurrencyCode);
                // console.log("PARSING GROUPS DATA");

                /*for (var key in membersSort ) {
                 if (membersSort .hasOwnProperty(key)) {
                 console.log(key + " -> " + membersSort [key]);
                 }
                 }*/
                $scope.members = {};
                for (var index in members){
                    $scope.members[members[index].uid] = members[index].balance;
                }
                $scope.categories = gdApi.getGroupCategories($scope.groups,$scope.gid);

                for (var j in $scope.categories) {
                    if ( $scope.categories[j].cid == $scope.expense.cid){
                        $scope.category = $scope.categories[j];
                        break;
                    }
                }

                if ($scope.newExpense) {
                    $scope.newValues.paidBy = UID;
                    $scope.newValues.cid = $scope.categories[0].cid;
                }
            }
        ).then(
            function () {
                gdApi.fetchUsersData().then(
                    function (usersData) {
                        $scope.users = usersData;
                        $scope.memberNames = {};
                        for (var index in usersData) {
                            if (usersData[index].uid in $scope.members) {
                                $scope.memberNames[usersData[index].uid] = {
                                    uid: usersData[index].uid,
                                    name: usersData[index].nickName
                                };
                            }
                        }
                    },
                    function (msg) {
                        logErrorMessage(msg);
                    }
                )
            }
        );

        $scope.memberName = function (uid) {
            if (typeof($scope.users[uid]) == 'undefined') {
                return "Error: user " + uid + " not found";
            }
            return $scope.users[uid]['nickName'];
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

        $scope.timePickerCallback = function (val) {
            if (typeof (val) === 'undefined') {
                // console.log('Time not selected');
            } else {
                $scope.newValues.time = val + ($scope.expense.timezoneoffset * 60);
            }
        };

        $scope.datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                // $log.debug('Date not selected');
            } else {
                $scope.newValues.date = Math.floor(val.getTime()/ 1000) - ($scope.expense.timezoneoffset * 60);
            }
        };

        $scope.saveExpense = function() {
            $scope.expense.etitle = $scope.newValues.title;
            $scope.expense.ecreated = $scope.newValues.date + $scope.newValues.time   ;
            $scope.expense.eupdated = Math.floor(Date.now() / 1000);
            $scope.expense.uids = $scope.participants.join();
            $scope.expense.uid = $scope.newValues.paidBy;
            $scope.expense.cid = $scope.newValues.cid;
            $scope.expense.gid = $scope.gid;
            $scope.expense.event_id = 0;

            if (!$scope.newExpense) {
                gdApi.updateExpense($scope.gid, $scope.expense);
                $ionicHistory.clearCache().then((function () {
                    return $state.go('group.expense-detail', {gid: $scope.gid, eid: $scope.eid})
                }));
            } else {
                gdApi.addExpense($scope.gid, $scope.expense);
                $ionicHistory.clearCache().then((function () {
                    return $state.go('group.expenses')
                }));
            }

        };

    }

})
();