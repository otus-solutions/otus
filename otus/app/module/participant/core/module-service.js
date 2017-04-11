(function() {
  'use strict';

  angular
    .module('otusjs.participant.core')
    .service('otusjs.participant.core.ModuleService', Service);

  Service.$inject = [
    'otusjs.participant.core.ContextService',
    'otusjs.participant.core.EventService'
  ];

  function Service(ContextService, EventService) {
    var self = this;

    self.DataSource = {};
    self.Event = EventService;

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureParticipantDataSourceService = configureParticipantDataSourceService;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function configureParticipantDataSourceService(dataSource) {
      self.DataSource.Participant = dataSource;
    }
  }
}());
