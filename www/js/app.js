angular.module('GoingDutchApp', ['ionic', 'GoingDutchApp.controllers', 'isoCurrency', 'ngCordova', 'ionic-timepicker', 'ionic-datepicker', 'ngStorage', 'angular-cache', 'ngPassword', 'jett.ionic.filter.bar'])

    // this does not seem to disable debug messages ...
    .config(['$logProvider', function($logProvider){
        $logProvider.debugEnabled(true);
    }])

    .constant('gdConfig', (function () {
        var host = 'http://api.gdutch.dev';
        //var host = 'https://going-dutch-api.appspot.com';
        //console.log("API host: " + host);
        return {
            host: host,
            port: 80,
            //port: 443,
            max_cache_age: 60 * 60 * 1000,  // 1 hour
            url_groups: host + '/groups',
            url_users: host + '/users',
            url_expenses: host + '/group/{gid}/expenses',
            url_updateGroupSettings: host + '/groups',
            url_updateGroupSort: host + '/user/{uid}/groups',
            url_updateGroupCategories: host + '/group/{gid}/categories',
            url_login: host + '/version',
            url_emailExists: host + '/emailexists',
            url_sendNewPwd: host + '/user/forgetpwd',
            url_registerUser: host + '/user',
            url_createGroup: host + '/group',
            url_deleteGroup: host + '/group/{gid}',
            url_removeMember: host + '/group/{gid}/members/',
            url_changeRole: host + '/group/{gid}/members/',
            url_updateUserDetails: host + '/user/{uid}/details',
            url_updatePass: host + '/user/{uid}/pass',
            url_changeSendEmail: host + '/group/{gid}/members/{uid}/email',
            url_addMembersToGroup: host + '/group/{gid}/members'
        }
    })())

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            // setup an abstract state for home tabs
            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'templates/home.html',
                data: {
                    requireLogin: true
                }
            })

            .state('public', {
                url: '/public',
                abstract: true,
                templateUrl: 'templates/public.html',
                data: {
                    requireLogin: false
                }
            })

            // setup an abstract state for groups tabs
            .state('group', {
                url: '/group/:gid',
                abstract: true,
                cache: false,
                templateUrl: 'templates/group.html',
                data: {
                    requireLogin: false
                }
            })

            .state('public.login', {
                url: '/login',
                views: {
                    'public-login': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('public.register', {
                url: '/register',
                views: {
                    'public-register': {
                        templateUrl: 'templates/register.html',
                        controller: 'RegisterCtrl'
                    }
                }
            })

            .state('home.newgroup', {
                url: '/newgroup',
                // cache: false,
                views: {
                    'home-new-group': {
                        templateUrl: 'templates/home-newgroup.html',
                        controller: 'NewGroupCtrl'
                    }
                }
            })

            .state('home.groups', {
                url: '/groups',
                views: {
                    'home-groups': {
                        templateUrl: 'templates/home-groups.html',
                        controller: 'GroupCtrl'
                    }
                }
            })

            .state('home.account', {
                url: '/account',
                // cache: false,
                params: { refresh: 1},
                views: {
                    'home-account': {
                        templateUrl: 'templates/home-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('home.account-details', {
                url: '/account/details',
                views: {
                    'home-account': {
                        templateUrl: 'templates/home-account-details.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('home.account-email', {
                url: '/account/email',
                views: {
                    'home-account': {
                        templateUrl: 'templates/home-account-email.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('home.account-password', {
                url: '/account/password',
                views: {
                    'home-account': {
                        templateUrl: 'templates/home-account-password.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            
            .state('home.logout', {
                url: '/logout',
                views: {
                    'home-account': {
                        templateUrl: 'templates/home-logout.html',
                        controller: 'LogoutCtrl'
                    }
                }
            })
            .state('group.members', {
                url: '/members',
                views: {
                    'group-members': {
                        templateUrl: 'templates/group-members.html',
                        controller: 'MemberCtrl'
                    }
                }
            })

            .state('group.member-detail', {
                url: '/members/:uid',
                views: {
                    'group-members': {
                        templateUrl: 'templates/member-detail.html',
                        controller: 'MemberDetailCtrl'
                    }
                }
            })

            .state('group.manage-member', {
                url: '/members/:uid/manage',
                params: { current_role: 4, my_role: 4, groupTitle:  '', forceRefresh: 0},
                views: {
                    'group-manage': {
                        templateUrl: 'templates/group-manage-member.html',
                        controller: 'manageMemberCtrl'
                    }
                }
            })

            .state('group.members-add', {
                url: '/members/add',
                params: {  current_role: 4, my_role: 4, groupTitle:  ''},
                views: {
                    'group-manage': {
                        templateUrl: 'templates/group-members-add.html',
                        controller: 'manageMemberCtrl'
                    }
                }
            })

            .state('group.expenses', {
                url: '/expenses',
                views: {
                    'group-expenses': {
                        templateUrl: 'templates/group-expenses.html',
                        controller: 'ExpenseCtrl'
                    }
                }
            })

            .state('group.expense-detail', {
                url: '/expenses/:eid',
                views: {
                    'group-expenses': {
                        templateUrl: 'templates/expense-detail.html',
                        controller: 'ExpenseDetailCtrl'
                    }
                }
            })

            .state('group.expense-edit', {
                url: '/expenses/:eid/edit',
                views: {
                    'group-expenses': {
                        templateUrl: 'templates/expense-edit.html',
                        controller: 'ExpenseDetailCtrl'
                    }
                }
            })

            .state('group.expense-new', {
                url: '/new-expense',
                views: {
                    'group-new-expense': {
                        templateUrl: 'templates/expense-new.html',
                        controller: 'ExpenseDetailCtrl'
                    }
                }
            })

            .state('group.events', {
                url: '/events',
                views: {
                    'group-events': {
                        templateUrl: 'templates/group-events.html',
                        controller: 'EventCtrl'
                    }
                }
            })

            .state('group.event-detail', {
                url: '/events/:evid',
                views: {
                    'group-events': {
                        templateUrl: 'templates/event-detail.html',
                        controller: 'EventDetailCtrl'
                    }
                }
            })

            .state('group.settings', {
                url: '/settings',
                cache: false,
                views: {
                    'group-settings': {
                        templateUrl: 'templates/group-settings.html',

                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('group.settings-currency', {
                url: '/settings/currency',
                views: {
                    'group-settings': {
                        templateUrl: 'templates/group-settings-currency.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('group.settings-categories', {
                url: '/settings/categories',
                views: {
                    'group-settings': {
                        templateUrl: 'templates/group-settings-categories.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('group.settings-name', {
                url: '/settings/name',
                views: {
                    'group-settings': {
                        templateUrl: 'templates/group-settings-name.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('group.settle', {
                url: '/settle',
                views: {
                    'group-settle': {
                        templateUrl: 'templates/group-settle.html',
                        controller: 'SettleBalanceCtrl'
                    }
                }
            })

            .state('group.manage', {
                url: '/manage',
                params: {forceRefresh: 0},
                views: {
                    'group-manage': {
                        templateUrl: 'templates/group-manage.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('group.achievements', {
                url: '/achievements',
                views: {
                    'group-achievements': {
                        templateUrl: 'templates/group-achievements.html',
                        controller: 'AchievementCtrl'
                    }
                }
            })

        ;

        // if none of the above states are matched, use this as the fallback
        /*
         We are using the below urlRouterProvider.otherwise() because of:
         https://github.com/angular-ui/ui-router/issues/600
         */
        $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get('$state');
            $state.go('public.login');
        });
    })

    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.views.transition('none');
        $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back').previousTitleText(false);
    })

    .config(['$provide', function ($provide) {
        $provide.decorator('$locale', ['$delegate', function ($delegate) {
            if ($delegate.id == 'en-us') {
                $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
                $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
            }
            return $delegate;
        }]);
    }])

    .config([
        "$httpProvider", function ($httpProvider) {
            $httpProvider.interceptors.push('authHttpRequestInterceptor');
        }])

    //.config([
    //    "$httpProvider", function($httpProvider, $rootScope) {
    //        $httpProvider.interceptors.push(function ($q) {
    //            return {
    //                responseError: function (rejection) {
    //                    if (rejection.status <= 0) {
    //                        //window.location = "noresponse.html";
    //                        console.log("CONNECTION ERROR");
    //                        return;
    //                    }
    //                    return $q.reject(rejection);
    //                }
    //            };
    //        })
    //}])

    // .config should come before .run
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    // http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html
    .run(function ($rootScope, $state, $ionicHistory, $localStorage) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;

            if (requireLogin && (typeof $localStorage.authenticated === 'undefined' || $localStorage.authenticated == false)) {
                event.preventDefault();
                $localStorage.authenticated = false;
                // $rootScope.authenticated = false;
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache().then(function () {
                    $state.go('public.login')
                });
            }
        });

    })

    .directive('nxEqualEx', function() {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, model) {
                if (!attrs.nxEqualEx) {
                    console.error('nxEqualEx expects a model as an argument!');
                    return;
                }
                scope.$watch(attrs.nxEqualEx, function (value) {
                    // Only compare values if the second ctrl has a value.
                    if (model.$viewValue !== undefined && model.$viewValue !== '') {
                        model.$setValidity('nxEqualEx', value === model.$viewValue);
                    }
                });
                model.$parsers.push(function (value) {
                    // Mute the nxEqual error if the second ctrl is empty.
                    if (value === undefined || value === '') {
                        model.$setValidity('nxEqualEx', true);
                        return value;
                    }
                    var isValid = value === scope.$eval(attrs.nxEqualEx);
                    model.$setValidity('nxEqualEx', isValid);
                    return isValid ? value : undefined;
                });
            }
        };
    });


// angular.module('GoingDutchApp.directives', [])
//     .directive('pwCheck', [function () {
//         return {
//             require: 'ngModel',
//             link: function (scope, elem, attrs, ctrl) {
//                 var firstPassword = '#' + attrs.pwCheck;
//                 elem.add(firstPassword).on('keyup', function () {
//                     scope.$apply(function () {
//                          console.info(elem.val() === $(firstPassword).val());
//                         ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
//                     });
//                 });
//             }
//         }
//     }]);

// var compareTo = function() {
//     return {
//         require: "ngModel",
//         scope: {
//             otherModelValue: "=compareTo"
//         },
//         link: function(scope, element, attributes, ngModel) {
//
//             ngModel.$validators.compareTo = function(modelValue) {
//                 console.log (modelValue + " == " +  scope.otherModelValue);
//                 return modelValue == scope.otherModelValue;
//             };
//
//             scope.$watch("otherModelValue", function() {
//                 ngModel.$validate();
//             });
//         }
//     };
// };
//
// angular.module('GoingDutchApp.directives', [])
//     .directive("compareTo", compareTo);

// angular.module('GoingDutchApp.directives', []).directive('nxEqualEx', function() {
//     return {
//         require: 'ngModel',
//         link: function (scope, elem, attrs, model) {
//             if (!attrs.nxEqualEx) {
//                 console.error('nxEqualEx expects a model as an argument!');
//                 return;
//             }
//             scope.$watch(attrs.nxEqualEx, function (value) {
//                 // Only compare values if the second ctrl has a value.
//                 if (model.$viewValue !== undefined && model.$viewValue !== '') {
//                     model.$setValidity('nxEqualEx', value === model.$viewValue);
//                 }
//             });
//             model.$parsers.push(function (value) {
//                 // Mute the nxEqual error if the second ctrl is empty.
//                 if (value === undefined || value === '') {
//                     model.$setValidity('nxEqualEx', true);
//                     return value;
//                 }
//                 var isValid = value === scope.$eval(attrs.nxEqualEx);
//                 model.$setValidity('nxEqualEx', isValid);
//                 return isValid ? value : undefined;
//             });
//         }
//     };
// });


/*


 angular.module('GoingDutchApp').config(function ($ionicConfigProvider) {
 $ionicConfigProvider.views.transition('none');
 $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back').previousTitleText(false);
 });

 angular.module('GoingDutchApp').config(['$provide', function ($provide) {
 $provide.decorator('$locale', ['$delegate', function ($delegate) {
 if ($delegate.id == 'en-us') {
 $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
 $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
 }
 return $delegate;
 }]);
 }]);

 //http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is
 //angular.module('GoingDutchApp').config(function ($httpProvider) {
 //    delete $httpProvider.defaults.headers.common['X-Requested-With'];
 //    $httpProvider.defaults.useXDomain = true;
 //});

 // http://stackoverflow.com/questions/31608486/adding-header-to-angular-resource-requests
 angular.module("GoingDutchApp").config([
 "$httpProvider", function ($httpProvider) {
 $httpProvider.interceptors.push('authHttpRequestInterceptor');
 }]);
 */