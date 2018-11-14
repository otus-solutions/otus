(function () {
  'use strict';

  angular
    .module('otusjs.participant.core')
    .service('otusjs.participant.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.participant.core.ContextService',
    'otusjs.participant.core.EventService'
  ];

  function Service($q, ContextService, EventService) {
    var self = this;
    var _remoteStorage;
    var _remoteStorageDefer = $q.defer();

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
