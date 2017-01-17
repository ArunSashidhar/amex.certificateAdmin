describe('TestHomeController', function () {

    var controller = null;
    $scope = null;

    beforeEach(function () {
        module('app.home');
    });

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        controller = $controller('HomeController', {
            $scope: $scope
        });
    }));

    it('initially has two breadcrumb level', function () {
        assert.equal(controller.breadcrumbsLevels.length, 2);
        assert.deepEqual(controller.breadcrumbsLevels, ['Home', 'Search']);
    });

});