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
      parent: STATE.PARTICIPANTS_MANAGER,
      name: STATE.PARTICIPANT_CREATE,
      url: '/' + STATE.PARTICIPANT_CREATE,
      template: '<otus-participant-create layout="column" flex></otus-participant-create>',
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, DashboardContextService, ParticipantContextService, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    _redirect.$inject = [
      '$q',
      'otusjs.otus.dashboard.core.ContextService',
      'otusjs.participant.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
