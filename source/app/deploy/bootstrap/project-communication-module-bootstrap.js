(function () {
  'use strict';

  angular.module('otusjs.deploy')
    .service('otus.deploy.ProjectCommunicationModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.projectCommunication.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.ProjectCommunicationRestService'
  ];

  function Service( ModuleService, ContextFactory, StorageService, ProjectCommunicationRestService) {
    const self = this;
    /* Public methods */

    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function bootstrap() {
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      ModuleService.configureRemoteStorage(ProjectCommunicationRestService);
    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
       ModuleService.configureStorage(storage);
    }
  }

}());