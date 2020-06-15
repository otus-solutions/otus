(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.LaboratoryFlagReportState', Provider);

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
      name: STATE.LABORATORY_FLAG_REPORT,
      url: '/' + STATE.LABORATORY_FLAG_REPORT,
      template: '<otus-laboratory-flag-report-list-manager layout="column" flex></otus-laboratory-flag-report-list-manager>',
      resolve: {
        resolve: _resolve
      },
      data: {
        redirect: _redirect
      }
    };

    function _resolve($q, Application, SessionContextService, DashboardContextService) {
      var deferred = $q.defer();
      Application.isDeployed()
        .then(function () {
          try {
            DashboardContextService.restore();
            SessionContextService.restore();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    _resolve.$inject = [
      '$q',
      'otusjs.application.core.ModuleService',
      'otusjs.application.session.core.ContextService',
      'otusjs.otus.dashboard.core.ContextService'
    ]

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      UserAccessPermissionService.getCheckingMonitoringPermission().then(permission => {
        Application
          .isDeployed()
          .then(function () {

            try {
              if (!permission.laboratoryFlagsAccess) {
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

  }
}());
