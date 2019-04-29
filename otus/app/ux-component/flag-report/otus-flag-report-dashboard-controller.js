(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller("otusFlagReportDashboardCtrl", Controller);

  Controller.$inject = [
    '$scope',
    '$compile',
    '$element'
  ];


  function Controller($scope, $compile, $element) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.buildLaboratoryFlagReport = buildLaboratoryFlagReport;

    /* Public methods */
    function onInit() { }

    function buildLaboratoryFlagReport() {
      // TODO:
    }
  }

}());