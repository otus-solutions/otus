(function() {
  'use strict';

  angular
    .module('otusjs.application.storage')
    .service('otusjs.application.storage.IndexedDbService', Service);

  Service.$inject = ['$localForage'];

  function Service($localForage) {
    var self = this;
    var _storageInstance = null;

    /* Public methods */
    self.initialize = initialize;
    self.setItem = setItem;
    self.getItem = getItem;
    self.removeItem = removeItem;
    self.pull = pull;
    self.clear = clear;
    self.key = key;
    self.keys = keys;
    self.length = length;
    self.iterate = iterate;

    function initialize() {
      _storageInstance = $localForage.createInstance({
        name: 'otus',
        driver: 'asyncStorage',
        storeName: 'session_data'
      })._localforage;
      setItem('dbname', 'otus');
    }

    function setItem(key, value) {
      return _storageInstance.setItem(key, value);
    }

    function getItem(key) {
      return _storageInstance.getItem(key);
    }

    function removeItem(key) {
      return _storageInstance.removeItem(key);
    }

    function pull(key) {
      return _storageInstance.pull(key);
    }

    function clear() {
      return _storageInstance.clear();
    }

    function key(n) {
      return _storageInstance.key(n);
    }

    function keys() {
      return _storageInstance.keys();
    }

    function length() {
      return _storageInstance.length();
    }

    function iterate(iteratorCallback) {
      return _storageInstance.iterate(iteratorCallback);
    }
  }
}());
