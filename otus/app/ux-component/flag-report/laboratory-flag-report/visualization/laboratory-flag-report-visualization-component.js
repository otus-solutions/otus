(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLaboratoryFlagReportVisualizationComponent', {
      controller: 'otusLaboratoryFlagReportVisualizationComponentCtrl as $ctrl',
      templateUrl: 'app/ux-component/flag-report/laboratory-flag-report/visualization/laboratory-flag-report-visualization-template.html',
      bindings: {
        examsData: "=",
        onUpdate: "=",
        colorsRange: "<",
        legendRange: "<"
      }
    });
}());
