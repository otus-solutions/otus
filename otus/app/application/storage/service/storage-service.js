(function() {
  'use strict';

  angular
    .module('otusjs.application.storage')
    .service('otusjs.application.storage.StorageService', Service);

  Service.$inject = [
    '$q',
    'otusjs.application.storage.LocalStorageService',
    'otusjs.application.storage.SessionStorageService'
  ];

  function Service($q, LocalStorageService, SessionStorageService) {
    var self = this;
    var _isReady = false;
    var _loadingDefer = null;
    self.local = LocalStorageService;
    self.session = SessionStorageService;

    /* Public methods */
    self.initialize = initialize;
    self.initializeSession = initializeSession;
    self.initializeLocal = initializeLocal;
    self.isReady = isReady;

    function initialize() {
      _loadingDefer = $q.defer();
      LocalStorageService.initialize().then(_listenLocalStorageInitialization);
      SessionStorageService.initialize().then(_listenSessionStorageInitialization);
      return _loadingDefer.promise;
    }

    function initializeSession() {
      _loadingDefer = $q.defer();
      SessionStorageService.initialize().then(_listenSessionStorageInitialization);
      return _loadingDefer.promise;
    }

    function initializeLocal() {
      _loadingDefer = $q.defer();
      LocalStorageService.initialize().then(_listenLocalStorageInitialization);
      return _loadingDefer.promise;
    }

    function isReady() {
      return _isReady;
    }

    function _listenLocalStorageInitialization() {
      _isReady = LocalStorageService.isReady() && SessionStorageService.isReady();
      _tryResolve();
    }

    function _listenSessionStorageInitialization() {
      _isReady = LocalStorageService.isReady() && SessionStorageService.isReady();
      _tryResolve();
    }

    function _tryResolve() {
      if (isReady()) {
        _loadingDefer.resolve('Application start data loaded.');
      }
    }
  }
}());
