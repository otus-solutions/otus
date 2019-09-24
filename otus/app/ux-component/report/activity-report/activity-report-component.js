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
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.report.business.ParticipantReportWidgetFactory',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(ParticipantActivityService, ParticipantReportWidgetFactory, LoadingScreenService){
    var self = this;

    self.reloadActivityReport = reloadActivityReport;
    self.generateActivityReport = generateActivityReport;


    // function reloadActivityReport() {
    //   let selectedActivityID = ParticipantActivityService.getSelectedActivities().list()[0].getID();
    //
    //   self.activityReportReady = false;
    //   //TODO: estamos buscando um relatório de exame para simular a replicação do mecanismo, modificar metodo para buscar relatório pelo ID da atividade
    //   ParticipantReportWidgetFactory.getParticipantReportList(self.selectedParticipant)
    //     .then(function (reports) {
    //       self.report = reports[0];
    //       self.report.getReportTemplate();
    //       self.activityReportReady = true;
    //     })
    //     .catch(function () {
    //       self.activityReportReady = true;
    //     });
    // }

    function reloadActivityReport() {
      let selectedActivityID = ParticipantActivityService.getSelectedActivities().list()[0].getID();

      self.activityReportReady = false;
      //TODO: estamos buscando um relatório de exame para simular a replicação do mecanismo, modificar metodo para buscar relatório pelo ID da atividade
      ParticipantReportWidgetFactory.getActivityReport(self.selectedParticipant, selectedActivityID)
        .then(function (report) {
          self.report = report;
          self.report.getReportTemplate();
          self.activityReportReady = true;
        })
        .catch(function () {
          self.activityReportReady = true;
        });
    }





    function generateActivityReport(report) {
      console.log(report)
      console.log(report.compiledTemplate);
      LoadingScreenService.changeMessage(report.getLoadingMessage());
      LoadingScreenService.start();
      report.generateReport(LoadingScreenService.finish);
      // self.activityReportReady = false;
    }
  }

}());