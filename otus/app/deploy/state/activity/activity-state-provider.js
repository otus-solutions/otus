(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ActivityState', Provider);

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
      parent: STATE.DASHBOARD,
      name: STATE.PARTICIPANT_ACTIVITY,
      url: '/' + STATE.PARTICIPANT_ACTIVITY,
      template: '<otus-activity-manager layout="column" flex></otus-activity-manager>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadParticipantContext: _loadParticipantContext
      }
    };

    function _redirect($q, ActivityContextService, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            ActivityContextService.isValid();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    function _loadParticipantContext(ActivityContextService, ParticipantContextService, SessionContextService, Application) {
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

    function _onEnter(ActivityContextService, Application) {
      Application
        .isDeployed()
        .then(function() {
          try {
            ActivityContextService.restore();
          } catch (e) {
            ActivityContextService.begin();
          }
        });
    }

    _redirect.$inject = [
      '$q',
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _loadParticipantContext.$inject = [
      'otusjs.activity.core.ContextService',
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _onEnter.$inject = [
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
