(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activityAutoFillEventCtrl', Controller);

  Controller.$inject = [
    '$compile',
    '$scope',
    'otusjs.participant.business.ParticipantFollowUpService'
  ];

  function Controller($compile, $scope, ParticipantFollowUpService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      self.eventData = self.parent.eventData;
      self.parent.activateEvent = activateEvent;
    }

    function activateEvent() {
      ParticipantFollowUpService.activateFollowUpEvent(self.parent.selectedParticipant.recruitmentNumber, self.eventData).then(function(result) {
        self.eventData.participantEvents.push(result);
      });
    }
  }
}());