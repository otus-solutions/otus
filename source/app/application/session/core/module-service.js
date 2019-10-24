(function() {
  'use strict';

  angular
    .module('otusjs.application.session.core')
    .service('otusjs.application.session.core.ModuleService', Service);

  Service.$inject = [
    'otusjs.application.session.core.ContextService',
    'otusjs.application.session.core.EventService'
  ];

  function Service(ContextService, EventService) {
    var self = this;

    self.Event = EventService;

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.hasContextActive = hasContextActive;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function hasContextActive() {
      return ContextService.hasContextActive();
    }
  }
}());
