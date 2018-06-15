/**
 * MonitoringLocalStorageService
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('otusjs.monitoring.storage')
    .service('otusjs.monitoring.storage.MonitoringLocalStorageService', Service);

  Service.$inject = [
    '$q'
  ];

  /**
   * MonitoringLocalStorageService creates a communication between the application and
   * a LokiJS's collection, named "laboratories". So the operations allowed to a
   * LokiJS's collection are placed here and specialized to deal only with data of
   * laboratories.
   * @see {MonitoringLocalStorageService}
   * @namespace MonitoringLocalStorageService
   * @memberof Services
   */
  function Service($q) {
    var self = this;
    var _collection = {};
    var _db = null;

    self.collectionName = 'monitoring';
    self.options = {
      unique: ['_id']
    };

    /* Public methods */
    self.initialize = initialize;
    self.insert = insert;
    self.clear = clear;
    self.get = get;
    self.find = find;

    /**
     * Binds this service to collection "laboratories" from LokiJS database instance.
     * @param {object} collection - the reference to collection
     * @param {object} db - the reference to database instance
     * @memberof MonitoringLocalStorageService
     */
    function initialize(collection, db) {
      _collection = collection;
      _db = db;
    }

    /**
     * Clears the collection data.
     */
    function clear() {
      _collection.clear();
      self.options.unique.forEach(function(uniqueIndex) {
        _collection.constraints.unique[uniqueIndex].keyMap = {};
        _collection.constraints.unique[uniqueIndex].lokiMap = {};
      });
      _db.saveDatabase();
    }

    //todo: properly comment
    /**
     * Adds laboratories to collection.
     * @param {(object)} laboratories - the laboratory to be inserted
     * @returns {(object)} laboratory inserted
     * @memberof MonitoringLocalStorageService
     */
    function insert(data) {
      var insertedData = _collection.insert(data);
      _db.saveDatabase();
      return insertedData;
    }

    function get(ix) {
      return _collection.get(ix);
    }

    function find(query) {
      return _collection.find(query);
    }


  }
}());
