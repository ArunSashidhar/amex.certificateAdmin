"use strict";

angular.module('app.auth', ['ui.router', 'certificate.admin'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('realLogin', {
                url: '/real-login',
                views: {
                    root: {
                        templateUrl: "app/auth/login/login.html",
                        controller: 'LoginCtrl as vm'
                    }
                },
                data: {
                    title: 'Login'
                }
            })

    });
