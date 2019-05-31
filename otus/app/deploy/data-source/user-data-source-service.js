(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserDataSourceService', Service);

  Service.$inject = [
    '$q',
    '$timeout',
    'otusjs.deploy.user.UserRestService',
    'otusjs.user.storage.UserStorageService',
    'otusjs.deploy.user.UserAccessPermissionRestService',
    'otusjs.application.session.core.ContextService',
    'otusjs.user.core.ContextService',
    'otusjs.user.access.service.LogoutService',
    'otusjs.deploy.LoadingScreenService',
  ];

  function Service($q, $timeout, UserRestService, UserStorageService, UserAccessPermissionRestService, ContextService, UserContextService, LogoutService, LoadingScreenService) {
    var self = this;
    var _loadingDefer = null;

    /* Public methods */
    self.up = up;
    self.getData = getData;
    self.listIndexers = listIndexers;

    function up() {
      _loadingDefer = $q.defer();
      _initializeSources();
      _loadData();
      return _loadingDefer.promise;
    }

    function listIndexers() {
      return UserStorageService.getCollection().find();
    }

    function getData() {
    }

    function _initializeSources() {
      UserRestService.initialize();
      UserAccessPermissionRestService.initialize();
    }

    function _loadData() {
      UserRestService
        .listIdexers()
        .then(function (response) {
          UserStorageService.getCollection().clear();
          UserStorageService.getCollection().insert(response.data);
          UserStorageService.save();
          _loadingDefer.resolve();
        });

      fetchUserPermissions();

    }

    function fetchUserPermissions() {
      LoadingScreenService.start();
      return ContextService.getLoggedUser()
        .then(loggedUser => {
          UserAccessPermissionRestService.getAllPermission({ email: loggedUser.email })
            .then(response => {
              // TODO: better check permissions format (model?)
              if ('data' in response) {
                UserContextService.setUserPermissions(response.data.permissions);
                $timeout(function () {
                  LoadingScreenService.finish();
                }, 5000 );
              }
            }).catch(e => {
              LoadingScreenService.finish();
              LogoutService.forceLogout("Erro ao carregar permissões de usuário", "Você será redirecionado à tela de login.");
            })
        })
    }
  }
}());
