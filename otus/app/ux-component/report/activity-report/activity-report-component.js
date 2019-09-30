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
    'otusjs.otus.uxComponent.ActivityReportService',
    '$scope'
  ];

  function Controller(ActivityReportService, $scope) {
    const self = this;
    self.loadActivityReport = loadActivityReport;
    self.generateActivityReport = generateActivityReport;
    self.pendingActivityReport = pendingActivityReport;

    function loadActivityReport() {
      let reportResult = ActivityReportService.loadActivityReport(self.selectedParticipant);
      reportResult
        .then(value => {
          value.report.missingDataSources.length ? _missingActivityReportArtifacts(value) : _enableActivityReportArtifacts(value)
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
      self.report = reportResultValues.report
    }

    function generateActivityReport(report) {
      ActivityReportService.generateActivityReport(report);
      self.activityReportReady = false;
    }

    function pendingActivityReport() {
      ActivityReportService.infoPendingReportAlert(self.report);
      self.activityReportInfo = false
    }

    $scope.$on("swapRow", () => _activitySwapEvent());

    function _activitySwapEvent(){
      self.activityReportReady = false;
      self.activityReportInfo =  false;
    }
  }
}());