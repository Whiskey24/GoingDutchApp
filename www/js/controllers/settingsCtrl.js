/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('SettingsCtrl', ['$stateParams', '$scope', 'gdApi', 'iso4217', '$state', SettingsCtrl]);

    function SettingsCtrl($stateParams, $scope, gdApi, iso4217, $state) {

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
        }
    }

})();