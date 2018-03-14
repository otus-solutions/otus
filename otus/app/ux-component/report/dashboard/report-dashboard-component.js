(function() {
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
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.getCurrentState = getCurrentState;

    self.getFullReport = getFullReport;
    self.reloadReport = reloadReport;

    /* Lifecycle methods */
    function onInit() {
      self.ready = false;
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      self.selectedParticipant = null;
    }

    function getFullReport(report) {
      console.log(report);
      if (report.isAvailable === null) {
        report.getReportTemplate();
      }

    }

    function reloadReport(report) {
      report.getReportTemplate();
    }

    function _fetchReports() {
      LoadingScreenService.start();
      ParticipantReportWidgetFactory.getParticipantReportList()
      .then(function(reports) {
        console.log(reports);
        self.reports = reports;
        self.ready = true;
        LoadingScreenService.finish();
      })
      .catch(function(e) {
        console.log(e);
        self.ready = true;
        });
    }

    // participant selector
    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    function getCurrentState() {
      return ApplicationStateService.getCurrentState();
    }

    self.spy = function(teste) {
      console.log(teste);
    };

    function _loadSelectedParticipant(participantData) {
      var currentState = getCurrentState();

      if (currentState !== "participant-dashboard") {
        return;
      }
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
        _fetchReports();
      } else {
        DashboardService.getSelectedParticipant().then(function(
          participantData
        ) {
          self.selectedParticipant = participantData;
          self.isEmpty = false;
          _fetchReports();
        });
      }
    }
  }
}());
