(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantFollowUpCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.participant.business.ParticipantFollowUpService',
    'otusjs.model.outcome.FollowUpFactory',
  ];

  function Controller(EventService, DashboardService, ParticipantFollowupService, FollowUpFactory) {
    var self = this;

    self.$onInit = onInit;
    self.followUps = [];
    self.isInitialized = false;
    self.activateFollowUps = activateFollowUps;
    self.selectedParticipant = null;


    function onInit() {
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        _loadFollowUpData(self.selectedParticipant);
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function(participantData) {
            self.selectedParticipant = participantData;
            _loadFollowUpData(self.selectedParticipant);
          });
      }
    }

    function _loadFollowUpData(participant) {

      ParticipantFollowupService.getFollowUps(participant.recruitmentNumber).then(function(result) {
        self.followUps = FollowUpFactory.fromArray(result);
        self.followUps.map(function(followUp) {
          followUp.isActivated = followUp.participantEvents.length > 0 && followUp.participantEvents[0].status === "PENDING";
          return followUp;
        });
        if(self.followUps.length > 0 && self.followUps[0].participantEvents.length > 0) {
          self.isInitialized = true;
        }
      }).catch(function(error){
        self.hasError = true;
        if (error.status === 404){
          self.errorMessage = "Não existem segmentos configurados no sistema";
        } else {
          self.errorMessage = "Ocorreu um erro, entre em contato com o administrador do sistema";
        }
      });
    }

    function activateFollowUps() {
      ParticipantFollowupService.activateFollowUpEvent(self.selectedParticipant.recruitmentNumber, self.followUps[0]).then(function(result) {
        self.followUps[0].participantEvents.push(result);
        _loadFollowUpData(self.selectedParticipant);
      }).catch(function(error){
        self.followUps = [];
      });
    }
  }
}());
