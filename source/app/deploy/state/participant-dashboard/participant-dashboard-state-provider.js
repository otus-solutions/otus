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
      template: '<otus-participant-dashboard layout="column" flex></otus-participant-dashboard>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadParticipantContext: _loadParticipantContext
      }
    };

    function _redirect($q, DashboardContextService, ParticipantContextService, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            ParticipantContextService.restore();
            DashboardContextService.isValid();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

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

    _redirect.$inject = [
      '$q',
      'otusjs.otus.dashboard.core.ContextService',
      'otusjs.participant.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _loadParticipantContext.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());