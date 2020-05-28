(function () {
  'use strict';

  angular
    .module('otusjs.project.communication.core')
    .service('otusjs.project.communication.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.project.communication.core.ContextService',
  ];

  function Service($q, ContextService) {
    const self = this;
    let _genericProjectCommunicationStorageDefer = $q.defer();
    let _remoteStorage = {};

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureRemoteStorage = configureRemoteStorage;
    self.getProjectCommunicationRemoteStorage = getProjectCommunicationRemoteStorage;

    function configureContext(context) {
      ContextService.configureContext(context);
    };

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    };

    function configureRemoteStorage(restService) {
      _remoteStorage.genericProjectCommunication = restService;
      _genericProjectCommunicationStorageDefer.resolve(_remoteStorage.genericProjectCommunication);
    };

    function getProjectCommunicationRemoteStorage() {
      if(_remoteStorage.genericProjectCommunication){
        _genericProjectCommunicationStorageDefer = $q.defer();
        _genericProjectCommunicationStorageDefer.resolve(_remoteStorage.genericProjectCommunication);
      }
      return {
        whenReady() {
          return _genericProjectCommunicationStorageDefer.promise;
        }
      }

    }

  }

}());