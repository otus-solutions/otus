(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantsManagerDashboardCtrl', Controller);

  Controller.$inject = [
    'STATE',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.participant.storage.ParticipantStorageService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory'
  ];

  function Controller(STATE, ParticipantManagerService, ApplicationStateService, EventService, DashboardService, ParticipantStorageService, DynamicTableSettingsFactory) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.getCurrentState = getCurrentState;
    self.STATE = STATE;


    /* Lifecycle methods */
    function onInit() {
      ParticipantManagerService.getAllowNewParticipants()
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        })
    }

    self.addParticipant = function () {
      ApplicationStateService.activateCreateParticipant();

    }


    function selectParticipant(participant) {
      delete participant["birthday"];
      ParticipantManagerService.selectParticipant(participant);
      ApplicationStateService.activateParticipantDashboard();
    }


    self.showButtonAdd = function () {
      if (getCurrentState() === "participants-list"){
        return true;
      } else {
        return false;
      }

    }




    function getCurrentState() {
      return ApplicationStateService.getCurrentState();
    }


  }
}());
