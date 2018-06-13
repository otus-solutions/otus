(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('monitoringSpreadsheetComponent', {
      controller: Controller,
      templateUrl: 'app/ux-component/otus-monitoring/spreadsheet/monitoring-spreadsheet-template.html',
      bindings: {
        selectedLots: '=',
        csvData: '=',
        createQuestionnaireSpreadsheet: '=',
        centers: '='
      }
    });

  Controller.$inject = [
    'otusjs.deploy.FieldCenterRestService',
    '$filter',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory'
  ];

  function Controller(ProjectFieldCenterService, $filter, DynamicTableSettingsFactory) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.createSpreadsheet = createSpreadsheet;

    /* public functions */

    function onInit() {
      self.datasets = [];
      self.dates = [];
      self.fieldCenters = [];
      self.isShown = false;
      self.centers = $filter('orderBy')(self.centers);
      self.createQuestionnaireSpreadsheet = createSpreadsheet;
    }

    function createSpreadsheet(qData) {
      self.datasets = qData.data;
      self.dates = qData.dates;
      self.fieldCenters = qData.fieldCenters;
    }

  }
}());
