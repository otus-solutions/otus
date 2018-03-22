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
    "otusjs.report.business.ParticipantReportWidgetFactory"
  ];

  function Controller(EventService, DashboardService, ParticipantReportWidgetFactory) {
    var self = this;

    self.collapsed = false;

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
      report.reloadTemplate();
    }

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
      ParticipantReportWidgetFactory.getParticipantReportList(self.selectedParticipant)
        .then(function (reports) {
          self.reports = reports;
          self.ready = true;
        })
        .catch(function () {
          self.ready = true;
        })
      ;
    }
  }
}());
