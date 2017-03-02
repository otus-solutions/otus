(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.LaboratoryModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.laboratory.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.ParticipantLaboratoryRemoteStorageService',
  ];

  function Service(
    ModuleService, ContextFactory, StorageService,
    ParticipantLaboratoryRemoteStorageService) {

    var self = this;

    /* Public methods */
    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function bootstrap() {
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      ModuleService.setParticipantLaboratoryRemoteStorage(ParticipantLaboratoryRemoteStorageService);
    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
      ModuleService.configureStorage(storage);
    }

  }
}());
