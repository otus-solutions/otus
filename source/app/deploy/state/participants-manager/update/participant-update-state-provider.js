(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantUpdateState', Provider);

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
      parent: STATE.PARTICIPANT_DASHBOARD,
      name: STATE.PARTICIPANT_UPDATE,
      url: '/' + STATE.PARTICIPANT_UPDATE,
      template: '<otus-participant-contact></otus-participant-contact>',
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function () {
          UserAccessPermissionService.getCheckingParticipantPermission().then(permission => {
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

    function _loadParticipantContext(ParticipantContextService, SessionContextService, Application) {
      Application
        .isDeployed()
        .then(function () {
          try {
            SessionContextService.restore();
            ParticipantContextService.restore();
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
