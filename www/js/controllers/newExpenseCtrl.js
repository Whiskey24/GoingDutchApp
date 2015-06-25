/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('NewExpenseCtrl', ['$scope', '$stateParams', 'gdApi', NewExpenseCtrl]);

    function NewExpenseCtrl($scope, $stateParams, gdApi) {

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);

        $scope.debug = "New Expense view for group " + $stateParams.gid + ": " + $scope.groupTitle;

    }

})();