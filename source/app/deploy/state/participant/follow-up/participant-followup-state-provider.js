(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantFollowUpState', Provider);

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
      name: STATE.PARTICIPANT_FOLLOWUPS,
      url: '/' + STATE.PARTICIPANT_FOLLOWUPS,
      template: '<otus-participant-followup flex></otus-participant-followup>',
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, Application, DashboardContextService) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            DashboardContextService.restore();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }


    _redirect.$inject = [
      '$q',
      'otusjs.application.core.ModuleService',
      'otusjs.otus.dashboard.core.ContextService'
    ];
  }
}());
