(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantsManagerDashboardCtrl', Controller);

  Controller.$inject = [
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.participant.storage.ParticipantStorageService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory'
  ];

  function Controller(ParticipantManagerService, ApplicationStateService, EventService, DashboardService, ParticipantStorageService, DynamicTableSettingsFactory) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.getCurrentState = getCurrentState;
    self.allowNewParticipants = false;

    /* Lifecycle methods */
    function onInit() {
      ParticipantManagerService.getAllowNewParticipants()
        .then(function(response) {
          if(response.objectType === "ProjectConfiguration"){
            self.allowNewParticipants = angular.copy(response.participantRegistration);
          }
        })
        .catch(function(error) {
          throw new Error(error);
        });
    }

    self.addParticipant = function() {
      ApplicationStateService.activateCreateParticipant();

    }


    function selectParticipant(participant) {
      delete participant["birthday"];
      ParticipantManagerService.selectParticipant(participant);
      ApplicationStateService.activateParticipantDashboard();
    }


    self.showButtonAdd = function() {
      if (getCurrentState() === "participants-list") {
        if (self.allowNewParticipants) {
          return true;
        }
      }
      return false;

    }




    function getCurrentState() {
      return ApplicationStateService.getCurrentState();
    }


  }
}());
