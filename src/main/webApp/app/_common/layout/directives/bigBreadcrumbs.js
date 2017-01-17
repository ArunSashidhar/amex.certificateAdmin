'use strict';

angular
    .module('SmartAdmin.Layout')
    .directive('bigBreadcrumbs', function () {
        return {
            restrict: 'EA',
            replace: true,
            template: '<div><h1 class="page-title txt-color-blueDark"></h1></div>',
            scope: {
                items: '=',
                dynamicItems: '=',
                icon: '@'
            },
            link: function (scope, element, attributes, controller) {

                //scope.items = scope.items || [];

                function renderItems(dynamicItems) {
                    var first,
                        head = element.find('h1'),
                        icon = scope.icon || 'home',
                        allItems = scope.items || [''];

                    allItems = scope.dynamicItems ? allItems.concat(scope.dynamicItems) : allItems;

                    first = (allItems[1]) || '';
                    allItems.shift(0, 1);

                    head.empty();
                    head.append('<i class="fa-fw fa fa-' + icon + '"></i>' + first);

                    if (allItems.length) {
                        _.rest(allItems).forEach(function (item) {
                            head.append("       ");
                            head.append('<span>' + " > " + item + '</span>');
                        });
                    }
                }

                // set watch for dynamic items
                scope.dynamicItems && scope.$watch(function () {
                    return scope.dynamicItems;
                }, renderItems(scope.dynamicItems), true);

                // initialize
                renderItems(scope.dynamicItems);

                scope.$on('residency.breadcrumbs', function (event, breadcrumbs) {
                    var first,
                        head = element.find('h1'),
                        icon = scope.icon || 'home',
                        allItems = breadcrumbs;

                    //                    allItems = scope.dynamicItems ? allItems.concat(scope.dynamicItems) : allItems;
                    //
                    first = (allItems[0]);
                    //                    allItems.shift(0, 1);

                    head.empty();
                    head.append('<i class="fa-fw fa fa-' + icon + '"></i>' + first);
                    _.rest(breadcrumbs).forEach(function (item) {
                        head.append("       ");
                        head.append('<span>' + " > " + item + '</span>');
                    });
                });

            }
        };
    }).service('bigBreadcrumbsService', function ($filter, $rootScope) {

        var addBreadcrumbs = function (data, page) {
            var breadcrumbsLevels = [];
            if (data) {
                var name = data && data.profile && data.profile.name;
                var RCN = data && data.residencyUser && data.residencyUser.rcn;
                var requestID = data && data.requestId;
                if (name) {
                    name = ($filter('nameFilter')(name));
                    breadcrumbsLevels = [name];
                    breadcrumbsLevels.push("RCN: " + RCN);
                    breadcrumbsLevels.push("RequestID: " + requestID);
                    breadcrumbsLevels.push(page);
                }
                return breadcrumbsLevels;
            }
            return breadcrumbsLevels;
        };
        var addBreadcrumbsProfile = function (data, rcn, page) {
            var breadcrumbsLevels = [];
            if (data) {
                var name = data && data.name;
                if (name) {
                    name = ($filter('nameFilter')(name));
                    breadcrumbsLevels = [name];
                    breadcrumbsLevels.push("RCN: " + rcn);
                    breadcrumbsLevels.push(page);
                }
            }

            $rootScope.$broadcast('residency.breadcrumbs', breadcrumbsLevels);
            return breadcrumbsLevels;
        };
        return {
            add: addBreadcrumbs,
            addToProfile: addBreadcrumbsProfile
        };


    });
