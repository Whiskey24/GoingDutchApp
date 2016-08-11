/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').factory('gdApi', ['$http', '$localStorage', 'authenticationDataService', '$rootScope', '$state', 'gdConfig', '$q', 'CacheFactory', gdApi]);

    function gdApi($http, $localStorage, authenticationDataService, $rootScope, $state, gdConfig, $q, CacheFactory) {

        var currencies = JSON.parse('["EUR","USD","GBP","CHF"]');

        if (!CacheFactory.get('groupsCache')) {
            self.groupsCache = CacheFactory('groupsCache', {storageMode: 'localStorage', maxAge: 15 * 60 * 1000, deleteOnExpire: 'aggressive',
                onExpire: function (key, value) {
                    console.log("gdApi: groupsCache expired, refreshing");
                    fetchGroupsData(true).then(
                        function (groupsData) {
                            for (var index = 0; index < groupsData.length; index++) {
                                fetchExpensesData(groupsData[index].gid, true)
                                    .then(function (data) {
                                            //console.log(data);
                                        }, function (error) {
                                            logErrorMessage(error);
                                        }
                                    );
                            }
                        },
                        function (msg) {
                            logErrorMessage(msg);
                        }
                    );
            }
            });
        }
        if (!CacheFactory.get('usersCache')) {
            self.usersCache = CacheFactory('usersCache', {storageMode: 'localStorage'});
        }
        if (!CacheFactory.get('expensesCache')) {
            self.expensesCache = CacheFactory('expensesCache', {storageMode: 'localStorage', maxAge: 15 * 60 * 1000, deleteOnExpire: 'aggressive',
                onExpire: function (key, value) {
                    console.log("gdApi: usersCache expired, refreshing");
                    fetchUsersData(true);
                }
            });
        }
        if (!CacheFactory.get('userPrefs')) {
            self.userPrefsCache = CacheFactory('userPrefs', {storageMode: 'localStorage', maxAge: 15 * 60 * 1000});
        }

        ///fetchUsersData

        // keep track of often used properties
        // will be refreshed upon cache refresh
        var groupProperties = {};

        // keep track of uid of current user
        function getUid() {
            return self.userPrefsCache.get('uid');
        }
        function setUid(userUid) {
            self.userPrefsCache.put('uid', userUid);
        }

        function getCredentials() {
            return self.userPrefsCache.get('credentials');
        }

        // ToDo: encrypt this
        function setCredentials(credentials) {
            self.userPrefsCache.put('credentials', credentials);
            authenticationDataService.setAuthData(credentials.username, credentials.password);
        }

        function updateEmail(email){
            var credentials = getCredentials();
            credentials.username = email;
            setCredentials(credentials);
        }

        function updatePassCredentials(password){
            var credentials = getCredentials();
            credentials.password = password;
            setCredentials(credentials);
        }

        function clearAllCache() {
            self.groupsCache.removeAll();
            self.usersCache.removeAll();
            self.expensesCache.removeAll();
            self.userPrefsCache.removeAll();
            //var expenses = self.expensesCache.get("expenses");
            //var users = self.expensesCache.get("users");
            //var groups = self.expensesCache.get("groups");
            //var userPrefs = self.expensesCache.get("userPrefs");
            //console.log("Expenses:");
            //console.log(expenses);
            //console.log("Users:");
            //console.log(users);
            //console.log("Groups:");
            //console.log(groups);
            //console.log("UserPrefs:");
            //console.log(userPrefs);
        }

        function login(credentials) {
            //$localStorage.$reset();
            //clearAllCache();

            var deferred = $q.defer();
            var $username = credentials.username;
            var $password = credentials.password;
            authenticationDataService.setAuthData($username, $password);
            $http.get(gdConfig.url_login)
                .success(function (data, status) {
                    console.log("Login success: credentials for " + $username + " are valid");
                    setCredentials(credentials);
                    $localStorage.authenticated = true;
                    setUid(data['uid']);
                    deferred.resolve(data);
                })
                .error(function (msg, code) {
                    console.log("Login failed: invalid credentials supplied for " + $username);
                    console.log(msg);
                    console.log(msg, code);
                    $localStorage.authenticated = false;
                    deferred.reject(msg);
                });
            return deferred.promise;
        }

        function logout() {
            $localStorage.$reset();
            authenticationDataService.resetAuthData();
            $localStorage.authenticated = false;
            clearAllCache();
        }

        // keep track of which groups user is owner
        var ownerGroups = [];
        var adminGroups = [];
        function fetchGroupsData(forceRefresh) {
            if (typeof forceRefresh === "undefined" || forceRefresh === null) {
                forceRefresh = false;
            }
            var deferred = $q.defer();
            var cacheKey = "groups";
            if (!CacheFactory.get('groupsCache')) {
                return;
            }
            var groupsData = self.groupsCache.get(cacheKey);
            if (groupsData && !forceRefresh) {
                console.log("Groups data loaded from cache");
                //console.log(groupsData);
                deferred.resolve(groupsData);
            } else {
                $http.get(gdConfig.url_groups)
                    .success(function (data, status) {
                        console.log("Groups data fetched successfully");
                        ownerGroups = [];
                        adminGroups = [];
                        //$localStorage.groups = data;
                        groupProperties = {};
                        var groupsArray = [];
                        var i = 0;
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                groupsArray[i] = data[key];
                                if (data[key].role === "founder"){
                                    ownerGroups.push(data[key].gid);
                                }
                                if (data[key].role === "admin (full)"){
                                    adminGroups.push(data[key].gid);
                                }
                                if (typeof(groupProperties[data[key].gid]) == 'undefined') {
                                    groupProperties[data[key].gid] = {
                                        'title': data[key].name,
                                        'currency': data[key].currency
                                    };
                                }
                                i++;
                            }
                        }
                        // console.log(groupsArray);
                        groupsArray = sortByKey(groupsArray, 'sort', 'ASC');
                        self.groupsCache.put(cacheKey, groupsArray);
                        deferred.resolve(groupsArray);
                    })
                    .error(function (msg, code) {
                        console.log("Error fetching groups data");
                        $localStorage.authenticated = false;
                        deferred.reject(msg);
                    });
            }
            return deferred.promise;
        }


        function fetchUsersData(forceRefresh) {
            if (typeof forceRefresh === "undefined" || forceRefresh === null) {
                forceRefresh = false;
            }
            var deferred = $q.defer();

            // ToDo: optionally limit to group id

            var cacheKey = "users";
            var usersData = self.usersCache.get(cacheKey);

            if (usersData && !forceRefresh) {
                console.log("Users data loaded from cache");
                deferred.resolve(usersData);
            } else {
                $http.get(gdConfig.url_users)
                    .success(function (data, status) {
                        console.log("Users data fetched successfully");
                        //$localStorage.users = data;
                        self.usersCache.put(cacheKey, data);
                        deferred.resolve(data);
                    })
                    .error(function (msg, code) {
                        console.log("Error fetching users data");
                        $localStorage.authenticated = false;
                        deferred.reject(msg);
                    });
            }
            return deferred.promise;
        }

        function validateEmailExists(email){
            var deferred = $q.defer();
            var emailObj = {};
            emailObj.email = email;
            $http.post(gdConfig.url_emailExists, emailObj)
                        .success(function (data, status) {
                            console.log("Emailexists successfully called");
                            var result = false;
                            if (data.error == 0 && data.exists == 1) {
                                result = true;
                            }
                            deferred.resolve(result);
                        })
                        .error(function (msg, code) {
                            console.log("Error calling Emailexists");
                            deferred.reject(msg);
                        });
            return deferred.promise;
        }

        function registerUser(details){
            var deferred = $q.defer();
            $http.post(gdConfig.url_registerUser, details)
                .success(function (data, status) {
                    console.log("registerUser successfully called");
                    var result = false;
                    if (data.success == 1) {
                        result = true;
                    }
                    deferred.resolve(result);
                })
                .error(function (msg, code) {
                    console.log("Error calling registerUser");
                    deferred.reject(msg);
                });
            return deferred.promise;
        }

        function changeRole(gid, uid, role_id){
            var details = {};
            details.role_id = role_id;
            var deferred = $q.defer();
            var url_changeRole= gdConfig.url_changeRole.replace('{gid}', gid) + uid;
            $http.put(url_changeRole, details)
                .success(function (data, status) {
                    console.log("changeRole successfully called");
                    var result = false;
                    if (data.success == 1) {
                        result = true;
                    }
                    deferred.resolve(result);
                })
                .error(function (msg, code) {
                    console.log("Error calling changeRole");
                    deferred.reject(msg);
                });
            return deferred.promise;
        }

        function updateUserDetails(details){
            var deferred = $q.defer();
            var url_updateUserDetails= gdConfig.url_updateUserDetails.replace('{uid}', details.uid);
            $http.put(url_updateUserDetails, details)
                .success(function (data, status) {
                    console.log("updateUserDetails successfully called");
                    // console.log(data);
                    var result = false;
                    if (data.uid == details.uid) {
                        result = true;
                    }
                    deferred.resolve(result);
                })
                .error(function (msg, code) {
                    console.log("Error calling updateUserDetails");
                    deferred.reject(msg);
                });
            return deferred.promise;
        }

        function updatePass(uid, password){
            var details = {};
            details.password = password;

            var deferred = $q.defer();
            var url_updatePass = gdConfig.url_updatePass.replace('{uid}', uid);
            $http.put(url_updatePass, details)
                .success(function (data, status) {
                    console.log("updatePass successfully called");
                    // console.log(data);
                    var result = false;
                    if (data.uid == details.uid) {
                        result = true;
                        updatePassCredentials(password);
                    }
                    deferred.resolve(result);
                })
                .error(function (msg, code) {
                    console.log("Error calling updatePass");
                    deferred.reject(msg);
                });
            return deferred.promise;
        }



        function createGroup(details){
            var deferred = $q.defer();
            $http.post(gdConfig.url_createGroup, details)
                .success(function (data, status) {
                    console.log("createGroup successfully called");
                    var result = false;
                    if (data.success == 1) {
                        result = true;
                    }
                    deferred.resolve(result);
                })
                .error(function (msg, code) {
                    console.log("Error calling createGroup");
                    deferred.reject(msg);
                });
            return deferred.promise;
        }

        function deleteGroup(gid){
            var deferred = $q.defer();
            var url_deleteGroup = gdConfig.url_deleteGroup.replace('{gid}', gid);
            $http.delete(url_deleteGroup)
                .success(function (data, status) {
                    console.log("deleteGroup successfully called");
                    var result = false;
                    if (data.success == 1) {
                        result = true;
                    }
                    deferred.resolve(result);
                })
                .error(function (msg, code) {
                    console.log("Error calling deleteGroup");
                    deferred.reject(msg);
                });
            return deferred.promise;
        }

        function removeMember(gid,uid){
            var deferred = $q.defer();
            var url_removeMember = gdConfig.url_removeMember.replace('{gid}', gid) + uid;
            $http.delete(url_removeMember)
                .success(function (data, status) {
                    console.log("removeMember successfully called");
                    var result = false;
                    if (data.success == 1) {
                        result = true;
                    }
                    deferred.resolve(result);
                })
                .error(function (msg, code) {
                    console.log("Error calling removeMember");
                    deferred.reject(msg);
                });
            return deferred.promise;
        }

        function sendNewPwd(email){
            var deferred = $q.defer();
            var emailObj = {};
            emailObj.email = email;
            $http.post(gdConfig.url_sendNewPwd, emailObj)
                .success(function (data, status) {
                    console.log("sendNewPwd successfully called");
                    var result = false;
                    if (data.success == 1) {
                        result = true;
                    }
                    deferred.resolve(result);
                })
                .error(function (msg, code) {
                    console.log("Error calling sendNewPwd");
                    deferred.reject(msg);
                });
            return deferred.promise;
        }

        function fetchExpensesData(gid, forceRefresh) {
            if (typeof forceRefresh === "undefined" || forceRefresh === null) {
                forceRefresh = false;
            }
            var deferred = $q.defer();
            //if ($localStorage.expenses && $localStorage.expenses[gid]) {
            //    return deferred.resolve($localStorage.expenses[gid]);
            //}
            //if (!$localStorage.expenses) {
            //    $localStorage.expenses = {};
            //}

            var cacheKey = "gid-" + gid;
            var expensesData = self.expensesCache.get(cacheKey);
            if (expensesData && !forceRefresh) {
                console.log("Expenses data for group " + gid + " loaded from cache");
                deferred.resolve(expensesData);
            } else {
                var url_expenses = gdConfig.url_expenses.replace('{gid}', gid);
                $http.get(url_expenses)
                    .success(function (data, status) {
                        console.log("Expenses data for group " + gid + " fetched successfully");
                        //$localStorage.expenses[gid] = data[gid];
                        //console.log($localStorage.expenses);
                        self.expensesCache.put(cacheKey, data[gid]);
                        //console.log(self.expensesCache.info(cacheKey));
                        deferred.resolve(data[gid]);
                    })
                    .error(function () {
                        console.log("Error fetching groups data");
                        $localStorage.authenticated = false;
                        deferred.reject();
                    });
            }
            return deferred.promise;
        }

        function expenseCacheCreated(gid) {
            var cacheKey = "gid-" + gid;
            if (self.expensesCache && self.expensesCache.info(cacheKey))
                return self.expensesCache.info(cacheKey).created;
            else
                return 0;
        }

        function groupsCacheCreated(gid) {
            var cacheKey = "groups";
            if (self.groupsCache && self.groupsCache.info(cacheKey))
                return self.groupsCache.info(cacheKey).created;
            else
                return 0;
        }

        function getGroupTitle($stateParams) {
            //return getGroupTitleByGid($stateParams.gid);
            console.log("OBSOLETE - REMOVE USE OF THIS FUNCTION, it returns group title: " + groupProperties[$stateParams.gid].title);
            return groupProperties[$stateParams.gid].title;
        }

        function moveGroup(group, fromIndex, toIndex) {
            return fetchGroupsData().then(moveItemForSort(groups, group, fromIndex, toIndex));
        }

        function objectToArraySorted(obj, arr) {
            if (!arr)
                arr = [];

            if (arr.length > 0)
                return arr;

            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (arr.length == 0) {
                        arr[0] = obj[i];
                        //dumpArr(arr);
                        continue;
                    }
                    else if (Number(obj[i].sort) > Number(arr[arr.length - 1].sort)) {
                        arr.push(obj[i]);
                        //dumpArr(arr);
                        continue;
                    }
                    else if (Number(obj[i].sort) < Number(arr[0].sort)) {
                        arr.unshift(obj[i]);
                        //dumpArr(arr);
                        continue;
                    }
                    for (var j in arr) {
                        if (Number(obj[i].sort) < Number(arr[j].sort)) {
                            arr.splice(j, 0, obj[i]);
                            //dumpArr(arr);
                            break;
                        }
                    }
                }
            }
            return arr;
        }

        function dumpArr(arr){
            var str = "";
            for (var key in arr) {
                str += "[ sort=" + arr[key].sort + " " + arr[key].title + " cid=" + arr[key].cid  + "\n";
            }
            console.log(str);
        }

        function moveItemForSort(arr, item, fromIndex, toIndex) {
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, item);
            updateSortIds(arr);
            return arr;
        }

        function updateSortIds(arr) {
            for (var j in arr) {
                arr[j].sort = Number(j) + 1;
            }
        }

        //function updateGroupSortIds() {
        //    for (var j in groupsArray) {
        //        groupsArray[j].sort = Number(j) + 1;
        //    }
        //}

        function getUser(uid) {
            var users = fetchUsersData();
            return users[uid];
        }

        function getUserName(uid) {
            var users = fetchUsersData();
            if (typeof(users[uid]) == 'undefined') {
                return "Error: user " + uid + " not found";
            }
            return users[uid]['nickName'];
        }

        function getGroupTitleByGid(gid) {
            //return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'title')[0];
            var groups = fetchGroupsData();
            return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'name')[0];
        }

        function getGroupMembers(gid) {
            //var groups = fetchGroupsData();

            fetchGroupsData(gid).then(
                function (groups) {
                    //console.log(_.pluck(_.filter(groups, {'gid': Number(gid)}), 'members')[0]);
                    //return groups[gid]['members'];
                    return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'members')[0];
                });

        }

        function sortByKey(array, key, descending) {
            if (array.constructor !== Array) {
                var newArray = [];
                var i = 0;
                for (var keyy in array) {
                    if (array.hasOwnProperty(keyy)) {
                        newArray[i] = array[keyy];
                        i++;
                    }
                }
                array = newArray;
            }
            var order = descending && descending.toUpperCase() !== 'ASC' ? -1 : 1;
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];

                if (typeof x == "string") {
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }

                return ((x < y) ? -1 * order : ((x > y) ? 1 * order : 0));
            });
        }

        function getExpenses(gid) {
            return $localStorage.expenses[gid];
        }

        function getExpense(gid, eid) {
            return _.filter($localStorage.expenses[gid], {'eid': Number(eid)})[0];
        }

        function getGroupCurrency(gid) {
            //return _.pluck(_.filter(groupsArray, {'gid': Number(gid)}), 'currency')[0];
            // return groupProperties[gid].currency;

            fetchGroupsData(gid).then(
                function (groups) {
                    var currency = _.pluck(_.filter(groups, {'gid': Number(gid)}), 'currency')[0];
                    console.log("OBSOLETE - REMOVE USE OF THIS FUNCTION, it returns currency: " + currency);
                    return currency;
                });
        }

        function setGroupCurrency(gid, currencyCode) {
            for (var i = 0, len = groupsArray.length; i < len; i++) {
                if (groupsArray[i].gid == Number(gid)) {
                    groupsArray[i].currency = currencyCode;
                    break;
                }
            }
        }



        function updateExpense(gid, expense) {
            cacheExpenseChange(expense);
            var url_expenses = gdConfig.url_expenses.replace('{gid}', gid);
            $http.put(url_expenses, expense)
                .then(function (response) {
                    if (typeof (response.data) == "string" && response.data.substring(0,5) == "Error"){
                        console.log("Error submitting expense");
                    }
                    else {
                        console.log("Expense submitted successfully");
                    }
                    //console.log(response.data);
                    //self.expensesCache.remove("gid-" + gid);
                    fetchExpensesData(gid, true)
                        .then(function (data) {
                            console.log("Expenses updated for group " + gid);
                            //console.log(self.expensesCache.info("gid-" + gid).created);
                            tempExpenseCache = {};
                            //self.groupsCache.remove("groups");
                        }, function (error) {
                            console.log("Error: " + error);
                        }).then(gdApi.fetchGroupsData);
                }, function (response) {
                    console.log("Error submitting expense: " + response);
                });
        }

        function updateGroupSettings(settings) {
            // cacheExpenseChange(expense);
            for (var key in settings) {
                // skip loop if the property is from prototype
                if (!settings.hasOwnProperty(key)) continue;
                cacheGroupSettingsChange(key, settings[key]);
            }

            var url_updateGroupSettings = gdConfig.url_updateGroupSettings;
            $http.put(url_updateGroupSettings, settings)
                .then(function (response) {
                    if (typeof (response.data) == "string" && response.data.substring(0,5) == "Error"){
                        console.log("Error updating group settings");
                    }
                    else {
                        console.log("Group settings updated successfully");
                    }
                    //console.log(response.data);
                    //self.expensesCache.remove("gid-" + gid);
                    fetchGroupsData(true)
                        .then(function (data) {
                            console.log("Groups updated");
                            tempGroupSettingsCache = {};
                        }, function (error) {
                            console.log("Error: " + error);
                        });
                }, function (response) {
                    console.log("Error updating group settings: " + response);
                });
        }

        // holds expenses that have just been updated and for which server update hasn't arrived yet
        var tempExpenseCache = {};

        function cacheExpenseChange(expense) {
            tempExpenseCache[expense.eid] = expense;
        }

        function checkTempCache(eid){
            return (eid in tempExpenseCache) ? tempExpenseCache[eid] : false;
        }

        var tempGroupSettingsCache = {};

        function cacheGroupSettingsChange(gid, settings) {
            tempGroupSettingsCache[gid] = settings;
        }

        function checkGroupSettingsCache(gid){
            return (gid in tempGroupSettingsCache) ? tempGroupSettingsCache[gid] : false;
        }


        var newExpensesMargin = 100000000;

        function addExpense(gid, expense) {

            newExpensesMargin += 1;
            expense.eid = newExpensesMargin;
            //$localStorage.expenses[gid].unshift(expense);
            // console.log(expense);
            //console.log(JSON.stringify(expense));
            var url_expenses = gdConfig.url_expenses.replace('{gid}', gid);
            $http.post(url_expenses, expense)
                .then(function (response) {
                    if (typeof (response.data) == "string" && response.data.substring(0,5) == "Error"){
                        console.log("Error submitting expense");
                    }
                    else {
                        console.log("Expense submitted successfully");
                    }
                    console.log(response.data);
                    //self.expensesCache.remove("gid-" + gid);
                    fetchExpensesData(gid, true)
                        .then(function (data) {
                            //console.log("Expenses updated for group " + gid);
                            //console.log(self.expensesCache.info("gid-" + gid).created);
                            //self.groupsCache.remove("groups");
                        }, function (error) {
                            console.log("Error: " + error);
                        }).then(gdApi.fetchGroupsData);
                }, function (response) {
                    console.log("Error submitting expense");
                });
                //
                //.success(function (data, status) {
                //    if (data.substring(0,5) == "Error"){
                //        console.log("Error submitting expense");
                //    }
                //    else {
                //        console.log("Expense submitted successfully");
                //    }
                //    console.log(data);
                //})
                //.error(function () {
                //    console.log("Error submitting expense");
                //});
        }

        function updateGroupSort(groupList) {
            var url_updateGroups = gdConfig.url_updateGroupSort.replace('{uid}', getUid());
            $http.put(url_updateGroups, groupList)
                .then(function (response) {
                    if (typeof (response.data) == "string" && response.data.substring(0,5) == "Error"){
                        console.log("Error submitting updated group list");
                    }
                    else {
                        console.log("Updated group list submitted successfully");
                    }
                    fetchGroupsData(true);
                }, function (response) {
                    console.log("Error updating group sort");
                });
        }

        function updateGroupCategories(gid, categoryList) {
            var url_updateCategories = gdConfig.url_updateGroupCategories.replace('{gid}', gid);
            $http.put(url_updateCategories, categoryList)
                .then(function (response) {
                    if (typeof (response.data) == "string" && response.data.substring(0,5) == "Error"){
                        console.log("Error submitting updated category list for group " + gid);
                    }
                    else {
                        console.log("Updated group list submitted successfully for group " + gid);
                    }
                    //self.expensesCache.remove("gid-" + gid);
                    fetchExpensesData(gid, true)
                        .then(function (data) {
                            console.log("Expenses updated for group " + gid);
                            //console.log(self.expensesCache.info("gid-" + gid).created);
                            tempExpenseCache = {};
                            //self.groupsCache.remove("groups");
                        }, function (error) {
                            console.log("Error: " + error);
                        }).then(fetchGroupsData(true));
                }, function (response) {
                    console.log("Error submitting updated category list for group " + gid);
                });
        }

        function getGroupCategories(groupsArray, gid) {
            var categories =_.pluck(_.filter(groupsArray, {'gid': Number(gid)}), 'categories')[0];
            return objectToArraySorted(categories);
        }

        function getGroupCategory(gid, cid) {
            for (var j in groupCategories[gid]) {
                if (groupCategories[gid][j].cid == cid)
                    return groupCategories[gid][j];
            }
        }

        // ToDo: remove function
        function moveCategory(gid, category, fromIndex, toIndex) {
            return moveItemForSort(groupCategories[gid], category, fromIndex, toIndex);
        }

        // ToDo: remove this function
        function setGroupCategory(gid, category, newTitle) {
            if (category === 0) {
                var maxKey = 0;
                for (var i in groupCategories[gid]) {
                    if (groupCategories[gid][i].cid > maxKey) {
                        maxKey = groupCategories[gid][i].cid;
                    }
                }
                maxKey += 1;
                var sortId = groupCategories[gid].length + 1;
                groupCategories[gid][groupCategories[gid].length] = {
                    "cid": maxKey,
                    "title": newTitle,
                    "sort": sortId,
                    "presents": 0,
                    "inactive": 0,
                    "can_delete": 1
                }
            }

            else if (category.cid > 0) {
                //groups[gid]['categories'][cid] = newTitle;
                for (var i = 0, len = groupCategories[gid].length; i < len; i++) {
                    if (groupCategories[gid][i].cid == category.cid) {
                        groupCategories[gid][i].title = newTitle;
                        break;
                    }
                }
            }
            else {
                var maxKey = 0;
                for (var key in $localStorage.groups[gid]['categories']) {
                    if (groups[gid]['categories'].hasOwnProperty(key) && key > maxKey) {
                        maxKey = key;
                    }
                }
                maxKey += 1;
                $localStorage.groups[gid]['categories'][maxKey] = newTitle;
            }
        }

        function getCurrencies() {
            return currencies;
        }

        function getDateFormat(datetype) {
            switch (datetype) {
                case 'date':
                    return 'EEEE, MMMM d yyyy';
                    break;
                case 'time':
                    return 'HH:mm';
                    break;
                default:
                    return 'EEEE, MMMM d yyyy HH:mm';
            }
        }

        function deleteExpense(eid, gid) {
            //for (var i = 0, len = $localStorage.expenses[gid].length; i < len; i++) {
            //    if ($localStorage.expenses[gid][i].eid == eid) {
            //        $localStorage.expenses[gid].splice(i, 1);
            //        break;
            //    }
            //}


            var url_expenses = gdConfig.url_expenses.replace('{gid}', gid) + '/' + eid;
            $http.delete(url_expenses)
                .then(function (response) {
                    if (typeof (response.data) == "string" && response.data.substring(0,5) == "Error"){
                        console.log("Error submitting expense");
                    }
                    else {
                        console.log("Expense deleted successfully");
                    }
                    // console.log(response.data);
                    self.expensesCache.remove("gid-" + gid);
                    fetchExpensesData(gid, true)
                        .then(function (data) {
                            console.log("Expenses updated for group " + gid);
                            // console.log(self.expensesCache.info("gid-" + gid).created);
                            // self.groupsCache.remove("groups");
                        }, function (error) {
                            console.log("Error: " + error);
                        }).then(gdApi.fetchGroupsData);
                }, function (response) {
                    console.log("Error deleting expense");
                });

        }

        function pad(value) {
            return value < 10 ? '0' + value : value;
        }

        function createOffset(date) {
            var sign = (date.getTimezoneOffset() > 0) ? "-" : "+";
            var offset = Math.abs(date.getTimezoneOffset());
            var hours = pad(Math.floor(offset / 60));
            var minutes = pad(offset % 60);
            return sign + hours + ":" + minutes;
        }

        //var test = new Date();
        // offset in minutes but negative is really adding to utc
        //console.log(test.getTimezoneOffset());
        //console.log(createOffset(test));


        //var currentTS = Math.floor(Date.now() / 1000)
        //var dateObj = new Date(currentTS * 1000);
        //var London = new Date(currentTS * 1000 - 60 * 60 * 1000);

        function isOwner(gid){
            return ownerGroups.indexOf(gid) > -1;
        }

        function isAdmin(gid){
            return adminGroups.indexOf(gid) > -1;
        }

        return {
            //getGroups: getGroups,
            getGroupTitle: getGroupTitle,
            getGroupTitleByGid: getGroupTitleByGid,
            getExpenses: getExpenses,
            getExpense: getExpense,
            getGroupCurrency: getGroupCurrency,
            setGroupCurrency: setGroupCurrency,
            getCurrencies: getCurrencies,
            getUser: getUser,
            getUserName: getUserName,
            getGroupMembers: getGroupMembers,
            getDateFormat: getDateFormat,
            deleteExpense: deleteExpense,
            setGroupCategory: setGroupCategory,
            getGroupCategories: getGroupCategories,
            getGroupCategory: getGroupCategory,
            fetchGroupsData: fetchGroupsData,
            fetchUsersData: fetchUsersData,
            fetchExpensesData: fetchExpensesData,
            moveGroup: moveGroup,
            moveCategory: moveCategory,
            updateExpense: updateExpense,
            createOffset: createOffset,
            addExpense: addExpense,
            login: login,
            logout: logout,
            sortByKey: sortByKey,
            objectToArraySorted: objectToArraySorted,
            UID: getUid,
            getCredentials: getCredentials,
            expenseCacheCreated: expenseCacheCreated,
            groupsCacheCreated: groupsCacheCreated,
            isOwner: isOwner,
            isAdmin: isAdmin,
            updateGroupSort: updateGroupSort,
            updateGroupCategories: updateGroupCategories,
            updateGroupSettings: updateGroupSettings,
            checkTempCache: checkTempCache,
            checkGroupSettingsCache: checkGroupSettingsCache,
            validateEmailExists: validateEmailExists,
            sendNewPwd: sendNewPwd,
            registerUser: registerUser,
            createGroup: createGroup,
            deleteGroup: deleteGroup,
            removeMember: removeMember,
            changeRole: changeRole,
            updateUserDetails: updateUserDetails,
            updateEmail: updateEmail,
            updatePass: updatePass
        };


    }

})
();

// http://stackoverflow.com/questions/31608486/adding-header-to-angular-resource-requests
angular.module("GoingDutchApp").factory('authHttpRequestInterceptor', ['authenticationDataService',
    function (authenticationDataService) {
        return {
            request: function (config) {
                var token = authenticationDataService.getAuthData();

                if (token) {
                    config.headers["Authorization"] = "Basic " + token;
                }
                return config;
            }
        };
    }]);


angular.module("GoingDutchApp").factory("authenticationDataService", ['$localStorage', function ($localStorage) {

    function getAuthData() {
        return $localStorage.token;
    }

    function setAuthData($user, $pass) {
        $localStorage.token = Base64.encode($user + ':' + $pass);
    }

    function resetAuthData() {
        $localStorage.token = false;
    }

    /**
     *
     *  Base64 encode / decode
     *  http://www.webtoolkit.info/
     *
     **/
    var Base64 = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = Base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },

        // public method for decoding
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },

        // private method for UTF-8 encoding
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

    };

    return {
        getAuthData: getAuthData,
        setAuthData: setAuthData,
        resetAuthData: resetAuthData
    }
}]);