/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('SettingsCtrl', ['$stateParams', '$scope', 'gdApi', 'iso4217', '$state', '$cordovaDialogs', SettingsCtrl]);

    function SettingsCtrl($stateParams, $scope, gdApi, iso4217, $state, $cordovaDialogs) {

        gdApi.fetchGroupsData().then(
            function (groupsData) {
                $scope.groups = groupsData;
            },
            function (msg) {
                logErrorMessage(msg);
            }
        ).then(function () {
                var members = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'members')[0];
                $scope.members =  gdApi.sortByKey(members, 'balance', 'DESC');
                $scope.currency = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'currency')[0];
                $scope.groupTitle = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'name')[0];
                $scope.categories = gdApi.getGroupCategories($scope.groups,$scope.gid);
                $scope.categoryCount = $scope.categories.length;

                $scope.groupCurrency = $scope.currency;
                $scope.selectedCurrencyCode = $scope.currency;
                $scope.selectedCurrency = iso4217.getCurrencyByCode($scope.selectedCurrencyCode);
            }
        );
        $scope.gid = $stateParams.gid;

        var currenciesKeys = gdApi.getCurrencies();
        var currencies = [];
        for (var i = 0; i < currenciesKeys.length; i++) {
            currencies[i] = iso4217.getCurrencyByCode(currenciesKeys[i]);
            currencies[i].code = currenciesKeys[i];
        }
        $scope.currencyList = currencies;


        $scope.newCurrencySelected = function (newCurrencyCode) {
            gdApi.setGroupCurrency($scope.gid, newCurrencyCode);
            $state.go('group.settings', {gid: $scope.gid});
        };

        $scope.data = {};
        $scope.data.showReorder = false;
        $scope.reOrder= function () {
            if ($scope.data.showReorder) {
                sendCategoryUpdate();
            }
            $scope.data.showReorder  = !$scope.data.showReorder ;
        };

        function sendCategoryUpdate() {
            var sortResult = {};
            for (var key in $scope.categories) {
                sortResult[$scope.categories[key].cid] = $scope.categories[key];
            }
            gdApi.updateGroupCategories($scope.gid, sortResult);
        }

        function moveItemForSort(arr, item, fromIndex, toIndex) {
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, item);
            updateSortIds(arr);
            $scope.groups = arr;
            return arr;
        }

        function updateSortIds(arr) {
            for (var j in arr) {
                arr[j].sort = Number(j) + 1;
            }
        }

        $scope.moveCategory = function (category, fromIndex, toIndex) {
            $scope.categories = moveItemForSort($scope.categories, category, fromIndex, toIndex);
        };


        var changeTitleMsg = 'Enter new category title';
        $scope.changeCategoryTitle = function (category) {
            $cordovaDialogs.prompt(changeTitleMsg, 'Change Title', ['OK', 'Cancel'], category.title)
                .then(function (result) {
                    if (result.buttonIndex == 1) {
                        if (checkIfCategoryTitleExists(result.input1.trim(), category.cid)) {
                            changeTitleMsg = 'Enter new category title - title "' + result.input1.trim() + '" already exists';
                            $scope.changeCategoryTitle(category);
                            console.log("DSF");
                        }
                        else {
                            //gdApi.setGroupCategory($scope.gid, category, result.input1.trim());
                            for (var key in $scope.categories) {
                                if ($scope.categories[key].cid == category.cid) {
                                    $scope.categories[key].title = result.input1.trim();
                                    sendCategoryUpdate();
                                    break;
                                }
                            }
                            changeTitleMsg = 'Enter new category title';
                        }
                    }
                });
        };

        function checkIfCategoryTitleExists(newTitle, cid) {
            for (var i = 0, len = $scope.categories.length; i < len; i++) {
                if ($scope.categories[i].cid == cid) {
                    continue;
                }
                else if ($scope.categories[i].title == newTitle) {
                    return true;
                }
            }
            return false;
        }

        var newTitleMsg = 'Enter new category';
        $scope.addCategory = function () {
            $cordovaDialogs.prompt(newTitleMsg, 'Add Category', ['OK', 'Cancel'], '')
                .then(function (result) {
                    if (checkIfCategoryTitleExists(result.input1.trim(), 0)) {
                        newTitleMsg = 'Enter new category - title "' + result.input1.trim() + '" already exists';
                        $scope.addCategory();
                    }
                    else if (result.buttonIndex == 1 && result.input1.length > 1) {
                        //gdApi.setGroupCategory($scope.gid, 0, result.input1);
                        newCategory(result.input1);
                        newTitleMsg = 'Enter new category';
                    }
                });
        };

        function newCategory(title) {
            console.log($scope.categories);

            var newSort = 0;
            for (var i = 0, len = $scope.categories.length; i < len; i++) {
                if ($scope.categories[i].sort > newSort) {
                    newSort = $scope.categories[i].sort;
                }
            }
            newSort++;

            $scope.categories.push({
                "cid": 0,
                "group_id": $scope.gid,
                "title": title,
                "presents": 0,
                "inactive": 0,
                "can_delete": 0,
                "sort": newSort
            });
            console.log($scope.categories);

            sendCategoryUpdate();
        }

    }

})();