(function() {
    'use strict';

    angular
      .module('otusjs.deploy')
      .provider('otusjs.deploy.MonitoringState', Provider);

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
        name: STATE.MONITORING,
        url: '/' + STATE.MONITORING,
        template: '<otus-monitoring-dashboard layout="column" flex></otus-monitoring-dashboard>',
        data: {
          redirect: _redirect
        }
      };

      function _redirect($q, Application, UserAccessPermissionService) {
        var deferred = $q.defer();

        UserAccessPermissionService.getCheckingMonitoringPermission().then(permission => {
          Application
            .isDeployed()
            .then(function () {
                try {
                  if (!permission.centerActivitiesAccess) {
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
