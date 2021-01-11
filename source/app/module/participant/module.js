(function() {
  'use strict';

  angular
    .module('otusjs.participant', [
      'otusjs.participant.core',
      'otusjs.participant.business',
      'otusjs.participant.repository',
      'otusjs.participant.storage',
      'otusjs.model.participant'
    ])
    .run(Runner);

  Runner.$inject = [
    'otusjs.participant.core.ContextService',
    'otusjs.participant.core.EventService'
  ];

  function Runner(Context, EventService) {
    EventService.onLogout(Context.end);
  }

}());
