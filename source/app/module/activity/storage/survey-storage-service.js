(function() {
  'use strict';

  angular
    .module('otusjs.activity.storage')
    .service('otusjs.activity.storage.SurveyStorageService', Service);

  function Service() {
    var self = this;
    var _collection = {};
    var _otusDb = null;

    self.collectionName = 'surveys';

    /* Public methods */
    self.initialize = initialize;
    self.getCollection = getCollection;
    self.save = save;

    function initialize(collection, otusDb) {
      _collection = collection;
      _otusDb = otusDb;
    }

    function getCollection() {
      return _collection;
    }

    function save() {
      _otusDb.saveDatabase();
    }
  }
}());
