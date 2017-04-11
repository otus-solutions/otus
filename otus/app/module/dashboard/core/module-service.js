(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard.core')
    .service('otusjs.otus.dashboard.core.ModuleService', Service);

  Service.$inject = [
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.otus.dashboard.core.EventService'
  ];

  function Service(ContextService, EventService) {
    var self = this;

    self.Event = EventService;

    /* Public methods */
    self.recover = recover;

    function recover() {
      ContextService.restore();
    }
  }
}());
