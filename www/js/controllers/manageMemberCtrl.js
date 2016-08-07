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

        gdApi.fetchUsersData().then(
            function (usersData) {
                $scope.users = usersData;
                $scope.user = usersData[$scope.uid];
            },
            function (msg) {
                logErrorMessage(msg);
            }
        );

        console.log("gid: " + $scope.gid + " user: " + $scope.uid);

        $scope.roles = [];
        $scope.roles[0] = {name: 'founder', role_id: 0};
        $scope.roles[1] = {name: 'admin', role_id: 1};
        $scope.roles[2] = {name: 'member', role_id: 4};

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
                                    $ionicHistory.clearCache().then((function () {
                                        return $state.go('group.manage', {gid: $scope.gid});
                                    }));
                                } else {
                                    console.log("Error removing member");
                                }
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