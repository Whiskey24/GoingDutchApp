/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('ExpenseDetailCtrl', ['$stateParams', '$scope', '$filter', '$state', '$cordovaDialogs', '$cordovaDatePicker', 'gdApi', ExpenseDetailCtrl]);

    function ExpenseDetailCtrl($stateParams, $scope, $filter, $state, $cordovaDialogs, $cordovaDatePicker, gdApi) {

        $scope.$on('$ionicView.enter', function () {
            // put this here in case group details change
            $scope.currency = gdApi.getGroupCurrency($stateParams.gid);
        });

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = Number($stateParams.gid);
        $scope.eid = Number($stateParams.eid);
        $scope.expense = gdApi.getExpense($scope.gid, $scope.eid);
        if ($scope.eid > 0)
            $scope.participants = $scope.expense.uids.split(",");
        else
            $scope.participants = [];


        $scope.memberName = function (uid) {
            return gdApi.getUserName(uid);
        };

        $scope.formatDateTimeLocal = function (timestamp, offset) {
            //return $filter('date')((timestamp - offset * 60) * 1000, gdApi.getDateFormat());
            return $scope.formatDateTime(timestamp - offset );
        };

        $scope.formatDateTime = function (timestamp) {
            return $filter('date')((timestamp * 60) * 1000, gdApi.getDateFormat());
        };

        $scope.showConfirm = function (eid) {
            $cordovaDialogs.confirm('Are you sure you want to delete this expense?', 'Delete Expense', ['OK', 'Cancel'])
                .then(function (buttonIndex) {
                    if (buttonIndex == 1) {
                        gdApi.deleteExpense(eid, $scope.gid);
                        $state.go('group.expenses', {gid: $scope.gid});
                    }
                });
        };



        var options = {
            date: new Date(),
            mode: 'date', // or 'time'
            minDate: new Date() - 10000,
            allowOldDates: true,
            allowFutureDates: true,
            doneButtonLabel: 'DONE',
            doneButtonColor: '#F2F3F4',
            cancelButtonLabel: 'CANCEL',
            cancelButtonColor: '#000000'
        };

        //document.addEventListener("deviceready", function () {
          $scope.pickDate = function (dateOrTime) {
              if (dateOrTime == 'time'){
                  options.mode = 'time';
              } else {
                  options.mode = 'date';
              }
              $cordovaDatePicker.show(options).then(function(date){
                alert(date);
            });

        };
    //}, false);

            //console.log($scope.expense);
        }

    }

    )
    ();