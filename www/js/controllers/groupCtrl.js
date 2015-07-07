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

//        var groupArray = _.values($scope.groups);

        var groupArray =[];
        for( var i in $scope.groups ) {
            if ($scope.groups.hasOwnProperty(i)){
                groupArray.push($scope.groups[i]);
            }
        }
console.log(groupArray);
        /*
        $scope.data = {
            showDelete: false
        };

        $scope.edit = function(item) {
            alert('Edit Item: ' + item.id);
        };
        $scope.share = function(item) {
            alert('Share Item: ' + item.id);
        };

        $scope.moveItem = function(item, fromIndex, toIndex) {
            $scope.items.splice(fromIndex, 1);
            $scope.items.splice(toIndex, 0, item);
        };

        $scope.onItemDelete = function(item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };
*/


    }

})();