/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('SettleBalanceCtrl', ['$stateParams', '$scope', 'gdApi', SettleBalanceCtrl]);

    function SettleBalanceCtrl($stateParams, $scope, gdApi) {

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = $stateParams.gid;
        $scope.debug = "Settle balance view for group " + $scope.gid + ": " + $scope.groupTitle;

    }

})();