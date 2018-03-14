(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusReportDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/report/dashboard/report-dashboard-template.html'
    });

  Controller.$inject = [
    "otusjs.application.state.ApplicationStateService",
    "otusjs.laboratory.core.project.ContextService",
    "otusjs.otus.dashboard.core.EventService",
    "otusjs.otus.dashboard.service.DashboardService",
    "otusjs.otus.uxComponent.ParticipantReportWidgetFactory",
    "otusjs.deploy.LoadingScreenService"
  ];

  function Controller(ApplicationStateService, ProjectContextService, EventService, DashboardService, ParticipantReportWidgetFactory, LoadingScreenService) {
    var self = this;

    /* Public methods */
    self.getFullReport = getFullReport;
    self.reloadReport = reloadReport;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.$onDestroy = onDestroy;

    /* Lifecycle methods */
    function onInit() {
      self.ready = false;
      _loadParticipantReports();
      EventService.onParticipantSelected(_loadParticipantReports);
      self.selectedParticipant = null;
    }

    function onDestroy() {
      EventService.unsubscribeOnParticipantSelected(_loadParticipantReports);
    }

    /* Public methods */
    function getFullReport(report) {
      if (report.isAvailable === null) {
        report.getReportTemplate();
      }
    }

    function reloadReport(report) {
      report.getReportTemplate();
    }

    //todo: remove
    self.spy = function (teste) {
      console.log(teste);
    };

    function _loadParticipantReports(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
        _fetchReports();
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function (participantData) {
            self.selectedParticipant = participantData;
            self.isEmpty = false;
            _fetchReports();
          });
      }
    }

    function _fetchReports() {
      console.log('fetch');
      ParticipantReportWidgetFactory.getParticipantReportList()
        .then(function (reports) {
          // self.reports = reports;
          //todo: remove
          self.reports = reports.map(function (report) {
            report.name = self.selectedParticipant.name;
            return report;
          });
          self.ready = true;
        })
        .catch(function () {
          self.ready = true;
        })
      ;
    }
  }
}());
