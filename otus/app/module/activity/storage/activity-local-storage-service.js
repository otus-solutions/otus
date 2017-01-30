/**
 * ActivityLocalStorageServiceService
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('otusjs.activity.storage')
    .service('otusjs.activity.storage.ActivityLocalStorageService', Service);

  Service.$inject = [
    '$q'
  ];

  /**
   * ActivityLocalStorageService creates a communication between the application and
   * a LokiJS's collection, named "activities". So the operations allowed to a
   * LokiJS's collection are placed here and specialized to deal only with data of
   * activities.
   * @see {ActivityRestService}
   * @namespace ActivityLocalStorageService
   * @memberof Services
   */
  function Service($q) {
    var self = this;
    var _collection = {};
    var _db = null;
    var _dataDeferred = $q.defer();

    self.collectionName = 'activities';
    self.options = {
      unique: ['_id']
    };

    /* Public methods */
    self.initialize = initialize;
    self.insert = insert;
    self.update = update;
    self.clear = clear;

    /**
     * Binds this service to collection "activities" from LokiJS database instance.
     * @param {object} collection - the reference to collection
     * @param {object} db - the reference to database instance
     * @memberof ActivityStorageService
     */
    function initialize(collection, db) {
      _collection = collection;
      _db = db;
    }

    /**
     * Adds activities to collection.
     * @param {(object|array)} activities - the activity (or array of activities) to be inserted
     * @returns {(object|array)} activity or activities inserted
     * @memberof ActivityStorageService
     */
    function insert(activities) {
      var insertedData = _collection.insert(activities);
      _db.saveDatabase();
      return insertedData;
    }

    /**
     * Updates activities in collection.
     * @param {(object|array)} activities - the activity (or array of activities) to be updated
     * @memberof ActivityStorageService
     */
    function update(activities) {
      _collection.update(activities);
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
  }
}());
