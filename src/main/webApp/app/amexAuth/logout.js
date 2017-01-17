(function () {
    'use strict';

    angular
        .module('certificate.admin')
        .directive('logout',logout);

    logout.$inject = ['principal'];

    /* @ngInject */
    function logout(principal) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs, controller) {
            element.bind('click', function () {
                principal.logout()
            });
        }
    }

    Controller.$inject = [];

    /* @ngInject */
    function Controller() {

    }
})();
