/**
 * Created by Whiskey on 19-6-2015.
 */

/*
    angular.module('GoingDutchApp.controllers', []).controller('GroupCtrl', ['$scope', 'gdApi', function    ($scope, gdApi) {

        $scope.getGroupCurrency = function(gid) {
            return gdApi.getGroupCurrency(gid);
        };

        $scope.groups = gdApi.getGroups();

        $scope.test = true;

        $scope.settings = {
            enableFriends: true
        };
    }]);

*/
//angular.module('myApp.controllers').controller('Ctrlr1', ['$scope', '$http', function($scope, $http){
//
//}]);


(function () {
    'use strict';

    angular.module('GoingDutchApp.controllers').controller('GroupCtrl', ['$scope', 'gdApi', GroupCtrl]);

    function GroupCtrl($scope, gdApi) {

        $scope.getGroupCurrency = function(gid) {
            return gdApi.getGroupCurrency(gid);
        };

        $scope.groups = gdApi.getGroups();

        $scope.test = true;

        $scope.settings = {
            enableFriends: true
        };
    }

})();
