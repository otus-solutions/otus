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
    var self = this;

    self.reloadActivityReport = reloadActivityReport;
    self.generateActivityReport = generateActivityReport;
    self.infoPendingReportAlert = infoPendingReportAlert;

    function reloadActivityReport(selectedParticipant) {
      let selectedActivityID = ParticipantActivityService.getSelectedActivities().list()[0].getID();
      self.reportResult = {};
      //TODO: estamos buscando um relatório de exame para simular a replicação do mecanismo, modificar metodo para buscar relatório pelo ID da atividade
      //simulação de erro (usa o catch): state de informação de pendência
      //return ParticipantReportWidgetFactory.getActivityReport(0, selectedActivityID)
      //simulação do caminho válido, que encontra o report e prepara para renderização
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
      LoadingScreenService.changeMessage(report.getLoadingMessage());
      LoadingScreenService.start();
      report.generateReport(LoadingScreenService.finish);
    }

    function infoPendingReportAlert(report) {
      self.report = report;
      console.log(self.report);

      $mdDialog.show({
        controller: _DialogController,
        templateUrl: 'app/ux-component/report/activity-report/activity-report-dialog-template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      })
    }

    function _DialogController($scope, $mdDialog) {
      $scope.report = self.report;

      $scope.generateReport = function() {
        generateActivityReport($scope.report);
        $mdDialog.cancel();
        $scope.report ={};
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };
    }


    // function infoPendingReportAlert(missingDataSources) {
    //   self.missingDataSources = missingDataSources;
    //
    //   $mdDialog.show({
    //     controller: _DialogController,
    //     templateUrl: 'app/ux-component/report/activity-report/activity-report-dialog-template.html',
    //     parent: angular.element(document.body),
    //     clickOutsideToClose: true
    //   })
    // }

    // function _DialogController($scope, $mdDialog) {
    //   $scope.missingDataSources = self.missingDataSources;
    //
    //   $scope.generateReport = function() {
    //     generateActivityReport(self.reportResult.report);
    //     $mdDialog.cancel();
    //     self.reportResult ={};
    //
    //   };
    //
    //   $scope.cancel = function () {
    //     $mdDialog.cancel();
    //   };
    // }
  }
}());