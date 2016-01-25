/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp.controllers').controller('GroupCtrl', ['$scope', 'gdApi', GroupCtrl]);

    function GroupCtrl($scope, gdApi) {
        var currencies = {};

        /*.then(function () {
                for (var i = 0, len = $scope.groups.length; i < len; i++) {
                    currencies[$scope.groups[i].gid] = gdApi.getGroupCurrency($scope.groups[i].gid);
                }
            }
        );*/

        $scope.$watch(
            function () {
                return gdApi.groupsCacheCreated($scope.gid);
            },

            function(newVal, oldVal) {
                console.log("Groups were updated, reloading");
                //console.log(newVal);
                //console.log(oldVal);
                updateGroupsList();
            }, true
        );

        function updateGroupsList(){
            gdApi.fetchGroupsData().then(
                function (groupsData) {
                    $scope.groups = groupsData;
                },
                function (msg) {
                    logErrorMessage(msg);
                }
            );
        }


        $scope.getGroupCurrency = function (currency) {
            // console.log(currency);
            //return gdApi.getGroupCurrency(gid);
            return currency;

        };

        function logErrorMessage(error) {
            console.log("Error: " + error);
        }

        $scope.moveGroup = function (group, fromIndex, toIndex) {
            $scope.groups = gdApi.moveGroup(group, fromIndex, toIndex);
        }

    }

})();
