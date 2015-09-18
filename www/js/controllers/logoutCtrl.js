/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('LogoutCtrl', ['$scope', 'gdApi', '$ionicHistory', '$state', LogoutCtrl]);

    function LogoutCtrl($scope, gdApi, $ionicHistory, $state) {

        gdApi.logout();
        $state.go('public.login')



    }

})();