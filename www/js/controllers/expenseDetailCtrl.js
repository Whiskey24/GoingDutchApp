/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseDetailCtrl', ['$stateParams', '$rootScope', '$state', '$ionicHistory', 'goingdutchApi', ExpenseDetailCtrl]);

    function ExpenseDetailCtrl($stateParams, $rootScope, $state, $ionicHistory, goingdutchApi) {

        var redirectDone = false;


        var vm = this;
        vm.gid = Number($stateParams.gid);
        vm.eid = Number($stateParams.eid);

        vm.groupTitle = goingdutchApi.getGroupTitle(vm.gid);
        console.log("Running ExpenseDetailCtrl group ", goingdutchApi.selectedGroup, $state.current);


    }


})();

