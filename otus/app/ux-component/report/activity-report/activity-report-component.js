(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityReport', {
      controller: 'activityReportCtrl as $ctrl',
      templateUrl: 'app/ux-component/report/activity-report/activity-report-template.html',
      bindings: {
        selectedParticipant: '<',
        showVisualizationButton: '<'
      }
    }).controller('activityReportCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.ActivityReportService'
  ];

  function Controller(ActivityReportService) {
    const self = this;
    self.reloadActivityReport = reloadActivityReport;
    self.generateActivityReport = generateActivityReport;
    self.pendingActivityReport = pendingActivityReport;
    self.missingDataSources = [];

    function reloadActivityReport() {
      let reportResult = ActivityReportService.reloadActivityReport(self.selectedParticipant);
      reportResult
        .then(value => {
          value.report.getReportTemplate().then(() => {
            value.report.missingDataSources.length ? _missingActivityReportArtifacts(value) : _enableActivityReportArtifacts(value)
          })
        })
    }

    function _enableActivityReportArtifacts(reportResultValues) {
      self.activityReportReady = reportResultValues.activityReportReady;
      self.activityReportInfo = reportResultValues.activityReportInfo;
      self.report = reportResultValues.report
    }

    function _missingActivityReportArtifacts(reportResultValues) {
      self.activityReportReady = false;
      self.activityReportInfo = true;
      self.missingDataSources = reportResultValues.report.missingDataSources;
      self.report = reportResultValues.report
    }

    function generateActivityReport(report) {
      ActivityReportService.generateActivityReport(report);
      self.activityReportReady = false;
    }

    function pendingActivityReport() {
      //ActivityReportService.infoPendingReportAlert(self.missingDataSources);
      ActivityReportService.infoPendingReportAlert(self.report);
      self.activityReportInfo = false
    }
  }
}());