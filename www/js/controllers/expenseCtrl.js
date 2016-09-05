/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseCtrl', ['$stateParams', '$scope', '$filter', 'gdApi', '$log', '$ionicFilterBar', ExpenseCtrl]);

    function ExpenseCtrl($stateParams, $scope, $filter, gdApi, $log, $ionicFilterBar) {

        //$scope.$on('$ionicView.enter', function () {
        //    // put this here in case group details change
        //    $scope.currency = gdApi.getGroupCurrency($stateParams.gid);
        //    $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        //});

        var filterBarInstance;

        $scope.gid = $stateParams.gid;

        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.expenses,
                update: function (filteredItems, filterText) {
                    $scope.expenses = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };

        gdApi.fetchGroupsData().then(
            function (groupsData) {
                $scope.groups = groupsData;
                //console.log($scope.groups);
            },
            function (msg) {
                logErrorMessage(msg);
            }
        ).then(function () {
                var members = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'members')[0];
                $scope.members =  gdApi.sortByKey(members, 'balance', 'DESC');
                $scope.currency = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'currency')[0];
                $scope.groupTitle = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'name')[0];
            }
        );

        $scope.$watch(
            function () {
                return gdApi.expenseCacheCreated($scope.gid);
            },

            function(newVal, oldVal) {
                $log.info("Groups were updated, reloading");
                //console.log(newVal);
                //console.log(oldVal);
                updateExpenseList();
            }, true
        );

        function updateExpenseList() {
            gdApi.fetchExpensesData($stateParams.gid).then(
                function (expensesData) {
                    $scope.expenses = expensesData;
                    //console.log(expensesData[0]);
                },
                function (msg) {
                    logErrorMessage(msg);
                }
            );
        }

        $scope.doRefresh = function() {
            gdApi.fetchExpensesData($stateParams.gid, true).then(
                function (expensesData) {
                    $scope.expenses = expensesData;
                    // $log.debug(expensesData);
                    // var expenses_paid = _.filter($scope.expenses, {'uid': 4});
                    // $log.debug(expenses_paid);
                },
                function (msg) {
                    logErrorMessage(msg);
                }
            ).finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });

            gdApi.fetchGroupsData(true).then(
                function (groupsData) {
                    $scope.groups = groupsData;
                },
                function (msg) {
                    logErrorMessage(msg);
                }
            );

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

        function logErrorMessage(error) {
            $log.info("Error: " + error);
        }

        //$scope.expenses = gdApi.getExpenses($stateParams.gid);
    }


})();