(function() {
  'use strict';

  angular
    .module('otusjs.user.access', [
      'otusjs.user.access.core',
      'otusjs.user.access.service'
    ])
    .run(Runner);

  Runner.$inject = [
    'otusjs.user.access.core.EventService',
    'otusjs.user.access.core.ContextService'
  ];

  function Runner(EventService, Context) {
    EventService.onLogin(Context.end);
    EventService.onLogout(Context.begin);
  }
}());
