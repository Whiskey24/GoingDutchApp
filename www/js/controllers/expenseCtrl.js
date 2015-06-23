/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseCtrl', ['$stateParams', '$rootScope', '$state', '$ionicHistory', 'goingdutchApi', ExpenseCtrl]);

    function ExpenseCtrl($stateParams, $rootScope, $state, $ionicHistory, goingdutchApi) {

        var redirectDone = false;

        console.log("Running ExpenseCtrl group ", goingdutchApi.selectedGroup, $state.current);
        var vm = this;
        vm.gid = Number($stateParams.gid);
        vm.groupTitle = goingdutchApi.getGroupTitle(vm.gid);

        $rootScope.$on( "$ionicView.beforeEnter", function( scopes, states ) {

            if ($state.current.name == "group.expenses") {
                redirectDone = true;

                if (Number(goingdutchApi.selectedGroup) != Number($stateParams.gid) ) {
                    redirectDone = true;
                    console.log("Reload expenses for group ", goingdutchApi.selectedGroup);

                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });

                    $state.go('group.expenses', {gid: goingdutchApi.selectedGroup}, {location: 'replace'});

                }
            }

        });
    }


})();

