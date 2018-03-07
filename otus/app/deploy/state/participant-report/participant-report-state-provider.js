(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantReportState', Provider);

  Provider.$inject = [
    'STATE'
  ];

  function Provider(STATE) {
    var self = this;

    self.$get = [provider];

    function provider() {
      return self;
    }
    //TODO: ALTERAR TEMPLATE
    self.state = {
      parent: STATE.PARTICIPANT_DASHBOARD,
      name: STATE.PARTICIPANT_REPORT,
      url: '/' + STATE.PARTICIPANT_REPORT,
      template: '<h1>TESTE</h1>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadParticipantContext: _loadParticipantContext
      }
    };
    function _redirect($q, DashboardContextService, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
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
      'otusjs.application.core.ModuleService'
    ];
    //TODO: REMOVER
    _loadParticipantContext.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
