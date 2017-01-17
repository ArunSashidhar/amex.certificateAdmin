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
        expect(controller.breadcrumbsLevels.length).toBe(2);
        expect(_.isEqual(controller.breadcrumbsLevels, ['Home', 'Search'])).toEqual(true);
    });

});