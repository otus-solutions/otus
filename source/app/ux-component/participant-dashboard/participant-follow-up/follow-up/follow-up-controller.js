(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusFollowUpCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.participant.business.ParticipantFollowUpService'
  ];

}());
function Controller(EventService, DashboardService, ParticipantFollowupService) {
  var self = this;

  self.$onInit = onInit;

  function onInit() {
    _verifyStatus();
  }


  function _verifyStatus() {
    self.isActivated = self.followUpData.participantEvents.length > 0;
    if(self.isActivated || self.isFirstFollowUp) {
      self.colorLeft = '#299288';
      self.colorRight = '#24baaa';
    } else {
      self.colorLeft = '#565456';
      self.colorRight = '#bfbfc7';
    }
  }
}
