/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('AchievementCtrl', ['$stateParams', '$scope', 'gdApi', AchievementCtrl]);

    function AchievementCtrl($stateParams, $scope, gdApi) {

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = $stateParams.gid;
        $scope.debug = "Achievement view for group " + $scope.gid + ": " + $scope.groupTitle;

    }

})();