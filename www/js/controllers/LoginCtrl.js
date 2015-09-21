/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('LoginCtrl', ['$stateParams', '$scope', 'gdApi', '$state', LoginCtrl]);

    function LoginCtrl($stateParams, $scope, gdApi, $state) {

        $scope.login = function (data) {
            gdApi.login(data.username, data.password)
                .then(gdApi.fetchGroupsData)
                .then(gotoHome, logErrorMessage);
        };

        function gotoHome(groups) {
            preLoadExpenses(groups);
            $state.go('home.groups');
        }

        function preLoadExpenses(data) {

            gdApi.fetchUsersData()
                .then(function (data) {
                    //users = data;
                    //console.log(users);
                }, function (error) {
                    logErrorMessage(error);
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
            console.log("Error: " + error.message)
        }

    }
})();