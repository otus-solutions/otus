(function () {
  'use strict';

  angular.module('otusjs.deploy')
    .service('otus.deploy.ProjectContactModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.project.contact.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.ProjectContactRestService'
  ];

  function Service( ModuleService, ContextFactory, StorageService, ProjectContactRestService) {
    const self = this;
    /* Public methods */

    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function bootstrap() {
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      ModuleService.configureRemoteStorage(ProjectContactRestService);
    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
       ModuleService.configureStorage(storage);
    }
  }

}());