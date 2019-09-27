(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('monitoringSpreadsheetComponent', {
      controller: "monitoringSpreadsheetCtrl as $ctrl",
      templateUrl: 'app/ux-component/otus-monitoring/spreadsheet/monitoring-spreadsheet-template.html',
      bindings: {
        selectedLots: '=',
        csvData: '=',
        createQuestionnaireSpreadsheet: '=',
        centers: '='
      }
    });


}());
