/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('AccountCtrl', ['$scope', 'gdApi', '$ionicHistory', '$state', AccountCtrl]);

    function AccountCtrl($scope, gdApi, $ionicHistory, $state) {
        $scope.userData = {};
        var currentEmail = '';
        gdApi.fetchUsersData().then(
            function (usersData) {
                var uid = gdApi.UID();
                $scope.users = usersData;
                $scope.userData = usersData[uid];
                currentEmail = $scope.userData.email;
            },
            function (msg) {
                logErrorMessage(msg);
            }
        );

        $scope.updateDetails = function (userData) {
            $scope.userData.nickName = $scope.userData.nickName == undefined ? $scope.userData.firstName : $scope.userData.nickName.trim();
            if ($scope.userData.nickName === '') {
                $scope.userData.nickName = details.firstName;
            }

            gdApi.updateUserDetails($scope.userData).then(
                function (result) {
                    //console.log("email found: " + emailFound);
                    if (result) {
                        gdApi.fetchUsersData(true);
                        console.log("member details have been changed");
                    } else {
                        console.log("Error changing details of member");
                    }
                    $ionicHistory.clearCache().then((function () {
                        return $state.go('home.account');
                    }));
                },
                function (msg) {
                    console.log(msg);
                }
            )
        };

        $scope.updateEmail = function (userData) {

            if (currentEmail == $scope.userData.email) {
                return $state.go('home.account');
            }

            gdApi.updateUserDetails($scope.userData).then(
                function (result) {
                    //console.log("email found: " + emailFound);
                    if (result) {
                        gdApi.fetchUsersData(true);
                        console.log("member details have been changed");
                    } else {
                        console.log("Error changing details of member");
                    }
                    $ionicHistory.clearCache().then((function () {
                        return $state.go('home.account');
                    }));
                },
                function (msg) {
                    console.log(msg);
                }
            )
        };

        $scope.emailExists = false;
        $scope.updateEmail = function (userData) {
            if (currentEmail == $scope.userData.email) {
                return $state.go('home.account');
            }

            gdApi.validateEmailExists($scope.userData.email).then(
                function (emailFound) {
                    if (emailFound) {
                        $scope.emailExists = true;
                    } else {
                        $scope.emailExists = false;
                        gdApi.updateUserDetails($scope.userData).then(
                            function (result) {
                                if (result) {
                                    gdApi.updateEmail($scope.userData.email);
                                    gdApi.fetchUsersData(true);
                                    console.log("member email has been changed");
                                } else {
                                    console.log("Error changing email of member");
                                }
                                $ionicHistory.clearCache().then((function () {
                                    return $state.go('home.account');
                                }));
                            },
                            function (msg) {
                                console.log(msg);
                            }
                        )

                    }

                },
                function (msg) {
                    console.log(msg);
                }
            );
        };

        $scope.updateEmail = function (userData) {
            if (currentEmail == $scope.userData.email) {
                return $state.go('home.account');
            }

            gdApi.validateEmailExists($scope.userData.email).then(
                function (emailFound) {
                    if (emailFound) {
                        $scope.emailExists = true;
                    } else {
                        $scope.emailExists = false;
                        gdApi.updateUserDetails($scope.userData).then(
                            function (result) {
                                if (result) {
                                    gdApi.updateEmail($scope.userData.email);
                                    gdApi.fetchUsersData(true);
                                    console.log("member email has been changed");
                                } else {
                                    console.log("Error changing email of member");
                                }
                                $ionicHistory.clearCache().then((function () {
                                    return $state.go('home.account');
                                }));
                            },
                            function (msg) {
                                console.log(msg);
                            }
                        )

                    }

                },
                function (msg) {
                    console.log(msg);
                }
            );
        };

        $scope.updatePass = function (userData) {
            //console.log(userData);
            gdApi.updatePass(gdApi.UID(), userData.pass).then(
                function (passUpdated) {
                    if (passUpdated) {
                        console.log("member password has been changed");
                    } else {
                        console.log("Error changing password of member");
                    }
                    $ionicHistory.clearCache().then((function () {
                        return $state.go('home.account');
                    }));
                },
                function (msg) {
                    console.log(msg);
                }
            );
        };

    }
})();