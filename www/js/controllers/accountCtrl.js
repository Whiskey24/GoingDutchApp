/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('AccountCtrl', ['$scope', AccountCtrl]);

    function AccountCtrl($scope) {

        $scope.debug = "Account view";

    }

})();