(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ActivityModuleBootstrap', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.ActivityDataSourceService',
    'otusjs.deploy.ActivityRemoteStorageService',
    'otusjs.deploy.UserDataSourceService',
    'otusjs.deploy.model.ActivityFacadeService',
    'otusjs.deploy.model.ActivityModelPoolService',
    'otusjs.deploy.model.SurveyModelPoolService',
    'otusjs.deploy.PlayerService'
  ];

  function Service(
    ModuleService, ContextFactory, StorageService,
    ActivityDataSourceService, ActivityRemoteStorageService, UserDataSourceService,
    ActivityFacadeService, ActivityModelPoolService, SurveyModelPoolService,
    PlayerService) {

    var self = this;

    /* Public methods */
    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureActivityDataSourceService = configureActivityDataSourceService;

    function bootstrap() {
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      configureUserDataSourceService(UserDataSourceService);
      ModuleService.setActivityRemoteStorage(ActivityRemoteStorageService);
      configureActivityDataSourceService(ActivityDataSourceService);
      configureActivityFacadeService(ActivityFacadeService);
      configureActivityPlayerService(PlayerService);
      addModel(ActivityModelPoolService);
      addModel(SurveyModelPoolService);
    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
      ModuleService.configureStorage(storage);
    }

    function configureStateService(service) {
      ModuleService.configureStateService(service);
    }

    function configureActivityDataSourceService(dataSource) {
      ModuleService.configureActivityDataSourceService(dataSource);
    }

    function configureUserDataSourceService(dataSource) {
      ModuleService.configureUserDataSourceService(dataSource);
    }

    function configureActivityFacadeService(facade) {
      ModuleService.configureActivityFacadeService(facade);
    }

    function configureActivityPlayerService(service) {
      ModuleService.configureActivityPlayerService(service);
    }

    function addModel(ModelPoolService) {
      ModelPoolService.getModels().forEach(ModuleService.addModel);
    }
  }
}());
