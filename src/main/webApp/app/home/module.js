"use strict";


angular.module('app.home', ['ui.router', 'datatables', 'datatables.bootstrap', 'datatables.buttons', 'certificate.admin'])
    .config(function ($stateProvider) {

        $stateProvider
            .state('app.home', {
                url: '/home',
                data: {
                    title: 'Certificate Search',
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/home/views/home.html',
                        controller: 'HomeController as vm'
                    }
                },
                resolve: {
                    scripts: function (lazyScript) {
                        return lazyScript.register([
                              'build/vendor.datatables.js'
                        ]);

                    },
                }
            });
    });
