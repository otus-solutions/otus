(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('dynamicReport', {
      templateUrl: 'app/ux-component/dynamic-report/dynamic-report-template.html',
      controller: Controller,
      bindings: {
        labelData: '<'
      }
    });

  Controller.$inject = [
    '$scope',
    '$rootScope',
    '$compile',
    '$element',
    'otusjs.labelMaker.labelBuilder.LabelService'
  ];

  function Controller($scope, $rootScope, $compile, $element, LabelService) {
    var self = this;
    var LABEL_PAGE = '<dynamic-report-page/>';

    self.generateReportPage = generateReportPage;

    $scope.$on("Data_Ready", function (event) {
      self.ready = true;
    });

    $scope.$on("Data_Error", function (event) {
      self.dataError = true;
    });

    function generateReportPage() {
      var scope = $rootScope.$new();
      scope.labelData = self.labelData;
      scope.labelData = self.labelData;
      scope.labelData = self.labelData;
      var labelPage = $compile(LABEL_PAGE)(scope);
    }

  }
}());
