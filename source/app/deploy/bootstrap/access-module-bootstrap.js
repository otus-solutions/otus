(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.AccessModuleBootstrap', Service);

  Service.$inject = [
    '$q',
    'otusjs.user.access.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
  ];

  function Service($q, ModuleService, ContextFactory, StorageService) {
    var self = this;

    /* Public methods */
    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function bootstrap() {
      var deferred = $q.defer();
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      deferred.resolve();
      return deferred.promise;
    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
      ModuleService.configureStorage(storage);
    }
  }
}());
