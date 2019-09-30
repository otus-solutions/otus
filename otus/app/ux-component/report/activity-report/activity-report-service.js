(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.ActivityReportService', Service);

  Service.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.report.business.ParticipantReportWidgetFactory',
    'otusjs.deploy.LoadingScreenService',
    '$mdDialog'
  ];

  function Service(ParticipantActivityService, ParticipantReportWidgetFactory, LoadingScreenService, $mdDialog) {
    let self = this;

    self.loadActivityReport = loadActivityReport;
    self.generateActivityReport = generateActivityReport;
    self.infoPendingReportAlert = infoPendingReportAlert;

    function loadActivityReport(selectedParticipant) {
      let selectedActivityID = ParticipantActivityService.getSelectedActivities().list()[0].getID();
      self.reportResult = {};

      return ParticipantReportWidgetFactory.getActivityReport(selectedParticipant, selectedActivityID)
        .then(report => {
          return self.reportResult = {
            activityID: selectedActivityID,
            activityReportReady: true,
            activityReportInfo: false,
            report: report
          }
        })
    }

    function generateActivityReport(report) {
      self.report = report;
      LoadingScreenService.changeMessage(self.report.getLoadingMessage());
      LoadingScreenService.start();
      report.generateReport(LoadingScreenService.finish);
      self.report = {};
    }

    function infoPendingReportAlert(report) {
      self.report = report;

      $mdDialog.show({
        controller: _DialogController,
        templateUrl: 'app/ux-component/report/activity-report/activity-report-dialog-template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      })
    }

    function _DialogController($scope, $mdDialog) {
      $scope.report = self.report;
      console.log(self.report)

      $scope.generateReport = function () {
        generateActivityReport($scope.report);
        _cleanReport();
        $mdDialog.cancel();
      };

      $scope.cancel = function () {
        _cleanReport();
        $mdDialog.cancel();
      };

      function _cleanReport() {
        self.report = {};
        $scope.report = {};
      }
    }
  }
}());