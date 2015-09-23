/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('LoginCtrl', ['$stateParams', '$scope', 'gdApi', '$state', '$ionicLoading', '$ionicPopup', LoginCtrl]);

    function LoginCtrl($stateParams, $scope, gdApi, $state, $ionicLoading, $ionicPopup) {

        $scope.login = function (data) {
            $ionicLoading.show();
            gdApi.login(data.username, data.password)
                .then(gdApi.fetchGroupsData)
                .then(gotoHome, logErrorMessage);
        };

        function gotoHome(groups) {
            $ionicLoading.hide();
            preLoadExpenses(groups);
            $state.go('home.groups');
        }

        function preLoadExpenses(data) {

            gdApi.fetchUsersData()
                .then(function (data) {
                    //users = data;
                    //console.log(users);
                }, function (msg) {
                    logErrorMessage(msg);
                }
            );

            var groups = gdApi.getGroups();
            console.log("Group count: " + groups.length)
            for (var index = 0; index < groups.length; index++) {
                gdApi.fetchExpensesData(groups[index].gid)
                    .then(function (data) {
                        //console.log(data);
                    }, function (error) {
                        logErrorMessage(error);
                    }
                );
            }
        }

        function logErrorMessage(error) {
            $ionicLoading.hide();
            console.log("Error: " + error);
            $scope.showAlert();
        }

        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Sorry',
                template: 'Can\'t let you in'
            });
            alertPopup.then(function(res) {
                //console.log('Thank you for not eating my delicious ice cream cone');
            });
        };

    }
})();