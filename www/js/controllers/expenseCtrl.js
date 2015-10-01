/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseCtrl', ['$stateParams', '$scope', 'gdApi', ExpenseCtrl]);

    function ExpenseCtrl($stateParams, $scope, gdApi) {

        $scope.$on('$ionicView.enter', function () {
            // put this here in case group details change
            $scope.currency = gdApi.getGroupCurrency($stateParams.gid);
            $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        });

        $scope.gid = $stateParams.gid;

        gdApi.fetchExpensesData($stateParams.gid).then(
            function (expensesData) {
                $scope.expenses = expensesData;
                console.log(expensesData[0]);
            },
            function (msg) {
                logErrorMessage(msg);
            }
        );


        //$scope.expenses = gdApi.getExpenses($stateParams.gid);
    }


})();