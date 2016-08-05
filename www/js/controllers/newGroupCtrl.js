/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('NewGroupCtrl', ['$scope', 'gdApi', '$state', NewGroupCtrl]);

    function NewGroupCtrl($scope, gdApi, $state) {

        var original = $scope.data;
        $scope.form = {};

        $scope.createGroup = function (details) {
            details.currency = 'EUR';
            gdApi.createGroup(details).then(
                function (sendResult) {
                    if (sendResult == true) {
                        $scope.newAccountSuccess = true;
                        $scope.data = angular.copy(original);
                        $scope.form.newGroupForm.$setPristine();
                    } else {
                        $scope.newAccountSuccess = false;
                    }
                },
                function (msg) {
                    console.log(msg);
                }
            ).then(
                function (response) {
                    gdApi.fetchGroupsData(true);
                    $state.go('home.groups');
                },
                function (msg) {
                    console.log(msg);
                }
            );
        }

    }

})();