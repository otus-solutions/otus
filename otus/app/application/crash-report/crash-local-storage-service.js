/**
 * CrashStorageService
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('otusjs.application.crash')
    .service('otusjs.application.crash.CrashLocalStorageService', Service);

  /**
   * CrashStorageService creates a communication between the application and
   * a LokiJS's collection, named "otus_bugtracker". So the operations allowed to a
   * LokiJS's collection are placed here and specialized to deal only with data of
   * activities.
   * @see {CrashReportService}
   * @namespace CrashStorageService
   * @memberof Services
   */
  function Service() {
    var self = this;
    var _collection = {};
    var _db = null;

    self.collectionName = 'otus_bugtracker';
    self.options = {
      unique: ['_id'],
      ttl: 60,
      ttlInterval: 60
    };

    /* Public methods */
    self.initialize = initialize;
    self.insert = insert;
    self.update = update;
    self.clear = clear;
    self.find = find;
    self.remove = remove;
    self.getCollectionError = getCollectionError;

    /**
     * Binds this service to collection "otus_bugtracker" from LokiJS database instance.
     * @param {object} collection - the reference to collection
     * @param {object} db - the reference to database instance
     * @memberof CrashStorageService
     */
    function initialize(collection, db) {
      _collection = collection;
      _db = db;
    }

    /**
     * Adds otus_bugtracker to collection.
     * @param {(object|array)} otus_bugtracker  - the error (or array of otus_bugtracker) to be inserted
     * @returns {(object|array)} error or otus_bugtracker  inserted
     * @memberof CrashStorageService
     */
    function insert(dataError) {
      console.log(dataError);
      var insertedData = _collection.insert(dataError);
      _db.saveDatabase();

      return insertedData;
    }

    /**
     * Updates otus_bugtracker in collection.
     * @param {(object|array)} otus_bugtracker - the error (or array of otus_bugtracker) to be updated
     * @memberof CrashStorageService
     */
    function update(dataError) {
      _collection.update(dataError);
      _db.saveDatabase();
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

    function find() {
      return _collection.find();
    }

    function getCollectionError() {
      return _collection;
    }

    function remove(filterObject) {
      return _collection.findAndRemove(filterObject);
    }
  }
}());
