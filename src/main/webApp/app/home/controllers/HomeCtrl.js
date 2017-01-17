'use strict';

angular.module('app.home').controller('HomeController', function (DTOptionsBuilder, DTColumnBuilder, $compile, $state, adminDataService) {
      var vm = this;
      vm.breadcrumbsLevels=["Home"];
      vm.breadcrumbsLevels.push("Search")
      
});
