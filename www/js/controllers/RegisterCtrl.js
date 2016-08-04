/**
 * Created by Whiskey on 1-8-2016.
 */

(function () {
//    'use strict';

    angular.module('GoingDutchApp').controller('RegisterCtrl', ['$stateParams', '$scope', 'gdApi', '$state', '$ionicLoading', '$ionicPopup', RegisterCtrl]);

    function RegisterCtrl($stateParams, $scope, gdApi, $state, $ionicLoading, $ionicPopup) {

        $scope.newAccountSuccess = false;
        $scope.emailExists = false;

        $scope.returnToLogin = function () {
            $scope.showForgetEmail = false;
            $scope.emailExists = false;
            $state.go('public.login');
        };

        $scope.data = {};
        $scope.$watch('data.firstName + " " + data.lastName', function (value) {
            if (value.length > 1)
                $scope.data.fullName = value;
        });

        $scope.register = function (details){
            gdApi.validateEmailExists(details.email).then(
                function (emailFound) {
                    if (emailFound){
                        $scope.emailExists = true;
                    } else {
                        $scope.emailExists = false;
                        details.nickName = details.nickName == undefined ? details.firstName : details.nickName.trim();
                        if (details.nickName === '') {
                            details.nickName = details.firstName;
                        }
                        gdApi.registerUser(details).then(
                            function(sendResult) {
                                if (sendResult == true) {
                                    $scope.newAccountSuccess = true;
                                } else {
                                    $scope.newAccountSuccess = false;
                                }
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

        function logErrorMessage(error) {
            $ionicLoading.hide();
            if (error == "Not authorized") {
                $scope.showAlert("credentials");
            }
            else {
                $scope.showAlert("connectivity");
            }
            console.log("Error: " + error);

        }
    }


})();