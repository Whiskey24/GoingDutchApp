/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('MemberCtrl', ['$scope', '$stateParams', 'gdApi', MemberCtrl]);

    function MemberCtrl($scope, $stateParams, gdApi) {

        // $scope.$on('$ionicView.enter', function () {
            // put this here in case group details change
            //$scope.currency = gdApi.getGroupCurrency($stateParams.gid);
            //$scope.groupTitle = gdApi.getGroupTitle($stateParams);

        // });
        //$scope.currency = "EUR";

        $scope.users = {};

        gdApi.fetchGroupsData().then(
            function (groupsData) {
                $scope.groups = groupsData;
            },
            function (msg) {
                logErrorMessage(msg);
            }
        ).then(function () {
                var members = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'members')[0];
                $scope.members =  gdApi.sortByKey(members, 'balance', 'DESC');
                $scope.currency = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'currency')[0];
                $scope.groupTitle = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'name')[0];
            }
        );

        var refreshCheck = 0;
        $scope.doRefresh = function() {
            gdApi.fetchGroupsData(true).then(
                function (groupsData) {
                    $scope.groups = groupsData;
                },
                function (msg) {
                    logErrorMessage(msg);
                }
            ).then(function () {
                    var members = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'members')[0];
                    $scope.members =  gdApi.sortByKey(members, 'balance', 'DESC');
                    $scope.currency = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'currency')[0];
                    $scope.groupTitle = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'name')[0];
                }
            ).finally(function() {
                refreshCheck++;
                // Stop the ion-refresher from spinning
                if (refreshCheck == 2){
                    $scope.$broadcast('scroll.refreshComplete');
                    refreshCheck = 0;
                }

            });

            gdApi.fetchUsersData(true).then(
                function (usersData) {
                    $scope.users = usersData;
                },
                function (msg) {
                    logErrorMessage(msg);
                }
            ).finally(function() {
                refreshCheck++;
                // Stop the ion-refresher from spinning
                if (refreshCheck == 2){
                    $scope.$broadcast('scroll.refreshComplete');
                    refreshCheck = 0;
                }
            });

        };

        gdApi.fetchUsersData().then(
            function (usersData) {
                $scope.users = usersData;
            },
            function (msg) {
                logErrorMessage(msg);
            }
        );

        $scope.memberName = function (uid) {
            if (typeof($scope.users[uid]) == 'undefined') {
                return "Error: user " + uid + " not found";
            }
            return $scope.users[uid]['nickName'];
        };

    }

})();

