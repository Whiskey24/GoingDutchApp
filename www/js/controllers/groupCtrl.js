/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('GroupCtrl', ['$scope', 'gdApi', GroupCtrl]);

    function GroupCtrl($scope, gdApi) {

        $scope.getGroupCurrency = function(gid) {
            return gdApi.getGroupCurrency(gid);
        };

        $scope.groups = gdApi.getGroups();
    }

})();