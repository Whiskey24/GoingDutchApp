/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseCtrl', ['$stateParams', '$rootScope', '$state', '$ionicHistory', 'goingdutchApi', ExpenseCtrl]);

    function ExpenseCtrl($stateParams, $rootScope, $state, $ionicHistory, goingdutchApi) {

        console.log("Running ExpenseCtrl group ", goingdutchApi.selectedGroup);
        var vm = this;
        vm.gid = Number($stateParams.gid);
        vm.groupTitle = goingdutchApi.getGroupTitle(vm.gid);


        $rootScope.$on( "$ionicView.beforeEnter", function( scopes, states ) {

            if (states.fromCache && states.stateName == "group.expenses") {
                if (Number(goingdutchApi.selectedGroup) != Number($stateParams.gid)) {
                    console.log("Reload expenses for group ", goingdutchApi.selectedGroup);
                    $ionicHistory.clearCache();

                    $state.go('group.expenses', {gid: goingdutchApi.selectedGroup}, 'reload: true');
                }
            }

        });
    }


})();

