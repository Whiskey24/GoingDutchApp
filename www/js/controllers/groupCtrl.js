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
                var uid = gdApi.UID();
                if (typeof(uid) != 'undefined') {
                    updateGroupsList();
                }
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

        $scope.data = {};
        $scope.data.showReorder = false;
        $scope.reOrder= function () {
            if ($scope.data.showReorder) {
                //console.log($scope.groups);
                var sortResult = {};
                for (var key in $scope.groups) {
                    var gid = $scope.groups[key].gid;
                    sortResult[gid] = {"gid": gid, "sort": $scope.groups[key].sort};
                    // console.log("gid: " + $scope.groups[key].gid + " sort: " + $scope.groups[key].sort);
                }
                gdApi.updateGroupSort(sortResult);
            }
            $scope.data.showReorder  = !$scope.data.showReorder ;
        };

        $scope.getGroupCurrency = function (currency) {
            // console.log(currency);
            //return gdApi.getGroupCurrency(gid);
            return currency;
        };

        function logErrorMessage(error) {
            console.log("Error: " + error);
        }

        // return fetchGroupsData().then(moveItemForSort(groups, group, fromIndex, toIndex));
        function moveItemForSort(arr, item, fromIndex, toIndex) {
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, item);
            updateSortIds(arr);
            $scope.groups = arr;
            return arr;
        }

        function updateSortIds(arr) {
            for (var j in arr) {
                arr[j].sort = Number(j) + 1;
            }
        }


        $scope.moveGroup = function (group, fromIndex, toIndex) {
            //$scope.groups = gdApi.moveGroup(group, fromIndex, toIndex);
            $scope.groups = moveItemForSort($scope.groups, group, fromIndex, toIndex);
        }

    }

})();
