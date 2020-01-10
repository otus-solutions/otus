(function () {
  'use strict';

  angular
    .module('otusjs.pendency.core')
    .service('otusjs.pendency.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.pendency.core.ContextService',
  ];

  function Service($q, ContextService) {
    const self = this;
    let _genericPendencyStorageDefer = $q.defer();
    let _remoteStorage = {};

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureRemoteStorage = configureRemoteStorage;
    self.getUserActivityPendencyRemoteStorage = getUserActivityPendencyRemoteStorage;

    function configureContext(context) {
      ContextService.configureContext(context);
    };

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    };

    function configureRemoteStorage(restService) {
      _remoteStorage.genericPendency = restService;
      _genericPendencyStorageDefer.resolve(_remoteStorage.genericPendency);
    };

    function getUserActivityPendencyRemoteStorage() {
      if(_remoteStorage.genericPendency){
        _genericPendencyStorageDefer = $q.defer();
        _genericPendencyStorageDefer.resolve(_remoteStorage.genericPendency);
      }
      return {
        whenReady() {
          return _genericPendencyStorageDefer.promise;
        }
      }

    }

  }

}());