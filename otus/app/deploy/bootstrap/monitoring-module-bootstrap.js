(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.MonitoringModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.monitoring.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.monitoring.MonitoringRestService',
    'otusjs.deploy.monitoring.LaboratoryMonitoringRestService'
  ];

  function Service(ModuleService, ContextFactory, StorageService, MonitoringRestService, LaboratoryMonitoringRestService) {

    var self = this;

    /* Public methods */
    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function bootstrap() {
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      ModuleService.configureRemoteStorage(MonitoringRestService);
      ModuleService.configureLaboratoryMonitoringRemoteStorage(LaboratoryMonitoringRestService);
    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
      ModuleService.configureStorage(storage);
    }
  }
}());
