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
      parent: STATE.PARTICIPANT_DASHBOARD,
      name: STATE.PARTICIPANT_ACTIVITY,
      url: '/' + STATE.PARTICIPANT_ACTIVITY,
      template: '<otus-activity-manager class="activity-manager-component" layout="column" flex></otus-activity-manager>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadStateData: _loadStateData
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

    function _loadStateData(ActivityContextService, ParticipantContextService, SessionContextService, Application, ActivityDataSourceService) {
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
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _loadStateData.$inject = [
      'otusjs.activity.core.ContextService',
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.deploy.ActivityDataSourceService'
    ];
  }
}());
