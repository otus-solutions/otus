(function() {
  'use strict';

  angular
    .module('otusjs.application.session', [
      'otusjs.application.session.core'
    ])
    .run(Runner);

  Runner.$inject = [
    '$injector',
    'otusjs.application.session.core.EventService',
    'otusjs.application.session.core.ContextService'
  ];

  function Runner($injector, EventService, Context) {
    EventService.onLogin(Context.begin);
    EventService.onLogout(Context.end);
    var currentModule = angular.module('otusjs.application.session');
    var application = $injector.get('otusjs.application.core.ModuleService');
    application.notifyModuleLoad(currentModule.name);
    console.info('Session module ready.');
  }

}());
