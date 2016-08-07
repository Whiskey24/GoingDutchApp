/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').controller('SettingsCtrl', ['$stateParams', '$scope', 'gdApi', 'iso4217', '$state', '$cordovaDialogs', '$ionicHistory', SettingsCtrl]);

    function SettingsCtrl($stateParams, $scope, gdApi, iso4217, $state, $cordovaDialogs, $ionicHistory) {

        var deleteGroupMsg = 'Delete group ?';
        $scope.$on('$ionicView.enter', function () {
            // put this here in case group details have been updated
            var cacheGroup = gdApi.checkGroupSettingsCache(Number($stateParams.gid));
            if (cacheGroup){
                $scope.currency = cacheGroup['currency'];
                $scope.groupTitle = cacheGroup['name'];
                $scope.groupDescription = cacheGroup['description'];
                $scope.selectedCurrencyCode = $scope.currency;
                $scope.selectedCurrency = iso4217.getCurrencyByCode($scope.selectedCurrencyCode);
                $scope.my_role_id = 4;
                deleteGroupMsg = 'Delete group ' + $scope.groupTitle + '? Confirm by typing the group name.';
                }
        });

        gdApi.fetchGroupsData().then(
            function (groupsData) {
                $scope.groups = groupsData;
            },
            function (msg) {
                logErrorMessage(msg);
            }
        ).then(function () {
                //var members = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'members')[0];
                //$scope.members =  gdApi.sortByKey(members, 'balance', 'DESC');
                //$scope.currency = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'currency')[0];
                //$scope.groupTitle = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'name')[0];
                //$scope.groupDescription = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'description')[0];
                //$scope.formData = {};
                //$scope.formData.groupTitle = $scope.groupTitle;
                //$scope.formData.groupDescription  = $scope.groupDescription ;
                //$scope.categories = gdApi.getGroupCategories($scope.groups,$scope.gid);
                //$scope.categoryCount = $scope.categories.length;
                //
                //$scope.groupCurrency = $scope.currency;
                //$scope.selectedCurrencyCode = $scope.currency;
                //$scope.selectedCurrency = iso4217.getCurrencyByCode($scope.selectedCurrencyCode);
                updateGroupsList();
            }
        );
        $scope.gid = $stateParams.gid;

        $scope.$watch(
            function () {
                return gdApi.groupsCacheCreated($scope.gid);
            },

            function(newVal, oldVal) {
                console.log("Groups were updated, reloading");
                //console.log(newVal);
                //console.log(oldVal);
                var uid = gdApi.UID();
                if (typeof(uid) != 'undefined') {
                    updateGroupsList();
                }
            }, true
        );

        function updateGroupsList(){
            gdApi.fetchUsersData().then(
                function (usersData) {
                    $scope.users = usersData;
                },
                function (msg) {
                    logErrorMessage(msg);
                }
            ).then(
                gdApi.fetchGroupsData().then(
                    function (groupsData) {
                        $scope.groups = groupsData;
                        var members = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'members')[0];
                        $scope.members =  gdApi.sortByKey(members, 'balance', 'DESC');
                        $scope.currency = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'currency')[0];
                        $scope.groupTitle = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'name')[0];
                        $scope.groupDescription = _.pluck(_.filter($scope.groups, {'gid': Number($stateParams.gid)}), 'description')[0];
                        $scope.formData = {};
                        $scope.formData.groupTitle = $scope.groupTitle;
                        $scope.formData.groupDescription  = $scope.groupDescription ;
                        $scope.categories = gdApi.getGroupCategories($scope.groups,$scope.gid);
                        $scope.categoryCount = $scope.categories.length;

                        $scope.groupCurrency = $scope.currency;
                        $scope.selectedCurrencyCode = $scope.currency;
                        $scope.selectedCurrency = iso4217.getCurrencyByCode($scope.selectedCurrencyCode);
                        deleteGroupMsg = 'Delete group ' + $scope.groupTitle + '? Confirm by typing the group name.';
                        $scope.my_role_id = 4;
                        manageMemberArray();
                    },
                    function (msg) {
                        logErrorMessage(msg);
                    }
                )
            );
        }

        $scope.memberList = [];
        function manageMemberArray(){
            var memberList = [];
            var myUID = gdApi.UID();
            for (var i = 0; i < $scope.members.length; i++) {
                //console.log($scope.members[i]);
                if (typeof($scope.users[$scope.members[i].uid]) == 'undefined') {
                    console.log("Error: user " + uid + " not found");
                } else {
                    memberList[i] = $scope.users[$scope.members[i].uid];
                    memberList[i].role_id = $scope.members[i].role_id;
                    memberList[i].role = $scope.members[i].role;
                    if ($scope.members[i].uid == myUID) {
                        $scope.my_role_id = $scope.members[i].role_id;
                    }
                }
            }
            $scope.memberList =  gdApi.sortByKey(memberList, 'lastName', 'ASC');
            //console.log($scope.memberList);
        }



        var currenciesKeys = gdApi.getCurrencies();
        var currencies = [];
        for (var i = 0; i < currenciesKeys.length; i++) {
            currencies[i] = iso4217.getCurrencyByCode(currenciesKeys[i]);
            currencies[i].code = currenciesKeys[i];
        }
        $scope.currencyList = currencies;

        $scope.newCurrencySelected = function (newCurrencyCode) {
            //gdApi.setGroupCurrency($scope.gid, newCurrencyCode);
            $scope.currency = newCurrencyCode;
            $scope.saveSettings();
            //$state.go('group.settings', {gid: $scope.gid});
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

        $scope.isGroupFounder = true;
        var deleteGroupTitle = 'Delete group';
        $scope.deleteGroup = function () {
            $cordovaDialogs.prompt(deleteGroupMsg, deleteGroupTitle , ['OK', 'Cancel'], '')
                .then(function (result) {
                    if (result.input1.length > 0 && result.input1 == $scope.groupTitle) {
                        console.log('Deleting group ' + result.input1);
                        gdApi.deleteGroup(Number($stateParams.gid)).then(
                            function (groupDeleted) {
                                //console.log("email found: " + emailFound);
                                if (groupDeleted){
                                    console.log("group is deleted");
                                } else {
                                    console.log("Error deleting group");
                                }
                            },
                            function (msg) {
                                console.log(msg);
                            }
                        ).then(
                            function (response) {
                                gdApi.fetchGroupsData(true);
                                $state.go('home.groups');
                            },
                            function (msg) {
                                console.log(msg);
                            }
                        );

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

        $scope.saveSettings = function() {

            $scope.groupTitle = $scope.formData.groupTitle;
            $scope.groupDescription = $scope.formData.groupDescription;

            var settings = {};
            settings[$scope.gid] = {
                    'gid': $scope.gid,
                    'name': $scope.groupTitle,
                    'description': $scope.groupDescription,
                    'currency': $scope.currency
                    };

            gdApi.updateGroupSettings(settings);
            $ionicHistory.clearCache().then((function () {
                    return $state.go('group.settings', {gid: $scope.gid})
                }));
        };


        $scope.memberName = function (uid) {
            if (typeof($scope.users[uid]) == 'undefined') {
                return "Error: user " + uid + " not found";
            }
            return $scope.users[uid]['nickName'];
        };

    }

})();