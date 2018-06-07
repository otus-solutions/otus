(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ProjectModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.monitoring.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.MonitoringRestService'

  ];

  function Service(ModuleService, ContextFactory, StorageService, RestService) {

    var self = this;

    /* Public methods */
    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function bootstrap() {
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      configureRemoteStorage(RestService)

    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
      ModuleService.configureStorage(storage);
    }

    function configureRemoteStorage(storage) {
      ModuleService.configureRemoteStorage(storage);
    }
  }
}());
