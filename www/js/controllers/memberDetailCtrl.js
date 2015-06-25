/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('MemberDetailCtrl', ['$stateParams', '$scope', 'gdApi', MemberDetailCtrl]);

    function MemberDetailCtrl($stateParams, $scope, gdApi) {

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = Number($stateParams.gid);
        $scope.uid = Number($stateParams.uid);

    }

})();