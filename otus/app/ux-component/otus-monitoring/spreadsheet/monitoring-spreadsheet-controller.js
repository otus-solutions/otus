(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('monitoringSpreadsheetCtrl', Controller);

  Controller.$inject = [
    '$filter'
  ];

  function Controller($filter) {
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
