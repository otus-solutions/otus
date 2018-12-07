(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.core')
    .service('otusjs.monitoring.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.monitoring.core.ContextService',
    'otusjs.monitoring.core.EventService'
  ];

  function Service($q, ContextService, EventService) {
    var _genericMonitoringStorageDefer = $q.defer();
    var _laboratoryMonitoringStorageDefer = $q.defer();
    var _remoteStorage = {};
    var self = this;

    self.Event = EventService;

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureRemoteStorage = configureRemoteStorage;
    self.getMonitoringRemoteStorage = getMonitoringRemoteStorage;
    self.configureLaboratoryMonitoringRemoteStorage = configureLaboratoryMonitoringRemoteStorage;
    self.getLaboratoryMonitoringRemoteStorage = getLaboratoryMonitoringRemoteStorage;

    function configureContext(context) {
      ContextService.configureContext(context);
    };

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    };

    function configureRemoteStorage(restService) {
      _remoteStorage.genericMonitoring = restService;
      _genericMonitoringStorageDefer.resolve(_remoteStorage.genericMonitoring);
    };

    function getMonitoringRemoteStorage() {
      if (_remoteStorage.genericMonitoring) {
        _genericMonitoringStorageDefer = $q.defer();
        _genericMonitoringStorageDefer.resolve(_remoteStorage.genericMonitoring);
      }
      return {
        whenReady: function () {
          return _remoteStorageDefer.promise;
        }
      };
    };

    function configureLaboratoryMonitoringRemoteStorage(restService) {
      _remoteStorage.laboratoryMonitoring = restService;
      _laboratoryMonitoringStorageDefer.resolve(_remoteStorage.laboratoryMonitoring);
    };

    function getLaboratoryMonitoringRemoteStorage() {
      if (_remoteStorage.laboratoryMonitoring) {
        _laboratoryMonitoringStorageDefer = $q.defer();
        _laboratoryMonitoringStorageDefer.resolve(_remoteStorage.laboratoryMonitoring);
      }
      return {
        whenReady: function () {
          return _remoteStorageDefer.promise;
        }
      };
    };
  }
}());
