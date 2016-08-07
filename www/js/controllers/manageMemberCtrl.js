/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('manageMemberCtrl', ['$stateParams', '$scope', 'gdApi', '$cordovaDialogs', '$state', '$ionicHistory', manageMemberCtrl]);

    function manageMemberCtrl($stateParams, $scope, gdApi, $cordovaDialogs, $state, $ionicHistory) {

        $scope.gid = Number($stateParams.gid);
        $scope.uid = Number($stateParams.uid);
        $scope.current_role = Number($stateParams.current_role);
        $scope.groupTitle = $stateParams.groupTitle;
        $scope.my_role_id = $stateParams.my_role;
        //$scope.my_role_id = 4;
        console.log("my role: " + $scope.my_role_id);

        gdApi.fetchUsersData().then(
            function (usersData) {
                $scope.users = usersData;
                $scope.user = usersData[$scope.uid];
            },
            function (msg) {
                logErrorMessage(msg);
            }
        );

        var allRoles = [];
        allRoles[0] = {name: 'founder', role_id: 0};
        allRoles[1] = {name: 'admin', role_id: 1};
        allRoles[2] = {name: 'member', role_id: 4};

        $scope.roles = [];
        var j = 0;
        for (var i = 0; i < allRoles.length; i++) {
            if ($scope.my_role_id <= allRoles[i].role_id){
                $scope.roles[j] = allRoles[i];
                j++;
            }
        }

        $scope.newRoleSelected = function (newRoleId) {
            gdApi.changeRole($scope.gid,$scope.uid,newRoleId).then(
                function (result) {
                    //console.log("email found: " + emailFound);
                    if (result){
                        gdApi.fetchGroupsData(true);
                        console.log("member role has been changed");
                    } else {
                        console.log("Error changing role of member");
                    }
                    $ionicHistory.clearCache().then((function () {
                        return $state.go('group.manage', {gid: $scope.gid});
                    }));
                },
                function (msg) {
                    console.log(msg);
                }
            )
        };

        $scope.removeMember = function () {
            var removeTitle = 'Remove group member';
            var removeMsg= 'Remove ' + $scope.users[$scope.uid].realname + ' from the group?';
            $cordovaDialogs.confirm(removeMsg, removeTitle, ['OK', 'Cancel'], '')
                .then(function (buttonIndex) {
                    if (buttonIndex == 1) {
                        gdApi.removeMember($scope.gid, $scope.uid).then(
                            function (result) {
                                //console.log("email found: " + emailFound);
                                if (result){
                                    gdApi.fetchGroupsData(true);
                                    console.log("member has been removed");
                                } else {
                                    console.log("Error removing member");
                                }
                                $ionicHistory.clearCache().then((function () {
                                    return $state.go('group.manage', {gid: $scope.gid});
                                }));
                            },
                            function (msg) {
                                console.log(msg);
                            }
                        )
                    }
                });
        };


    }

})();