(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantState', Provider);

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
      abstract: true,
      parent: STATE.PARTICIPANT_DASHBOARD,
      name: STATE.PARTICIPANT,
      url: '/' + STATE.PARTICIPANT,
      template: '<div id="participant-state-template" flex ui-view></div>',
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, Application, ParticipantContextService, UserAccessPermissionService) {
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
  }
}());
