/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('MemberCtrl', ['$scope', '$stateParams', 'gdApi', MemberCtrl]);

    function MemberCtrl($scope, $stateParams, gdApi) {

        $scope.$on('$ionicView.enter', function () {
            // put this here in case group details change
            $scope.currency = gdApi.getGroupCurrency($stateParams.gid);
            $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        });

        $scope.members = gdApi.sortByKey(gdApi.getGroupMembers($stateParams.gid), 'balance', 1);

        $scope.memberName = function(uid) {
            return gdApi.getUserName(uid);
        }

    }

})();

