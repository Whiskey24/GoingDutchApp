/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('EventDetailCtrl', ['$stateParams', '$scope', 'gdApi', EventDetailCtrl]);

    function EventDetailCtrl($stateParams, $scope, gdApi) {

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = Number($stateParams.gid);
        $scope.evid = Number($stateParams.evid);

    }

})();