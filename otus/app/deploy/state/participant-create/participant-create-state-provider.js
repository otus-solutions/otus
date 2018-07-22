(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantCreateState', Provider);

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
      name: STATE.PARTICIPANT_CREATE,
      url: '/' + STATE.PARTICIPANT_CREATE,
      template: '<otus-participant-create-dashboard layout="column" flex loggedUser="$resolve.user"></otus-participant-create-dashboard>',
      data: {
        redirect: _redirect
      },
      resolve: {
        user: _loadUserContext
      }
    };

    function _redirect($q, DashboardContextService, ParticipantContextService, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            // ParticipantContextService.restore();
            DashboardContextService.isValid();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    function _loadUserContext(ParticipantContextService, SessionContextService, Application) {

      return Application
        .isDeployed()
        .then(function() {
          try {
            // ParticipantContextService.restore();
            SessionContextService.restore();
            var loggedUser;
            loggedUser = SessionContextService.getData('loggedUser');
            return loggedUser;
          } catch (e) {
            console.log(e);
          }
        });
    }

    _redirect.$inject = [
      '$q',
      'otusjs.otus.dashboard.core.ContextService',
      'otusjs.participant.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _loadUserContext.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
