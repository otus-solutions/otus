(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusReportDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/report/dashboard/report-dashboard-template.html'
    });

  Controller.$inject = [
    'STATE',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.otus.uxComponent.ParticipantReportWidgetFactory'
  ];

  function Controller(STATE, ApplicationStateService, ProjectContextService, EventService, DashboardService, ParticipantReportWidgetFactory) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.getCurrentState = getCurrentState;
    self.STATE = STATE;

    /* Lifecycle methods */
    function onInit() {
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      self.selectedParticipant = null;
    }



    function _fetchReports(){
      ParticipantReportWidgetFactory.getParticipantReportList()
        .then(reports=>{
          self.reports = reports;
          self.ready = true;
          console.log(reports);
        });
    }


    // participant selector
    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    function getCurrentState() {
      return ApplicationStateService.getCurrentState();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
        _fetchReports();
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function(participantData) {
            self.selectedParticipant = participantData;
            self.isEmpty = false;
            _fetchReports();
          });
      }
    }
  }
}());
