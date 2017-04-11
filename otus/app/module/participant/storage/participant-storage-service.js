(function() {
  'use strict';

  angular
    .module('otusjs.participant.storage')
    .service('otusjs.participant.storage.ParticipantStorageService', Service);

  function Service() {
    var self = this;
    var _collection = {};
    var _otusDb = null;

    self.collectionName = 'participants';

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
