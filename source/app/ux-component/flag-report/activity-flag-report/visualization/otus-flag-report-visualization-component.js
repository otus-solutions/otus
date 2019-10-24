(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFlagReportVisualization', {
      controller: "otusFlagReportVisualizationCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/activity-flag-report/visualization/otus-flag-report-visualization-template.html',
      bindings: {
        activitiesData: "=",
        onUpdate: "=",
        colorsRange: "<",
        legendRange: "<"
      }
    });
}());
