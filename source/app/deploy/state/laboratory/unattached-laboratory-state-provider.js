(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.UnattachedLaboratoryState', Provider);

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
      name: STATE.UNATTACHED_LABORATORY,
      url: '/' + STATE.UNATTACHED_LABORATORY,
      template: '<unattached-laboratory layout="row" user="$resolve.user" flex></unattached-laboratory>',
      resolve: {
        user: _resolveUserLogged
      },
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, ActivityContextService, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function () {
          UserAccessPermissionService.getCheckingLaboratoryPermission().then(permission => {
            try {
              if (!permission) {
                deferred.resolve(STATE.DASHBOARD);
                return;
              }
              deferred.resolve();
              ActivityContextService.restore();
            } catch (e) {
              deferred.resolve(STATE.LOGIN);
            }
          });
        });

      return deferred.promise;
    }

    _redirect.$inject = [
      '$q',
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.user.business.UserAccessPermissionService'
    ];

    function _resolveUserLogged(SessionContextService, Application) {
      return Application
        .isDeployed()
        .then(function () {
          try {
            SessionContextService.restore();
            var user = SessionContextService.getData('loggedUser');
            return user;
          } catch (e) {
            console.log(e);
          }
        });
    }

    _resolveUserLogged.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

  }
}());
