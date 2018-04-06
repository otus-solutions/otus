/**
 * LaboratoryLocalStorageService
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.storage')
    .service('otusjs.laboratory.storage.LaboratoryLocalStorageService', Service);

  Service.$inject = [
    '$q'
  ];

  /**
   * LaboratoryLocalStorageService creates a communication between the application and
   * a LokiJS's collection, named "laboratories". So the operations allowed to a
   * LokiJS's collection are placed here and specialized to deal only with data of
   * laboratories.
   * @see {LaboratoryLocalStorageService}
   * @namespace LaboratoryLocalStorageService
   * @memberof Services
   */
  function Service($q) {
    var self = this;
    var _collection = {};
    var _db = null;
    var _dataDeferred = $q.defer();

    self.collectionName = 'laboratory_participant';  //todo: rename
    self.options = {
      unique: ['_id']
    };

    /* Public methods */
    self.initialize = initialize;
    self.insert = insert;
    self.update = update;
    self.clear = clear;
    self.get = get;

    /**
     * Binds this service to collection "laboratories" from LokiJS database instance.
     * @param {object} collection - the reference to collection
     * @param {object} db - the reference to database instance
     * @memberof LaboratoryLocalStorageService
     */
    function initialize(collection, db) {
      _collection = collection;
      _db = db;
      console.log(_collection, _db)
      
    }

    /**
     * Adds laboratories to collection.
     * @param {(object)} laboratories - the laboratory to be inserted
     * @returns {(object)} laboratory inserted
     * @memberof LaboratoryLocalStorageService
     */
    function insert(laboratories) {
      var insertedData = _collection.insert(laboratories);
      _db.saveDatabase();
      return insertedData;
    }

    /**
     * Updates laboratories in collection.
     * @param {(object)} laboratories - the laboratory to be updated
     * @memberof LaboratoryLocalStorageService
     */
    function update(laboratories) {
      _collection.update(laboratories);
      _db.saveDatabase();
    }

    function get(ix) {
      return _collection.get(ix);  
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
  }
}());
