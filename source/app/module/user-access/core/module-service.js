(function() {
  'use strict';

  angular
    .module('otusjs.user.access.core')
    .service('otusjs.user.access.core.ModuleService', Service);

  Service.$inject = [
    'otusjs.user.access.core.ContextService',
    'otusjs.user.access.core.EventService'
  ];

  function Service(ContextService, EventService) {
    var self = this;

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.ignore = ignore;
    self.onLogin = onLogin;
    self.onLogout = onLogout;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function ignore() {
      ContextService.ignore();
    }

    function onLogin(callback) {
      EventService.onLogin(callback);
    }

    function onLogout(callback) {
      EventService.onLogout(callback);
    }
  }
}());
