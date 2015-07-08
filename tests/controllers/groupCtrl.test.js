/**
 * Created by Whiskey on 5-7-2015.
 */

describe('GroupController', function(){
    var GroupCtrl, scope;

    // load the controller's module
    beforeEach(module('GoingDutchApp','GoingDutchApp.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        GroupCtrl = $controller('GroupCtrl', {$scope: scope});
    }));

    // tests start here
    it('should have enabled friends to be true', function(){
        expect(scope.test).toEqual(true);
    });
});

/*
// Load the controller's module
beforeEach(module('doobiedoo'));

var TodoCtrl, scope;

// Initialise the controller and a mock scope
beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodoCtrl = $controller('TodoCtrl', {
        $scope: scope
    });
}));

it('should add tasks to the list', function() {
    scope.task = { title: 'Task 1' };
    scope.addTask(scope.task);
    expect(scope.tasks.length).toBe(1);
});
    */