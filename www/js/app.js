// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('GoingDutchApp', ['ionic', 'starter.controllers', 'starter.services'])

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

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // setup an abstract state for the groups directive
            .state('group', {
                url: "/group",
                abstract: true,
                templateUrl: "templates/group.html"
            })

            /*
             .state('groupmenu', {
             url: "/groupmenu",
             abstract: true,
             templateUrl: "templates/group-menu.html"
             })


             .state('groupmenu.settings', {
             url: "/settings",
             views: {
             'menuContent' :{
             templateUrl: "templates/menu-settings.html"
             }
             }
             })
             */

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.groups', {
                url: '/groups',
                views: {
                    'tab-groups': {
                        templateUrl: 'templates/tab-groups.html',
                        controller: 'GroupsCtrl'
                    }
                }
            })


            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('group.members', {
                url: '/members',
                views: {
                    'group-members': {
                        templateUrl: 'templates/group-members.html',
                        controller: 'MembersCtrl'
                    }
                }
            })

            .state('group.expenses', {
                url: '/expenses',
                views: {
                    'group-expenses': {
                        templateUrl: 'templates/group-expenses.html',
                        controller: 'ExpensesCtrl'
                    }
                }
            })

            .state('group.events', {
                url: '/events',
                views: {
                    'group-events': {
                        templateUrl: 'templates/group-events.html',
                        controller: 'EventsCtrl'
                    }
                }
            })

            .state('group.settings', {
                url: "/settings",
                views: {
                    'group-settings': {
                        templateUrl: "templates/group-settings.html",
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('group.settle', {
                url: "/settle",
                views: {
                    'group-settle': {
                        templateUrl: "templates/group-settle.html"
                    }
                }
            })

            .state('group.achievements', {
                url: "/achievements",
                views: {
                    'group-achievements': {
                        templateUrl: "templates/group-achievements.html"
                    }
                }
            })


        ;


        /*
         .state('tab.chats', {
         url: '/chats',
         views: {
         'tab-chats': {
         templateUrl: 'templates/tab-chats.html',
         controller: 'ChatsCtrl'
         }
         }
         })
         .state('tab.chat-detail', {
         url: '/chats/:chatId',
         views: {
         'tab-chats': {
         templateUrl: 'templates/chat-detail.html',
         controller: 'ChatDetailCtrl'
         }
         }
         })
         */

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    });
