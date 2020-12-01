(function () {
  'use strict';

  angular
    .module('otusjs.stage.core')
    .service('otusjs.stage.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.stage.core.ContextService'
  ];

  function Service($q, ContextService) {
    const self = this;
    let _genericStorageDefer = $q.defer();
    let _remoteStorage = {};

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureRemoteStorage = configureRemoteStorage;
    self.getRemoteStorage = getRemoteStorage;


    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function configureRemoteStorage(restService) {
      _remoteStorage.genericStage = restService;
      _genericStorageDefer.resolve(_remoteStorage.genericStage);
    }

    function getRemoteStorage() {
      if(_remoteStorage.genericStage){
        _genericStorageDefer = $q.defer();
        _genericStorageDefer.resolve(_remoteStorage.genericStage);
      }
      return {
        whenReady() {
          return _genericStorageDefer.promise;
        }
      }
    }

  }

}());