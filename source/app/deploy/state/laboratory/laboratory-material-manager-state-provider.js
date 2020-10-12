(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.LaboratoryMaterialManagerState', Provider);

  Provider.$inject = [
    'STATE'
  ];

  function Provider(STATE) {
    var self = this;

    self.$get = [provider];

    function provider() {
      return self;
    }

    self.state = {
      parent: STATE.SESSION,
      name: STATE.LABORATORY_MATERIAL_MANAGER,
      url: '/' + STATE.LABORATORY_MATERIAL_MANAGER,
      template: '<laboratory-material-manager-dashboard flex></laboratory-material-manager-dashboard>',
      resolve: {
        user: _resolveUserLogged
      },
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      UserAccessPermissionService.getCheckingLaboratoryPermission().then(permission => {
        Application
          .isDeployed()
          .then(function () {
            try {
              if (!permission.laboratoryMaterialManagerAccess) {
                deferred.resolve(STATE.DASHBOARD);
                return;
              }
              deferred.resolve();
            } catch (e) {
              deferred.resolve(STATE.LOGIN);
            }
          });
      });

      return deferred.promise;
    }

    _redirect.$inject = [
      '$q',
      'otusjs.application.core.ModuleService',
      'otusjs.user.business.UserAccessPermissionService'
    ];

    function _resolveUserLogged(SessionContextService, laboratoryContextService, Application) {
      return Application
        .isDeployed()
        .then(function () {
          try {
            SessionContextService.restore();
            laboratoryContextService.restore();
            var user = SessionContextService.getData('loggedUser');
            return user;
          } catch (e) {
            console.log(e);
          }
        });
    }

    _resolveUserLogged.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.laboratory.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

  }
}());
