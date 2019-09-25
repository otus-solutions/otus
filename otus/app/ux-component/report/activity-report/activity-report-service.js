(function() {
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
      let reportResult = {};

      //TODO: estamos buscando um relatório de exame para simular a replicação do mecanismo, modificar metodo para buscar relatório pelo ID da atividade

      //simulação de erro (usa o catch): state de informação de pendência
      //return ParticipantReportWidgetFactory.getActivityReport(0, selectedActivityID)

      //simulação do caminho válido, que encontra o report e prepara para renderização
      return ParticipantReportWidgetFactory.getActivityReport(selectedParticipant, selectedActivityID)
        .then(function (report) {
          reportResult = {
            activityID: selectedActivityID,
            activityReportReady: true,
            activityReportInfo: false,
            report: report
          };
          reportResult.report.getReportTemplate();
          return reportResult;
        })
        .catch(function () {
          return reportResult = {
            activityID: selectedActivityID,
            activityReportReady: false,
            activityReportInfo: true
          };
        });
    }

    function generateActivityReport(report) {
      //console.log(report)
      //console.log(report.compiledTemplate);
      LoadingScreenService.changeMessage(report.getLoadingMessage());
      LoadingScreenService.start();
      report.generateReport(LoadingScreenService.finish);
      self.activityReportReady = false;
    }

    function infoPendingReportAlert() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Relatório Incompleto: Pendências Detectadas')
          .textContent('Para visualizar/imprimir o relatório será necessário validar os itens abaixo.')
          .ariaLabel('Alert: Relatório incompleto')
          .ok('Voltar')
      );
    }
  }
}());