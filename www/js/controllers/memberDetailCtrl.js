/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('MemberDetailCtrl', ['$stateParams', '$scope', 'gdApi', MemberDetailCtrl]);

    function MemberDetailCtrl($stateParams, $scope, gdApi) {

        $scope.gid = Number($stateParams.gid);
        $scope.uid = Number($stateParams.uid);

        gdApi.fetchGroupsData().then(
            function (groupsData) {
                $scope.groups = groupsData;
                //console.log($scope.groups);
            },
            function (msg) {
                logErrorMessage(msg);
            }
        ).then(function () {
                var members = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'members')[0];
                $scope.members =  gdApi.sortByKey(members, 'balance', 'DESC');
                $scope.member = _.filter($scope.members, {'uid': Number($scope.uid)})[0];
                $scope.currency = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'currency')[0];
                $scope.groupTitle = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'name')[0];
                $scope.participated = $scope.member["expense"];
                $scope.paid = $scope.member["paid"];
                $scope.balance = $scope.member["balance"];

            }
        );

        gdApi.fetchUsersData().then(
            function (usersData) {
                $scope.users = usersData;
                $scope.nickName = $scope.users[$scope.uid]['nickName'];
            },
            function (msg) {
                logErrorMessage(msg);
            }
        );


    }

})();