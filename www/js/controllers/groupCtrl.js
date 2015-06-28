/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('GroupCtrl', ['$stateParams', '$scope', 'gdApi', GroupCtrl]);

    function GroupCtrl($stateParams, $scope, gdApi) {

        $scope.groups = gdApi.getGroups();

    }

})();