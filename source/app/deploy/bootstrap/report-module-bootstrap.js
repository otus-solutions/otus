(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ReportModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.report.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.ParticipantReportRestService'
  ];

  function Service(
    ModuleService, ContextFactory, StorageService, RestService) {

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
