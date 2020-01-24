(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusFollowUpEventCtrl', Controller);

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
    self.eventData;
  }
}
