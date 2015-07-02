/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseDetailCtrl', ['$stateParams', '$scope', '$filter', '$ionicPopup', '$state', 'gdApi', ExpenseDetailCtrl]);

    function ExpenseDetailCtrl($stateParams, $scope, $filter, $ionicPopup, $state, gdApi) {

        $scope.$on('$ionicView.enter', function () {
            // put this here in case group details change
            $scope.currency = gdApi.getGroupCurrency($stateParams.gid);
        });

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = Number($stateParams.gid);
        $scope.eid = Number($stateParams.eid);
        $scope.expense = gdApi.getExpense($scope.gid, $scope.eid);
        $scope.participants = $scope.expense.uids.split(",");
        $scope.memberName = function (uid) {
            return gdApi.getUserName(uid);
        };

        $scope.formatDateTime = function (timestamp) {
            return $filter('date')(timestamp * 1000, gdApi.getDateFormat());
        };


        $scope.showConfirm = function (eid) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Expense',
                template: 'Are you sure you want to delete this expense?',
                cancelText: 'No',
                cancelType: 'button-cancel',
                okText: 'Yes',
                okType: 'button-default'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    gdApi.deleteExpense(eid, $scope.gid);
                    $state.go('group.expenses', {gid: $scope.gid});
                } else {
                    console.log('You are not sure');
                }
            });
        };

            //console.log($scope.expense);
        }

    }

    )
    ();