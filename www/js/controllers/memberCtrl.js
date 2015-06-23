/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('MemberCtrl', ['$stateParams', '$rootScope', '$ionicHistory', '$state', 'goingdutchApi', MemberCtrl]);

    function MemberCtrl($stateParams, $rootScope, $ionicHistory, $state, goingdutchApi) {

        var redirectDone = false;
        console.log("Running MemberCtrl group ", goingdutchApi.selectedGroup);

        var vm = this;
        vm.gid = Number($stateParams.gid);
        vm.groupTitle = goingdutchApi.getGroupTitle(vm.gid);

/*        $rootScope.$on( "$ionicView.beforeEnter", function( scopes, states ) {

            if ($state.current.name == "group.members") {
                redirectDone = true;

                if (Number(goingdutchApi.selectedGroup) != Number($stateParams.gid) ) {
                    redirectDone = true;
                    console.log("Reload members for group ", goingdutchApi.selectedGroup);

                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });

                    $state.go('group.members', {gid: goingdutchApi.selectedGroup}, {location: 'replace'});

                }
            }

        });*/
    }


})();

