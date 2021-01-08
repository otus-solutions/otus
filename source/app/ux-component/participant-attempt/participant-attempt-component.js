(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantAttempt', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-attempt/participant-attempt-template.html',
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.participant.business.ParticipantLabelFactory'
  ];

  function Controller(ApplicationStateService,
                      EventService,
                      DashboardService,
                      ParticipantLabelFactory) {
    var self = this;
    /*variables*/
    self.selectedAddress = {};
    self.value = {
      address: "Rua Dona Cristina"
    };
    self.statusValue = {
      name: "AUSENTE"
    };
    self.now = new Date();
    self.attemptDate = new Date();

    /*Methods*/
    self.$onInit = onInit;

    function onInit() {
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      self.selectedParticipant = null;
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.participantBirthdate = self.selectedParticipant.birthdate ? new Date(self.selectedParticipant.birthdate.value) : '';
        self.isEmpty = false;
        self.participantLabel = ParticipantLabelFactory.create(self.selectedParticipant)
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function(participantData) {
            self.selectedParticipant = participantData;
            self.participantBirthdate = self.selectedParticipant.birthdate ? new Date(self.selectedParticipant.birthdate.value) : '';
            self.isEmpty = false;
            self.participantLabel = ParticipantLabelFactory.create(self.selectedParticipant)
          });
      }
    }

    function save() {

    }
  }
}());
