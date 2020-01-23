(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantFollowUpCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.participant.business.ParticipantFollowupService'
  ];

  function Controller(EventService, DashboardService, ParticipantFollowupService) {
    var self = this;

    self.$onInit = onInit;
    self.followUps = [];


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
      ParticipantFollowupService.getFollowups(participant.recruitmentNumber).then(function(result) {
        self.followUps = result;
      });
    }
  }
}());
