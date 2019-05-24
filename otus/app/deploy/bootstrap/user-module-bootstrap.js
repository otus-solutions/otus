(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserModuleBootstrap', Service);

  Service.$inject = [
    '$q',
    'otusjs.user.core.ModuleService',
    'otusjs.application.context.ContextFactory',
    'otusjs.application.storage.StorageService',
    'otusjs.deploy.UserDataSourceService',
    'otusjs.deploy.user.AuthenticationRestService',
    'otusjs.deploy.UserAccessPermissionRemoteStorageService'
  ];

  function Service($q, ModuleService, ContextFactory, StorageService, UserDataSourceService, LoginProxyService, UserAccessPermissionRemosteStorageService) {
    var self = this;

    /* Public methods */
    self.bootstrap = bootstrap;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureUserDataSource = configureUserDataSource;
    self.configureLoginProxy = configureLoginProxy;

    function bootstrap() {      
      var deferred = $q.defer();
      configureContext(ContextFactory);
      configureStorage(StorageService.session);
      configureLoginProxy(LoginProxyService);
      configureUserDataSource(UserDataSourceService);
      configureUserPermissionRemoteStorage();
      return deferred.promise;
    }

    function configureContext(context) {
      ModuleService.configureContext(context);
    }

    function configureStorage(storage) {
      ModuleService.configureStorage(storage);
    }

    function configureUserDataSource(dataSource) {
      return ModuleService.configureUserDataSource(dataSource);
    }

    function configureLoginProxy(proxy) {
      ModuleService.configureLoginProxy(proxy);
    }

    function configureUserPermissionRemoteStorage() {
      ModuleService.configureUserPermissionRemoteStorage(UserAccessPermissionRemosteStorageService);
    }
  }
}());
