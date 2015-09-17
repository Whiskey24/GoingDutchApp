/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('LoginCtrl', ['$stateParams', '$scope', 'gdApi', LoginCtrl]);

    function LoginCtrl($stateParams, $scope, gdApi) {

        $scope.login = function  (data){
            console.log("user: " + data.username + ", pass" + data.password);
            gdApi.login(data.username, data.password);
        }


    }

})();