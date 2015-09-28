/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').factory('gdApi', ['$http', '$localStorage', 'authenticationDataService', '$rootScope', '$state', 'gdConfig', '$q', 'CacheFactory', gdApi]);

    function gdApi($http, $localStorage, authenticationDataService, $rootScope, $state, gdConfig, $q, CacheFactory) {

        var currencies = JSON.parse('["EUR","USD","GBP","CHF"]');

        if (!CacheFactory.get('groupsCache')) { self.groupsCache = CacheFactory('groupsCache'); }
        if (!CacheFactory.get('usersCache')) { self.usersCache = CacheFactory('usersCache'); }
        if (!CacheFactory.get('expensesCache')) { self.expensesCache = CacheFactory('expensesCache'); }

        function clearAllCache()  {
            CacheFactory.clearAll()
        }

        function login($username, $password) {
            $localStorage.$reset();
            clearAllCache();
            var deferred = $q.defer();

            authenticationDataService.setAuthData($username, $password);
            $http.get(gdConfig.url_login)
                .success(function (data, status) {
                    console.log("Login success: credentials for " + $username + " are valid");
                    $localStorage.authenticated = true;
                    deferred.resolve(data);
                })
                .error(function (msg, code) {
                    console.log("Login failed: invalid credentials supplied for " + $username);
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

        function fetchGroupsData() {
            var deferred = $q.defer();

            var cacheKey = "groups";
            var groupsData = self.groupsCache.get(cacheKey);
            if (groupsData) {
                console.log("Groups data loaded from cache");
                //console.log(groupsData);
                deferred.resolve(groupsData);
            }

            $http.get(gdConfig.url_groups)
                .success(function (data, status) {
                    console.log("Groups data fetched successfully");
                    //$localStorage.groups = data;
                    var groupsArray = [];
                    var i = 0;
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            groupsArray[i] = data[key];
                            i++;
                        }
                    }
                    self.groupsCache.put(cacheKey, groupsArray);
                    deferred.resolve(groupsArray);
                })
                .error(function (msg, code) {
                    console.log("Error fetching groups data");
                    $localStorage.authenticated = false;
                    deferred.reject(msg);
                });

            return deferred.promise;
        }


        function fetchUsersData() {
            var deferred = $q.defer();
            //if ($localStorage.users) {
            //    console.log("Users data stored locally");
            //    return deferred.resolve($localStorage.users);
            //}

            var cacheKey = "users";
            var usersData = self.usersCache.get(cacheKey);
            if (usersData) {
                console.log("Users data loaded from cache");
                return deferred.resolve(usersData);
            }

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
            return deferred.promise;
        }

        function fetchExpensesData(gid) {
            var deferred = $q.defer();
            //if ($localStorage.expenses && $localStorage.expenses[gid]) {
            //    return deferred.resolve($localStorage.expenses[gid]);
            //}
            //if (!$localStorage.expenses) {
            //    $localStorage.expenses = {};
            //}

            var cacheKey = "gid-" + gid;
            var expensesData = self.expensesCache.get(cacheKey);
            if (expensesData) {
                return deferred.resolve(expensesData);
            }

            var url_expenses = gdConfig.url_expenses.replace('{gid}', gid);
            $http.get(url_expenses)
                .success(function (data, status) {
                    console.log("Expenses data for group " + gid + " fetched successfully");
                    //$localStorage.expenses[gid] = data[gid];
                    //console.log($localStorage.expenses);
                    self.expensesCache.put(cacheKey, data);
                    deferred.resolve(data);
                })
                .error(function () {
                    console.log("Error fetching groups data");
                    $localStorage.authenticated = false;
                    deferred.reject();
                });
            return deferred.promise;
        }

        function getGroupTitle($stateParams) {
            return getGroupTitleByGid($stateParams.gid);
        }

        function moveGroup(group, fromIndex, toIndex) {
            return fetchGroupsData().then(moveItemForSort(groups, group, fromIndex, toIndex));
        }

        function objectToArraySorted(obj, arr) {
            if (arr.length > 0)
                return arr;

            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (arr.length == 0) {
                        arr[0] = obj[i];
                        continue;
                    }
                    else if (Number(obj[i].sort) > Number(arr[arr.length - 1].sort)) {
                        arr.push(obj[i]);
                        continue;
                    }
                    for (var j in arr) {
                        if (Number(obj[i].sort) < Number(arr[j].sortId)) {
                            arr.splice(j, 0, obj[i]);
                        }
                    }
                }
            }
            return arr;
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
            var groups = fetchGroupsData();
            return groups[gid]['members'];
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
            var order = descending ? -1 : 1;
            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];

                if (typeof x == "string")
                {
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }

                return ((x < y) ? -1 * order : ((x > y) ? 1 * order  : 0));
            });
        }

        function getExpenses(gid) {
            return $localStorage.expenses[gid];
        }

        function getExpense(gid, eid) {
            return _.filter($localStorage.expenses[gid], {'eid': Number(eid)})[0];
        }

        function getGroupCurrency(gid) {
            fetchGroupsData().then(function (groupsArray) {
                return _.pluck(_.filter(groupsArray, {'gid': Number(gid)}), 'currency')[0];
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
            for (var i = 0, len = $localStorage.expenses[gid].length; i < len; i++) {
                if ($localStorage.expenses[gid][i].eid == Number(expense.eid)) {
                    $localStorage.expenses[gid][i] = expense;
                    break;
                }
            }
        }

        var newExpensesMargin = 100000000;

        function addExpense(gid, expense) {
            newExpensesMargin += 1;
            expense.eid = newExpensesMargin;
            $localStorage.expenses[gid].unshift(expense);
        }

        var groupCategories = [];
        for (var i in $localStorage.groups) {
            groupCategories[$localStorage.groups[i].gid] = [];
        }

        function getGroupCategories(gid) {

            fetchGroupsData().then(function (groupsArray) {
                return objectToArraySorted(_.pluck(_.filter(groupsArray, {'gid': Number(gid)}), 'categories')[0], groupCategories[gid]);
            });


            //return _.pluck(_.filter(groupsArray, {'gid': Number(gid)}), 'categories')[0];
        }

        function getGroupCategory(gid, cid) {
            for (var j in groupCategories[gid]) {
                if (groupCategories[gid][j].cid == cid)
                    return groupCategories[gid][j];
            }
        }

        function moveCategory(gid, category, fromIndex, toIndex) {
            return moveItemForSort(groupCategories[gid], category, fromIndex, toIndex);
        }

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
            for (var i = 0, len = $localStorage.expenses[gid].length; i < len; i++) {
                if ($localStorage.expenses[gid][i].eid == eid) {
                    $localStorage.expenses[gid].splice(i, 1);
                    break;
                }
            }
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
            sortByKey: sortByKey
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