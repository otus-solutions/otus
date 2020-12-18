(function () {
  'use strict';

  angular.module('otusjs.deploy')
    .service('otusjs.deploy.StageModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.stage.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.StageRestService'
  ];

  function Service(ModuleService, ContextFactory, StorageService, StageRestService) {
    const self = this;
    /* Public methods */

    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function bootstrap() {
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      ModuleService.configureRemoteStorage(StageRestService);
    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
       ModuleService.configureStorage(storage);
    }
  }

}());