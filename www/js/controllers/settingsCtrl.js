/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('SettingsCtrl', ['$stateParams', '$scope', 'gdApi', 'iso4217', '$state', '$cordovaDialogs', SettingsCtrl]);

    function SettingsCtrl($stateParams, $scope, gdApi, iso4217, $state, $cordovaDialogs) {

        $scope.groupTitle = gdApi.getGroupTitle($stateParams);
        $scope.gid = $stateParams.gid;

        var currenciesKeys = gdApi.getCurrencies();
        var currencies = [];
        for(var i = 0; i < currenciesKeys.length; i++){
            currencies[i] = iso4217.getCurrencyByCode(currenciesKeys[i]);
            currencies[i].code = currenciesKeys[i];
        }

        $scope.groupCurrency = gdApi.getGroupCurrency($stateParams.gid);
        $scope.currencyList = currencies;

        $scope.selectedCurrencyCode =  gdApi.getGroupCurrency($stateParams.gid);
        $scope.selectedCurrency =  iso4217.getCurrencyByCode($scope.selectedCurrencyCode);

        $scope.newCurrencySelected = function(newCurrencyCode) {
            gdApi.setGroupCurrency($scope.gid, newCurrencyCode);
            $state.go('group.settings', {gid: $scope.gid});
        };

        $scope.categories = gdApi.getGroupCategories($scope.gid);
        $scope.categoryCount = Object.keys($scope.categories).length;

        $scope.changeCategoryTitle = function (cid) {
            $cordovaDialogs.prompt('Enter new category title', 'Change Title', ['OK', 'Cancel'], $scope.categories[cid])
                .then(function (result) {
                    if (result.buttonIndex == 1) {
                        gdApi.setGroupCategory($scope.gid, cid, result.input1);
                    }
                });
        };

        $scope.addCategory = function () {
            $cordovaDialogs.prompt('Enter new category title', 'Add Category', ['OK', 'Cancel'], '')
                .then(function (result) {
                    if (result.buttonIndex == 1 && result.input1.length > 3) {
                        gdApi.setGroupCategory($scope.gid, 0, result.input1);
                    }
                });
        };

    }

})();