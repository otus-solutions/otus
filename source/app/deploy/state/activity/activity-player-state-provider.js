(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ActivityPlayerState', Provider);

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
      name: STATE.ACTIVITY_PLAYER,
      url: '/' + STATE.ACTIVITY_PLAYER,
      template: '<otus-activity-player layout="row" flex></otus-activity-player>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadPlayerContext: _loadPlayerContext
      }
    };

    function _redirect($q, ActivityContextService, Application, ActivityFacadeService) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            ActivityContextService.isValid();
            ActivityContextService.restore();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.PARTICIPANT_DASHBOARD);
          }
        });

      return deferred.promise;
    }

    function _loadPlayerContext(ActivityContextService, SessionContextService, Application) {
      Application
        .isDeployed()
        .then(function() {
          try {
            ActivityContextService.restore();
            SessionContextService.restore();
          } catch (e) {
            console.log(e);
          }
        });
    }

    _redirect.$inject = [
      '$q',
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.deploy.model.ActivityFacadeService'
    ];
    _loadPlayerContext.$inject = [
      'otusjs.activity.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
