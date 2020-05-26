(function () {
  'use strict';

  angular
    .module('otusjs.project.contact.core')
    .service('otusjs.project.contact.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.project.contact.core.ContextService',
  ];

  function Service($q, ContextService) {
    const self = this;
    let _genericProjectContactStorageDefer = $q.defer();
    let _remoteStorage = {};

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureRemoteStorage = configureRemoteStorage;
    self.getProjectConactRemoteStorage = getProjectContactRemoteStorage;

    function configureContext(context) {
      ContextService.configureContext(context);
    };

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    };

    function configureRemoteStorage(restService) {
      _remoteStorage.genericProjectContact = restService;
      _genericProjectContactStorageDefer.resolve(_remoteStorage.genericProjectContact);
    };

    function getProjectContactRemoteStorage() {
      if(_remoteStorage.genericProjectContact){
        _genericProjectContactStorageDefer = $q.defer();
        _genericProjectContactStorageDefer.resolve(_remoteStorage.genericProjectContact);
      }
      return {
        whenReady() {
          return _genericProjectContactStorageDefer.promise;
        }
      }

    }

  }

}());