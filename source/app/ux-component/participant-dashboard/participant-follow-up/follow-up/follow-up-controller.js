(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusFollowUpCtrl', Controller);

  Controller.$inject = [
    'otusjs.participant.business.ParticipantFollowUpService'
  ];

}());
function Controller(ParticipantFollowUpService) {
  var self = this;
  self.isCanceled = false;

  self.$onInit = onInit;
  self.deactivateFollowUp = deactivateFollowUp;

  function onInit() {
    _verifyStatus();
  }

  function _verifyStatus() {
    self.isCanceled = self.followUpData.participantEvents.length > 0 &&  self.followUpData.participantEvents[0].status === "CANCELED";
  }

  function deactivateFollowUp() {
    ParticipantFollowUpService.deactivateFollowUpEvent(self.followUpData.participantEvents[0]._id).then((result)=>{
      self.isCanceled = true;
      self.followUpData.status = "CANCELED";
    })
  }
}
