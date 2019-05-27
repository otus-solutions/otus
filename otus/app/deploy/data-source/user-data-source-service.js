(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserDataSourceService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.user.UserRestService',
    'otusjs.user.storage.UserStorageService',
    'otusjs.deploy.user.UserAccessPermissionRestService',
    'otusjs.application.session.core.ContextService',
    'otusjs.user.core.ContextService',
    'otusjs.user.access.service.LogoutService'
  ];

  function Service($q, UserRestService, UserStorageService, UserAccessPermissionRestService, ContextService, UserContextService, LogoutService) {
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
      return ContextService.getLoggedUser()
        .then(loggedUser => {
          UserAccessPermissionRestService.getAllPermission({ email: loggedUser.email })
            .then(response => {
              if ('data' in response) {  // TODO: better check permissions format (model?)
                UserContextService.setUserPermissions(response.data.permissions);
              }
            }).catch(e => {
              LogoutService.forceLogout("Erro ao carregar permissões de usuário", "Você será redirecionado à tela de login.");
            })

        })
    }
  }
}());
