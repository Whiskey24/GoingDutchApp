angular.module('GoingDutchApp', ['ionic'])

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

        $stateProvider

            // setup an abstract state for home tabs
            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'templates/home.html'
            })

            // setup an abstract state for groups tabs
            .state('group', {
                url: '/group/:gid',
                abstract: true,
                cache: false,
                templateUrl: 'templates/group.html'
            })

            .state('home.newgroup', {
                url: '/newgroup',
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
                views: {
                    'home-account': {
                        templateUrl: 'templates/home-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('group.newexpense', {
                url: '/newexpense',
                views: {
                    'group-new-expense': {
                        templateUrl: 'templates/group-newexpense.html',
                        controller: 'NewExpenseCtrl'
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

            .state('group.events', {
                url: '/events',
                views: {
                    'group-events': {
                        templateUrl: 'templates/group-events.html',
                        controller: 'EventCtrl'
                    }
                }
            })

            .state('group.settings', {
                url: '/settings',
                views: {
                    'group-settings': {
                        templateUrl: 'templates/group-settings.html',
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
        $urlRouterProvider.otherwise('/home/groups');

    });


angular.module('GoingDutchApp').config(function ($ionicConfigProvider) {
    $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back').previousTitleText(false);
});