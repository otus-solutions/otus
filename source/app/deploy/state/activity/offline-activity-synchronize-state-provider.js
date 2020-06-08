(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.OfflineActivitySynchronizeState', Provider);

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
      name: STATE.ACTIVITY_SYNCHRONIZE,
      url: '/' + STATE.ACTIVITY_SYNCHRONIZE,
      template: '<offline-activity-synchronize-dashboard checkers="$resolve.listCheckers" layout="column" flex></offline-activity-synchronize-dashboard>',
      onEnter: _onEnter,
      data: {
        redirect: _redirect
      }
    };

    function _onEnter(ParticipantContextService, ActivityContextService, Application, SessionContextService) {
      Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            ParticipantContextService.restore();
            ActivityContextService.restore();
          } catch (e) {
            ActivityContextService.begin();
          }
        });
    }

    _onEnter.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.application.session.core.ContextService'
    ];

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function () {
          UserAccessPermissionService.getCheckingActivityPermission().then(permission => {
            try {
              if (!permission.offlineActivitySincAccess) {
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
