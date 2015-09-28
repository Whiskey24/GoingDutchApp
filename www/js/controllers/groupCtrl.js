/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp.controllers').controller('GroupCtrl', ['$scope', 'gdApi', GroupCtrl]);

    function GroupCtrl($scope, gdApi) {

        var currencies = {};
        gdApi.fetchGroupsData().then(function (groupsArray) {
            for (var i = 0, len = groupsArray.length; i < len; i++) {
                currencies[groupsArray[i].gid] = _.pluck(_.filter(groupsArray, {'gid': Number(groupsArray[i].gid)}), 'currency')[0];
            }
            //$scope.currencies = currencies;
        });

        $scope.getGroupCurrency = function (gid) {
            return currencies[gid];
        };

        gdApi.fetchGroupsData().then(
            function (groupsData) {
                $scope.groups = groupsData;
            },
            function (msg) {
                logErrorMessage(msg);
            }
        );

        $scope.data = {};

        function logErrorMessage(error) {
            console.log("Error: " + error);
        }

        $scope.moveGroup = function (group, fromIndex, toIndex) {
            $scope.groups = gdApi.moveGroup(group, fromIndex, toIndex);
        }

    }

})();
