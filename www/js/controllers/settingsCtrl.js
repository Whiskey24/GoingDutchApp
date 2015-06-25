/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('SettingsCtrl', ['$stateParams', '$scope', 'gdApi', SettingsCtrl]);

    function SettingsCtrl($stateParams, $scope, gdApi) {

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = $stateParams.gid;
        $scope.debug = "Settings view for group " + $scope.gid + ": " + $scope.groupTitle;

    }

})();