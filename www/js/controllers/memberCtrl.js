/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('MemberCtrl', ['$scope', '$stateParams', 'gdApi', MemberCtrl]);

    function MemberCtrl($scope, $stateParams, gdApi) {

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);

    }

})();

