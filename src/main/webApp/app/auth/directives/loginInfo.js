"use strict";

angular.module('app.auth').directive('loginInfo', function (User) {

    return {
        restrict: 'A',
        templateUrl: 'app/auth/directives/login-info.tpl.html',
        link: function (scope, element) {
            User.update();
            scope.user = User;
        }
    };
});
