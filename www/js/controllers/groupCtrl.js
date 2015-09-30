/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp.controllers').controller('GroupCtrl', ['$scope', 'gdApi', GroupCtrl]);

    function GroupCtrl($scope, gdApi) {

        var currencies = {};

        gdApi.fetchGroupsData().then(
            function (groupsData) {
                $scope.groups = groupsData;
            },
            function (msg) {
                logErrorMessage(msg);
            }
        );
        /*.then(function () {
                for (var i = 0, len = $scope.groups.length; i < len; i++) {
                    currencies[$scope.groups[i].gid] = gdApi.getGroupCurrency($scope.groups[i].gid);
                }
            }
        );*/

        $scope.getGroupCurrency = function (gid) {
            return gdApi.getGroupCurrency(gid);
        };

        function logErrorMessage(error) {
            console.log("Error: " + error);
        }

        $scope.moveGroup = function (group, fromIndex, toIndex) {
            $scope.groups = gdApi.moveGroup(group, fromIndex, toIndex);
        }

    }

})();
