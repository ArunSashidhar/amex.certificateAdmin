"use strict";

angular.module('app.auth').controller('LoginCtrl', function ($rootScope, $location, $scope, $state, $http) {
  var vm = this;

  function activate() {}

  var authenticate = function (credentials, callback) {

    var headers = credentials ? {
      authorization: "Basic " + btoa(credentials.username + ":" + credentials.password)
    } : {};

    $http.get('user', {
      headers: headers
    }).then(function (response) {
      if (response.data.name) {
        $rootScope.authenticated = true;
      } else {
        $rootScope.authenticated = false;
      }
      callback && callback();
    }, function () {
      $rootScope.authenticated = false;
      callback && callback();
    });
  };

  authenticate();
  vm.credentials = {};
  vm.login = function () {
    authenticate(vm.credentials, function () {
      if ($rootScope.authenticated) {
        $state.go("app.home");
        vm.error = false;
      } else {
        $state.go("realLogin");
        vm.error = true;
      }
    });
  };

  activate();
});
