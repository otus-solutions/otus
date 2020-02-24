(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantInfo', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-info/participant-info-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService'
  ];

  function Controller(ApplicationStateService, EventService, DashboardService) {
    var self = this;

    self.participantBirthdate;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.getCurrentState = getCurrentState;

    self.getSex = getSex;

    function getSex(sex){
      if(sex){
        return sex == 'F' || sex == 'f' ? 'Feminino' : 'Masculino';
      }
    }


    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    /* Lifecycle methods */
    function onInit() {
         _loadSelectedParticipant();
        EventService.onParticipantSelected(_loadSelectedParticipant);
        self.selectedParticipant = null;
     }

    function getCurrentState() {
      return ApplicationStateService.getCurrentState();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.participantBirthdate = self.selectedParticipant.birthdate ? new Date(self.selectedParticipant.birthdate.value) : '';
        self.isEmpty = false;
      } else {
        DashboardService
        .getSelectedParticipant()
        .then(function(participantData) {
            self.selectedParticipant = participantData;
            self.participantBirthdate = self.selectedParticipant.birthdate ? new Date(self.selectedParticipant.birthdate.value) : '';
            self.isEmpty = false;
          });
      }
    }

    self.updateParticipant = function () {
      ApplicationStateService.activateUpdateParticipant();
    }
  }
}());
