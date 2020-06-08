(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ExamLotDashboardState', Provider);

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
      name: STATE.EXAM_DASHBOARD,
      url: '/' + STATE.EXAM_DASHBOARD,
      template: '<otus-exam-dashboard layout="column" flex></otus-exam-dashboard>',
      resolve: {
        user: _resolveUserLogged
      },
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function () {
          UserAccessPermissionService.getCheckingLaboratoryPermission().then(permission => {
            try {
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
