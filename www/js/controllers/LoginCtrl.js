/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('LoginCtrl', ['$stateParams', '$scope', 'gdApi', '$state', LoginCtrl]);

    function LoginCtrl($stateParams, $scope, gdApi, $state) {

        $scope.login = function (data) {

            gdApi.login(data.username, data.password)
                .then(function () {

                    gdApi.fetchGroupsData()
                        .then(function () {
                            $state.go('home.groups');
                        })

                })
        }

    }
})();