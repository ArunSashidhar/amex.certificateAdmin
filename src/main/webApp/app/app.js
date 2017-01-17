'use strict';

angular.module('app', [
    //'ngSanitize',
    'ngAnimate',
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'ngIdle',

    // Smartadmin Angular Common Module
    'SmartAdmin',
    'summernote',

    // App
    'app.auth',
    'app.layout',
    'app.home'
])
    .config(function ($provide, $httpProvider) {

        // Intercept http calls.
        $provide.factory('ErrorHttpInterceptor', function ($q) {
            // Intercept http calls.
            $provide.factory('ErrorHttpInterceptor', function ($q) {
                var errorCounter = 0;
                return {
                    // On request failure
                    requestError: function (rejection) {
                        return $q.reject(rejection);
                    },
                    // On response failure
                    responseError: function (rejection) {
                        return $q.reject(rejection);
                    }
                };
            });

            // Add the interceptor to the $httpProvider.
            $httpProvider.interceptors.push('ErrorHttpInterceptor');
            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        })
    })

    .constant('APP_CONFIG', window.appConfig)

    .run(function ($rootScope, $state, $stateParams, Idle) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // editableOptions.theme = 'bs3';

    });
