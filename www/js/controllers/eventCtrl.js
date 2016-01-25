/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('EventCtrl', ['$stateParams', '$scope', 'gdApi', EventCtrl]);

    function EventCtrl($stateParams, $scope, gdApi) {

        $scope.gid = $stateParams.gid;
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
                $scope.debug = "Event view for group " + $scope.gid + ": " + $scope.groupTitle;
            }
        );


    }

})();