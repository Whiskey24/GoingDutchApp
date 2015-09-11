/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('LoginCtrl', ['$stateParams', '$scope', 'gdApi', LoginCtrl]);

    function LoginCtrl($stateParams, $scope, gdApi) {

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = $stateParams.gid;
        $scope.debug = "Event view for group " + $scope.gid + ": " + $scope.groupTitle;

    }

})();