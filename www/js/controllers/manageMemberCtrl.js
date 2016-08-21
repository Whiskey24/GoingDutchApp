/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('manageMemberCtrl', ['$stateParams', '$scope', 'gdApi', '$cordovaDialogs', '$state', '$ionicHistory', '$log', manageMemberCtrl]);

    function manageMemberCtrl($stateParams, $scope, gdApi, $cordovaDialogs, $state, $ionicHistory, $log) {

        $scope.gid = Number($stateParams.gid);
        $scope.uid = Number($stateParams.uid);
        $scope.current_role = Number($stateParams.current_role);
        $scope.groupTitle = $stateParams.groupTitle;
        $scope.my_role_id = $stateParams.my_role;
        //$scope.my_role_id = 4;
        $log.debug("my role: " + $scope.my_role_id);

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
                        $log.info("member role has been changed");
                    } else {
                        $log.info("Error changing role of member");
                    }
                    $ionicHistory.clearCache().then((function () {
                        return $state.go('group.manage', {gid: $scope.gid});
                    }));
                },
                function (msg) {
                    $log.info(msg);
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
                                    $log.info("member has been removed");
                                } else {
                                    $log.info("Error removing member");
                                }
                                $ionicHistory.clearCache().then((function () {
                                    return $state.go('group.manage', {gid: $scope.gid});
                                }));
                            },
                            function (msg) {
                                $log.info(msg);
                            }
                        )
                    }
                });
        };

        $scope.emailList = [{id: 'email1'}, {id: 'email2'}];

        $scope.newEmails = {};

        $scope.validatedEmails = {};

        //ToDo: check for emails already in group and duplicates in list

        $scope.validateAddedEmail = function(id){
             if (!_.has($scope.validatedEmails, id)){
                 $scope.validatedEmails[id] = {};
                 $scope.validatedEmails[id]['previousEntry'] = '';
                 $scope.validatedEmails[id]['checked'] = false;
                 $scope.validatedEmails[id]['status'] = "checking";
             }

             if ($scope.validatedEmails[id]['previousEntry'] == $scope.newEmails[id]){
                 checkCanAdd();
                 return;
             } else {
                 $scope.validatedEmails[id]['previousEntry'] = $scope.newEmails[id];
             }

            if(validateEmail($scope.newEmails[id])) {
                $scope.validatedEmails[id]['ok'] = true;
                $scope.validatedEmails[id]['Found'] = false;
                $scope.validatedEmails[id]['status'] = "Checking for account...";
                gdApi.validateEmailExists($scope.newEmails[id]).then(
                    function (emailFound) {
                        if (emailFound){
                            $scope.validatedEmails[id]['status'] = "User found and can be added to this group";
                            $scope.validatedEmails[id]['Found'] = true;

                        } else {
                            $scope.validatedEmails[id]['status'] = "User is not registered with Going Dutch, cannot add";
                        }
                        checkCanAdd();
                    },
                    function (msg) {
                        $log.info(msg);
                    }
                );
            } else {
                $scope.validatedEmails[id]['status'] = "Not a valid email address";
                $scope.validatedEmails[id]['ok'] = false;
            }
            checkCanAdd();
        };

        function checkCanAdd() {
            var canAdd = true;
            var nobodyFound = true;
            for (var i in $scope.newEmails) {
                if($scope.newEmails[i].length == 0){
                    continue;
                }
                $log.debug('CanAdd? $scope.validatedEmails[i][ok] = ' + $scope.validatedEmails[i]['ok']);
                canAdd = $scope.validatedEmails[i]['ok'] == false ? false: canAdd;
                nobodyFound = $scope.validatedEmails[i]['Found']  ? false : nobodyFound;
            }
            $log.debug("Nobody: " + nobodyFound + " - canAdd: " + canAdd);
            $scope.canAddNewMembers = nobodyFound ? false: canAdd;
        }

        $scope.canAddNewMembers = false;

        $scope.checkForNewField = function (id) {
            var Ecount = 0;
            var Tcount = $scope.emailList .length;
            // for (var i in $scope.emailList) {
            //     $log.debug("Entry: \"" + $scope.newEmails[$scope.emailList[i]] + "\"");
            //     if ($scope.newEmails[$scope.emailList[i]] !== undefined && $scope.newEmails[$scope.emailList[i]] != ''){
            //         Ecount++;
            //     }
            // }
            for (var i in $scope.newEmails){
                $log.debug("email entry " + i + ": " + $scope.newEmails[i]);
                if ($scope.newEmails[i] != '' ){
                    Ecount++;
                }
            }
            $log.debug("length: " + Tcount + ", count: " + Ecount);
            if (Tcount ==  Ecount + 1){
                $scope.addEmailInput();
            }
        };

        $scope.addEmailInput = function() {
            var dlog = "";
            for (var i in $scope.newEmails) {
                dlog += $scope.newEmails[i] + " ";
            }
            $log.debug(dlog);

            var newItemNo = $scope.emailList .length+1;
            $scope.emailList.push({'id':'email'+newItemNo});
        };


        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }

})();