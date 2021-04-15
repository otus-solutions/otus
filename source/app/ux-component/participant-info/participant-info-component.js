(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantInfo', {
      controller: 'otusParticipantInfoCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-info/participant-info-template.html',
      bindings: {
        hasLaboratory: '=',
        participantLaboratory: '='
      }
    })
    .controller('otusParticipantInfoCtrl', Controller);

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.participant.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService'
  ];

  function Controller(ApplicationStateService,
    EventService,
    ParticipantEventService,
    DashboardService) {
    var self = this;

    self.participantBirthdate;

    self.attacheLabTitle = 'Vincular laboratório ao participante'
    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.getCurrentState = getCurrentState;
    self.updateParticipant = updateParticipant;

    self.getSex = getSex;

    function getSex(sex) {
      if (sex) {
        return sex == 'F' || sex == 'f' ? 'Feminino' : 'Masculino';
      }
    }

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    /* Lifecycle methods */
    function onInit() {
      self.selectedParticipant = null;
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
    }

    function getCurrentState() {
      return ApplicationStateService.getCurrentState();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.participantBirthdate = self.selectedParticipant.birthdate ? new Date(self.selectedParticipant.birthdate.value) : '';
        self.isEmpty = false;
        ParticipantEventService.fireParticipantLoaded(participantData);
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function (participantData) {
            self.selectedParticipant = participantData;
            ParticipantEventService.fireParticipantLoaded(participantData);
            self.participantBirthdate = self.selectedParticipant.birthdate ? new Date(self.selectedParticipant.birthdate.value) : '';
            self.isEmpty = false;
          });
      }
    }

    function updateParticipant() {
      ApplicationStateService.activateUpdateParticipant();
    }
  }
}());
