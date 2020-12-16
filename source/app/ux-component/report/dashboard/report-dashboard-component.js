(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusReportDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/report/dashboard/report-dashboard-template.html'
    });

  Controller.$inject = [
    "otusjs.otus.dashboard.core.EventService",
    "otusjs.otus.dashboard.service.DashboardService",
    "otusjs.report.business.ParticipantReportWidgetFactory",
    "otusjs.deploy.LoadingScreenService",
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService'
  ];

  function Controller(
    EventService,
    DashboardService,
    ParticipantReportWidgetFactory,
    LoadingScreenService,
    ParticipantLaboratoryService) {

    var self = this;

    self.ready;
    self.reports;
    self.isEmpty;
    self.selectedParticipant;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.$onDestroy = onDestroy;

    /* Public Methods*/
    self.generateReport = generateReport;


    /* Lifecycle methods */
    function onInit() {
      self.ready = false;
      _loadParticipantReports();
      EventService.onParticipantSelected(_loadParticipantReports);
      self.selectedParticipant = null;

      ParticipantLaboratoryService.getCheckingExist()
        .then(function (response) {
          self.laboratoryChecking = response;
        });
    }

    function onDestroy() {
      EventService.unsubscribeOnParticipantSelected(_loadParticipantReports);
    }

    function generateReport(report) {
      LoadingScreenService.changeMessage(report.getLoadingMessage());
      LoadingScreenService.start();
      report.generateReport(LoadingScreenService.finish);
    }

    function _loadParticipantReports(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
        _fetchReports();
      } else {
        DashboardService.getSelectedParticipant()
          .then(function (participantData) {
            self.selectedParticipant = participantData;
            self.isEmpty = false;
            _fetchReports();
          });
      }
    }

    function _fetchReports() {
      self.ready = false;
      ParticipantReportWidgetFactory.getParticipantReportList(self.selectedParticipant)
        .then(function (reports) {
          self.reports = reports;
          self.ready = true;
        })
        .catch(function () {
          self.ready = true;
        });
    }

  }
}());
