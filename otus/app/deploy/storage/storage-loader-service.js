(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.StorageLoaderService', Service);

  Service.$inject = [
    '$q',
    '$injector',
    'otusjs.application.storage.SessionStorageService',
    'otusjs.application.storage.LocalStorageService',
    'otusjs.application.storage.IndexedDbStorageService',
    'OtusLocalStorage'
  ];

  function Service($q, $injector, SessionStorageService, LocalStorageService, IndexedDbStorageService, OtusLocalStorage) {
    var self = this;

    /* Public methods */
    self.initializeSessionStorage = initializeSessionStorage;
    self.createLocalStorage = createLocalStorage;
    self.createIndexedStorage = createIndexedStorage;
    self.loadLocalStorage = loadLocalStorage;
    self.loadIndexedStorage = loadIndexedStorage;
    self.dbExists = dbExists;

    function initializeSessionStorage() {
      SessionStorageService.initialize();
    }

    function createLocalStorage(dbName) {
      var deferred = $q.defer();

      LocalStorageService
        .newDb(dbName, _instantiateStorages(OtusLocalStorage))
        .then(function() {
          deferred.resolve();
        });

      return deferred.promise;
    }

    function loadLocalStorage(dbName) {
      var deferred = $q.defer();

      LocalStorageService
        .loadDb(dbName, _instantiateStorages(OtusLocalStorage))
        .then(function() {
          deferred.resolve();
        });

      return deferred.promise;
    }

    function createIndexedStorage(dbName) {
      var deferred = $q.defer();

      IndexedDbStorageService
        .newDb(dbName, _instantiateStorages(OtusLocalStorage))
        .then(function() {
          deferred.resolve();
        });

      return deferred.promise;
    }

    function loadIndexedStorage(dbName) {
      var deferred = $q.defer();

      IndexedDbStorageService
        .loadDb(dbName, _instantiateStorages(OtusLocalStorage))
        .then(function() {
          deferred.resolve();
        });

      return deferred.promise;
    }

    function dbExists(dbName) {
      return IndexedDbStorageService.dbExists(dbName);
    }

    function _instantiateStorages(storages) {
      return storages.map(function(storage) {
        return $injector.get(storage);
      });
    }
  }
}());
