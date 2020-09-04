(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantDashboard', {
      controller: 'participantDashboardCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-dashboard/participant-dashboard-template.html'
    }).controller('participantDashboardCtrl', Controller);

  Controller.$inject = [
    'STATE',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService'
  ];

  function Controller(STATE, ApplicationStateService, EventService, DashboardService) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.getCurrentState = getCurrentState;
    self.getSelectedState = getSelectedState;
    self.STATE = STATE;

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    /* Lifecycle methods */
    function onInit() {
      self.find = window.innerWidth > 450;

      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      self.selectedParticipant = null;
    }

    function getCurrentState() {
      return ApplicationStateService.getCurrentState();
    }

    function getSelectedState() {
      return self.getCurrentState() == self.STATE.PARTICIPANT_DASHBOARD || self.getCurrentState() == self.STATE.PARTICIPANT_UPDATE;
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function(participantData) {
            self.selectedParticipant = participantData;
            self.isEmpty = false;
          });
      }
    }
  }
}());
