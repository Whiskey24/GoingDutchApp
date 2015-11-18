/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseCtrl', ['$stateParams', '$scope', '$filter', 'gdApi', ExpenseCtrl]);

    function ExpenseCtrl($stateParams, $scope, $filter, gdApi) {

        $scope.$on('$ionicView.enter', function () {
            // put this here in case group details change
            $scope.currency = gdApi.getGroupCurrency($stateParams.gid);
            $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        });

        $scope.gid = $stateParams.gid;


        $scope.$watch(
            function () {
                return gdApi.expenseCacheCreated($scope.gid);
            },

            function(newVal, oldVal) {
                console.log("Groups were updated, reloading");
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


        //$scope.expenses = gdApi.getExpenses($stateParams.gid);
    }


})();