describe('TestHomeController', function () {

    var pageTitle = element(by.css('.page-title'));

    beforeEach(function() {
        browser.get('http://localhost:8082/#/home');
    });

    it('initially has two breadcrumb levels', function () {
        expect(pageTitle.getText()).toBe('Home > Search');
    });


});