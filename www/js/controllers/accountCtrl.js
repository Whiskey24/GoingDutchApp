/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('AccountCtrl', ['$scope', 'gdApi', '$ionicHistory', '$state', AccountCtrl]);

    function AccountCtrl($scope, gdApi, $ionicHistory, $state) {
        $scope.userData = {};
        gdApi.fetchUsersData().then(
            function (usersData) {
                var uid = gdApi.UID();
                $scope.users = usersData;
                $scope.userData = usersData[uid];
            },
            function (msg) {
                logErrorMessage(msg);
            }
        );

        $scope.updateDetails = function (userData) {

            gdApi.updateUserDetails($scope.userData).then(
                function (result) {
                    //console.log("email found: " + emailFound);
                    if (result){
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


    }

})();