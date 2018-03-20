(function() {
  'use strict';

  angular
    .module('otusjs.report.core')
    .service('otusjs.report.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.report.core.ContextService',
    'otusjs.report.core.EventService'
  ];

  function Service($q, ContextService, EventService) {
    var self = this;
    var _remoteStorage;
    var _remoteStorageDefer = $q.defer();

    self.Event = EventService;

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureRemoteStorage = configureRemoteStorage;
    self.getParticipantReportRemoteStorage = getParticipantReportRemoteStorage;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function configureRemoteStorage(restService) {
      _remoteStorage = restService;
      _remoteStorageDefer.resolve(_remoteStorage);
    }

    function getParticipantReportRemoteStorage(){
        if (_remoteStorage) {
          _remoteStorageDefer = $q.defer();
          _remoteStorageDefer.resolve(_remoteStorage);
        }
        return {
          whenReady: function() {
            return _remoteStorageDefer.promise;
          }
        };
    }
  }
}());
