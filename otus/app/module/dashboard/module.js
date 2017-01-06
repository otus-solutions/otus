(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard', [
      'otusjs.otus.dashboard.core',
      'otusjs.otus.dashboard.service'
    ])
    .run(Runner);

  Runner.$inject = [
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.core.ContextService'
  ];

  function Runner(EventService, ContextService) {
    EventService.onLogin(ContextService.begin);
    EventService.onLogin(ContextService.setLoggedUser);
    EventService.onLogout(ContextService.end);
    EventService.onParticipantSelected(ContextService.setSelectedParticipant);
  }

}());
