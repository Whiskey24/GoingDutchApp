angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

//    .controller('GroupsCtrl', function ($scope) {
//    })

//    .controller('NewExpenseCtrl', function ($scope) {
//    })

    .controller('NewGroupCtrl', function ($scope) {
    })

//    .controller('MembersCtrl', function ($scope) {
//    })
//    .controller('ExpensesCtrl', function ($scope) {
//   })
//    .controller('EventsCtrl', function ($scope) {
//    })

    .controller('SettingsCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });


/* Groups json
 {"1":{"name":"group 1","description":"group 1 description","created":1266364800,"members":["person A","Person B","Person C"],"balance":"-1250.35","currency":"&euro;"},"2":{"name":"group 2","description":"group 2 description","created":1166344800,"members":["person D","Person B","Person E"],"balance":"3520.99","currency":"&euro;"},"3":{"name":"group 3","description":"group 3 description","created":1146344800,"members":["person A","Person F","Person E"],"balance":"50.05","currency":"&euro;"}}
 */