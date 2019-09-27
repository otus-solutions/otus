(function() {
  'use strict';

  angular
    .module('otusjs.application.storage')
    .service('otusjs.application.storage.SessionStorageService', Service);

  Service.$inject = [
    '$q',
    '$window'
  ];

  function Service($q, $window) {
    var self = this;
    var _storageInstance = null;
    var _isReady = false;
    var _loadingDefer = null;

    /* Public methods */
    self.initialize = initialize;
    self.isReady = isReady;
    self.setItem = setItem;
    self.getItem = getItem;
    self.removeItem = removeItem;
    self.clear = clear;
    self.key = key;
    self.keys = keys;
    self.length = length;

    function initialize() {
      _loadingDefer = $q.defer();
      _storageInstance = $window.sessionStorage;
      _isReady = true;
      _loadingDefer.resolve();
      return _loadingDefer.promise;
    }

    function isReady() {
      return _isReady;
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
  }
}());
