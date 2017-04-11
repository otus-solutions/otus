(function() {
  'use strict';

  angular
    .module('otusjs.application.core')
    .service('otusjs.application.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.application.core.ContextService'
  ];

  function Service($q, ContextService, EventService) {
    var self = this;
    var _loadedModules = [];
    var _isDeployed = false;
    var _deferred = $q.defer();

    /* Public methods */
    self.notifyModuleLoad = notifyModuleLoad;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.isDeployed = isDeployed;
    self.finalizeDeploy = finalizeDeploy;
    self.begin = begin;

    function notifyModuleLoad(moduleName) {
      _loadedModules.push(moduleName);
    }

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function isDeployed() {
      if (_isDeployed) {
        _deferred.resolve();
      } else {
        _deferred = $q.defer();
      }
      return _deferred.promise;
    }

    function finalizeDeploy() {
      _isDeployed = true;
      _deferred.resolve();
    }

    function begin() {
      ContextService.begin();
    }
  }
}());
