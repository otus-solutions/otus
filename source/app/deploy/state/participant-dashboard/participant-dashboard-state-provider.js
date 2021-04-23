(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantDashboardState', Provider);

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
      name: STATE.PARTICIPANT_DASHBOARD,
      url: '/' + STATE.PARTICIPANT_DASHBOARD,
      component:'otusParticipantDashboard',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadParticipantContext: _loadParticipantContext,
      }
    };

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      UserAccessPermissionService.getCheckingParticipantPermission().then(permission => {
        Application
          .isDeployed()
          .then(function () {
              try {
                if (!permission.participantListAccess) {
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

    function _loadParticipantContext(ParticipantContextService, SessionContextService, Application) {
      Application
        .isDeployed()
        .then(function() {
          try {
            ParticipantContextService.restore();
            SessionContextService.restore();
          } catch (e) {
            console.log(e);
          }
        });
    }

    _loadParticipantContext.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
