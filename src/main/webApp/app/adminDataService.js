(function () {
    'use strict';

    angular
        .module('certificate.admin')
        .service('adminDataService', adminDataService);

    adminDataService.$inject = ['$state', '$rootScope'];

    /* @ngInject */
    function adminDataService($state, $rootScope) {
        var vm = this;

    }


})();
