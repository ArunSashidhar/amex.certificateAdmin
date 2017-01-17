"use strict";


angular.module('app.layout', ['ui.router', 'certificate.admin'])

.config(function ($stateProvider, $urlRouterProvider, ROLES) {


    $stateProvider
        .state('app', {
            abstract: true,
            resolve: {
                authorize: ['authorization',
                  function (authorization) {
                        return authorization.authorize();
                  }
                 ]
            },
            views: {
                root: {
                    templateUrl: 'app/layout/layout.tpl.html'
                }
            },
            data: {
                roles: [ROLES.user, ROLES.manager]
            }
        });
    $urlRouterProvider.otherwise('/home');

});
