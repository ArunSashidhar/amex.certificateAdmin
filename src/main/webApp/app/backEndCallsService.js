(function () {
    'use strict';

    angular
        .module('certificate.admin')
        .service('backEndCallsService', backEndCallsService);

    backEndCallsService.$inject = ['$http'];

    /* @ngInject */
    function backEndCallsService($http) {
        var vm = this;


    }
})();
