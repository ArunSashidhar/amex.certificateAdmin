"use strict";

angular
    .module('app')
    .directive('recentProjects', function ($state, $rootScope, adminDataService, backEndCallsService, RecentProjectsService) {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "app/dashboard/projects/recent-projects.tpl.html",
            scope: true,
            link: function (scope, element) {

                scope.projects = RecentProjectsService.get();

                scope.clearProjects = function () {
                    RecentProjectsService.clear();
                };

                scope.goToStudent = function (student) {
                    backEndCallsService.getfindbyRCN(student.studentId,1,1).then(function (data) { // backend call lo get data by rcn, pageNumber and pageLength
                        $rootScope.$broadcast('residency.studentOpened', {
                            residencyUser: data.data.content[0].residencyUser
                        });
                    });
                };

                scope.goToApp = function (app) {
                    backEndCallsService.getAppById(app.appId).then(function (data) {
                        $rootScope.$broadcast('residency.appOpened', {
                            requestId: app.appId
                        });
                    });
                };

                scope.deleteStudent = function (event, student) {
                    RecentProjectsService.deleteStudent(event, student);
                };

                scope.deleteApp = function (event, student, app) {
                    RecentProjectsService.deleteApp(event, student, app);
                };

            }
        };
    }).service('RecentProjectsService', function ($rootScope, $filter, adminDataService, backEndCallsService) {

    var vm = this;

    var notifications;

    $rootScope.$on('residency.loggedOut', function () {
        clearNotifications();
    });

    $rootScope.$on('residency.studentOpened', function (evt, params) {
        addStudent(params.residencyUser.rcn);
    });

    $rootScope.$on('residency.appOpened', function (evt, params) {
        addApp(params.requestId);
    });

    var addApp = function (appId) {
        backEndCallsService.getAppById(appId).then(function (data) {
            vm.app = data.data;
            var studentID = data.data.residencyUser.rcn;
            for (var i = 0; i < notifications.length; i++) {
                if (notifications[i].studentId === studentID) {
                    for (var j = 0; j < notifications[i].apps.length; j++) {
                        if (notifications[i].apps[j].appId === appId) {
                            return addStudent(studentID);
                        }
                    }
                    notifications[i].apps.push({
                        appId: appId,
                        appName: vm.app.recordType
                    });
                    return setNotifications(notifications);
                }
            }
            addStudent(studentID);
            addApp(appId);
        });

    };
    var addStudent = function (studentId) {
        var i, index = -1;
        for (i = 0; i < notifications.length; i++) {
            if (notifications[i].studentId === studentId) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            notifications.unshift(notifications.splice(index, 1)[0]);
            setNotifications(notifications);
        } else {
            backEndCallsService.getLatestProfileByRCN(studentId).then(function (data) {
                vm.data = data.data;
                if (index >= 0) {
                    index = i;
                }
                notifications.unshift({
                    studentId: studentId,
                    studentName: ($filter('nameFilter')(vm.data.name)),
                    apps: []
                });
                setNotifications(notifications);
            });
        }
    };
    var clearNotifications = function () {
            if (!notifications) {
                notifications = getNotifications();
            } else {
                notifications.length = 0;
            }
            setNotifications(notifications);
        },
        deleteStudent = function (event, student) {
            var i;
            event.stopImmediatePropagation();
            for (i = 0; i < notifications.length; i++) {
                if (angular.equals(notifications[i], student)) {
                    notifications.splice(i, 1);
                    setNotifications(notifications);
                    break;
                }
            }

        },
        deleteApp = function (event, student, app) {
            var i, j;
            event.stopImmediatePropagation();
            for (i = 0; i < notifications.length; i++) {
                if (angular.equals(notifications[i], student)) {
                    for (j = 0; j < notifications[i].apps.length; j++) {
                        if (angular.equals(notifications[i].apps[j], app)) {
                            notifications[i].apps.splice(j, 1);
                            setNotifications(notifications);
                            break;
                        }
                    }
                }
            }

        },
        getNotifications = function () {
            if (!notifications) {
                var rp = sessionStorage.getItem('ra.recentProjects');
                if (rp) {
                    try {
                        notifications = JSON.parse(rp);
                    } catch (e) {
                        notifications = [];
                    }
                } else {
                    notifications = [];
                }
            }
            return notifications;
        },
        setNotifications = function () {
            sessionStorage.setItem('ra.recentProjects', JSON.stringify(notifications));
        };

    return {
        get: getNotifications,
        clear: clearNotifications,
        deleteStudent: deleteStudent,
        deleteApp: deleteApp
    };

});
