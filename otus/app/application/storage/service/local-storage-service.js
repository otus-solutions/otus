(function() {
  'use strict';

  angular
    .module('otusjs.application.storage')
    .service('otusjs.application.storage.LocalStorageService', Service);

  Service.$inject = [
    '$q',
    '$window',
    'Lokiwork'
  ];

  function Service($q, $window, Lokiwork) {
    var self = this;
    var _dbManager = {};

    /* Public methods */
    self.getDb = getDb;
    self.newDb = newDb;
    self.loadDb = loadDb;
    self.dbExists = dbExists;

    function getDb(dbName) {
      return _dbManager[dbName].lokiDb;
    }

    function newDb(dbName, storages) {
      _dbManager[dbName] = {};
      _dbManager[dbName].loading = $q.defer();
      _dbManager[dbName].storages = storages;
      _dbManager[dbName].lokiDb = new loki(dbName, {
        autoload: true,
        autoloadCallback: function() {
          _newDbLoadHandler(dbName)
        }
      });
      return _dbManager[dbName].loading.promise;
    }

    function loadDb(dbName, storages) {
      _dbManager[dbName] = {};
      _dbManager[dbName].loading = $q.defer();
      _dbManager[dbName].storages = storages;
      _dbManager[dbName].lokiDb = new loki(dbName, {
        autoload: true,
        autoloadCallback: function() {
          _existentDbLoadHandler(dbName)
        }
      });
      return _dbManager[dbName].loading.promise;
    }

    function dbExists(dbName) {
      return (!$window.localStorage.getItem(dbName)) ? false : true;
    }

    function _newDbLoadHandler(dbName) {
      _dbManager[dbName].storages.forEach(function(storage) {
        storage.initialize(getDb(dbName).addCollection(storage.collectionName), getDb(dbName));
      });
      getDb(dbName).saveDatabase();
      _dbManager[dbName].loading.resolve();
    }

    function _existentDbLoadHandler(dbName) {
      _dbManager[dbName].storages.forEach(function(storage) {
        storage.initialize(getDb(dbName).getCollection(storage.collectionName), getDb(dbName));
      });
      _dbManager[dbName].loading.resolve();
    }
  }
}());
