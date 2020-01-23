(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusFollowUpCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.participant.business.ParticipantFollowupService'
  ];

  function Controller(EventService, DashboardService, ParticipantFollowupService) {
    var self = this;

    self.$onInit = onInit;
    self.isActivated = false;

    function onInit() {
      self.isActivated = self.followUpData.participantEvents.length <= 0;
    }
  }
}());
