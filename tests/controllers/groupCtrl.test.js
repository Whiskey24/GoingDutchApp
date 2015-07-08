/**
 * Created by Whiskey on 5-7-2015.
 */

describe('Home - Groups View', function(){
    var GroupCtrl, scope;

    // load the controller's module
    beforeEach(module('GoingDutchApp','GoingDutchApp.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        GroupCtrl = $controller('GroupCtrl', {$scope: scope});
    }));

    // tests start here
    it('should list the group 1 at the top/first', function(){
        expect(scope.groups[0].gid).toBe(1);
    });

    it('should move group 1 to the last/4th position', function(){
        scope.moveGroup(scope.groups[0],0,3);
        expect(scope.groups[3].gid).toBe(1);
    });

});