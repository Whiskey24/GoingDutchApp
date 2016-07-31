/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
//    'use strict';

    angular.module('GoingDutchApp').controller('LoginCtrl', ['$stateParams', '$scope', 'gdApi', '$state', '$ionicLoading', '$ionicPopup', LoginCtrl]);

    function LoginCtrl($stateParams, $scope, gdApi, $state, $ionicLoading, $ionicPopup) {

        var credentials = gdApi.getCredentials();
        $scope.showForgetEmail = false;
        $scope.emailNotFound = false;
        $scope.newPwdSendSuccess = false;
        $scope.newPwdSendFailed = false;


        $scope.login = function (credentials) {
            $ionicLoading.show();
            gdApi.login(credentials)
                .then(gdApi.fetchGroupsData)
                .then(gotoHome, logErrorMessage);
        };

        $scope.returnToLogin = function () {
            $scope.showForgetEmail = false;
            $scope.emailNotFound = false;
            $scope.newPwdSendSuccess = false;
            $scope.newPwdSendFailed = false;
        };

        $scope.forgotPwd = function () {
            $scope.showForgetEmail = !$scope.showForgetEmail;
        };


        $scope.resetPwd = function (credentials){
            $scope.emailNotFound = false;
            $scope.newPwdSendSuccess = false;
            $scope.newPwdSendFailed = false;
            console.log("check " + credentials.username);
            gdApi.validateEmailExists(credentials.username).then(
                function (emailFound) {
                    //console.log("email found: " + emailFound);
                    if (emailFound){
                        // send email
                        gdApi.sendNewPwd(credentials.username).then(
                            function(sendResult) {
                                if (sendResult == true) {
                                    $scope.newPwdSendSuccess = true;
                                } else {
                                    $scope.newPwdSendFailed = true;
                                }
                            },
                            function (msg) {
                                console.log(msg);
                            }
                        )
                    } else {
                        $scope.emailNotFound = true;
                    }

                },
                function (msg) {
                    console.log(msg);
                }
            );
        };

        if (credentials !== undefined){
            $scope.login(credentials);
        }

        function gotoHome(groupsData) {
            $scope.groups = groupsData;
            $ionicLoading.hide();
            preLoadExpenses();
            $state.go('home.groups');
        }

        function preLoadExpenses() {
            gdApi.fetchUsersData()
                .then(function () {
                    //users = data;
                }, function (msg) {
                    logErrorMessage(msg);
                }
            );

            console.log("Group count: " + $scope.groups.length);
            for (var index = 0; index < $scope.groups.length; index++) {
                gdApi.fetchExpensesData($scope.groups[index].gid)
                    .then(function (data) {
                        //console.log(data);
                    }, function (error) {
                        logErrorMessage(error);
                    }
                );
            }
        }

        function logErrorMessage(error) {
            $ionicLoading.hide();
            if (error == "Not authorized") {
                $scope.showAlert("credentials");
            }
            else {
                $scope.showAlert("connectivity");
            }
            console.log("Error: " + error);

        }

        // An alert dialog
        $scope.showAlert = function(errortype) {
            var title = 'Invalid credentials';
            var template = "Could not login :(";
            console.log(errortype);
            if (errortype != "credentials"){
                var title = 'Connectivity problem';
                var template = "Could not reach the server";
            }
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: template
            });

            alertPopup.then(function(res) {
                //console.log('Thank you for not eating my delicious ice cream cone');
            });
        };

        /* repeatString() returns a string which has been repeated a set number of times */
        function repeatString(str, num) {
            out = '';
            for (var i = 0; i < num; i++) {
                out += str;
            }
            return out;
        }

        /*
         dump() displays the contents of a variable like var_dump() does in PHP. dump() is
         better than typeof, because it can distinguish between array, null and object.
         Parameters:
         v:              The variable
         howDisplay:     "none", "body", "alert" (default)
         recursionLevel: Number of times the function has recursed when entering nested
         objects or arrays. Each level of recursion adds extra space to the
         output to indicate level. Set to 0 by default.
         Return Value:
         A string of the variable's contents
         Limitations:
         Can't pass an undefined variable to dump().
         dump() can't distinguish between int and float.
         dump() can't tell the original variable type of a member variable of an object.
         These limitations can't be fixed because these are *features* of JS. However, dump()
         */
        function dump(v, howDisplay, recursionLevel) {
            howDisplay = (typeof howDisplay === 'undefined') ? "alert" : howDisplay;
            recursionLevel = (typeof recursionLevel !== 'number') ? 0 : recursionLevel;


            var vType = typeof v;
            var out = vType;

            switch (vType) {
                case "number":
                /* there is absolutely no way in JS to distinguish 2 from 2.0
                 so 'number' is the best that you can do. The following doesn't work:
                 var er = /^[0-9]+$/;
                 if (!isNaN(v) && v % 1 === 0 && er.test(3.0))
                 out = 'int';*/
                case "boolean":
                    out += ": " + v;
                    break;
                case "string":
                    out += "(" + v.length + '): "' + v + '"';
                    break;
                case "object":
                    //check if null
                    if (v === null) {
                        out = "null";

                    }
                    //If using jQuery: if ($.isArray(v))
                    //If using IE: if (isArray(v))
                    //this should work for all browsers according to the ECMAScript standard:
                    else if (Object.prototype.toString.call(v) === '[object Array]') {
                        out = 'array(' + v.length + '): {\n';
                        for (var i = 0; i < v.length; i++) {
                            out += repeatString('   ', recursionLevel) + "   [" + i + "]:  " +
                                dump(v[i], "none", recursionLevel + 1) + "\n";
                        }
                        out += repeatString('   ', recursionLevel) + "}";
                    }
                    else { //if object
                        sContents = "{\n";
                        cnt = 0;
                        for (var member in v) {
                            //No way to know the original data type of member, since JS
                            //always converts it to a string and no other way to parse objects.
                            sContents += repeatString('   ', recursionLevel) + "   " + member +
                                ":  " + dump(v[member], "none", recursionLevel + 1) + "\n";
                            cnt++;
                        }
                        sContents += repeatString('   ', recursionLevel) + "}";
                        out += "(" + cnt + "): " + sContents;
                    }
                    break;
            }

            if (howDisplay == 'body') {
                var pre = document.createElement('pre');
                pre.innerHTML = out;
                document.body.appendChild(pre)
            }
            else if (howDisplay == 'alert') {
                alert(out);
            }

            return out;
        }


    }
})();