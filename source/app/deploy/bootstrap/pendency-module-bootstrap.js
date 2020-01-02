(function () {
  'use strict'

  angular.module('otusjs.deploy')
    .service('otus.deploy.PendencyModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.UserActivityPendencyRestService',
    //'otusjs.monitoring.core.ModuleService',
  ];

  function Service(ContextFactory, StorageService, UserActivityPendencyRestService) {
    const self = this;
    /* Public methods */

    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;


    function bootstrap() {
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      //ModuleService.configureRemoteStorage(UserActivityPendencyRestService);
    }

    function configureContext(context) {
      //ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
       //ModuleService.configureStorage(storage);
    }

  }

}());