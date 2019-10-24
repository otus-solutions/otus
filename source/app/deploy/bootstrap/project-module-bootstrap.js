(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ProjectModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.laboratory.core.project.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService'

  ];

  function Service(ModuleService, ContextFactory, StorageService) {

    var self = this;

    /* Public methods */
    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function bootstrap() {
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
      ModuleService.configureStorage(storage);
    }

  }
}());
