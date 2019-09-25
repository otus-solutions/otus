(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityReport', {
      controller: 'activityReportCtrl as $ctrl',
      templateUrl: 'app/ux-component/report/activity-report/activity-report-template.html',
      bindings:{
        selectedParticipant : '<',
        showVisualizationButton: '<'
      }
    }).controller('activityReportCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.ActivityReportService'
  ];

  function Controller(ActivityReportService){
    var self = this;

    self.reloadActivityReport = reloadActivityReport;
    self.generateActivityReport = generateActivityReport;
    self.pendingActivityReport = pendingActivityReport;


    function reloadActivityReport() {
      let reportResult = ActivityReportService.reloadActivityReport(self.selectedParticipant);
      reportResult.then(value => {
        self.report = value.report;
        self.activityReportReady = value.activityReportReady;
        self.activityReportInfo = value.activityReportInfo;
      });
    }

    function generateActivityReport(report) {
      ActivityReportService.generateActivityReport(report);
    }

    function pendingActivityReport() {
      ActivityReportService.infoPendingReportAlert();
    }
  }

}());