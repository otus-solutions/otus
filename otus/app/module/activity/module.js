(function() {
  'use strict';

  angular
    .module('otusjs.activity', [
      'otusjs.activity.core',
      'otusjs.activity.business',
      'otusjs.activity.repository',
      'otusjs.activity.storage'
    ])
    .run(Runner);

  Runner.$inject = [
    'otusjs.activity.core.ContextService',
    'otusjs.activity.core.EventService'
  ];

  function Runner(ContextService, EventService) {
    EventService.onLogin(ContextService.setLoggedUser);
    EventService.onLogout(ContextService.end);
    EventService.onParticipantSelected(ContextService.setSelectedParticipant);
    EventService.onParticipantSelected(ContextService.begin);
  }

}());
