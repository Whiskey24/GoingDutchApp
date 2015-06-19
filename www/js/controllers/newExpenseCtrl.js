/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('NewExpenseCtrl', ['$stateParams', 'goingdutchApi', NewExpenseCtrl]);

    function NewExpenseCtrl($stateParams, goingdutchApi) {

        var vm = this;
        vm.gid = Number($stateParams.gid);
        vm.groupTitle = goingdutchApi.getGroupTitle(vm.gid);

    }


})();

