/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp.controllers').controller('GroupCtrl', ['$scope', 'gdApi', GroupCtrl]);

    function GroupCtrl($scope, gdApi) {

        $scope.getGroupCurrency = function(gid) {
            return gdApi.getGroupCurrency(gid);
        };

        $scope.groups = gdApi.getGroups();
        $scope.data = {};

        $scope.moveGroup = function(group, fromIndex, toIndex) {
            $scope.groups = gdApi.moveGroup(group, fromIndex, toIndex);
        }

    }

})();
