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
      //template: '<otus-activity-manager layout="column" flex></otus-activity-manager>',
      template: '<otus-activity-stage-list layout="column" flex></otus-activity-stage-list>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadStateData: _loadStateData
      }
    };

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();
      UserAccessPermissionService.getCheckingActivityPermission().then(permission => {
        Application
          .isDeployed()
          .then(function () {
              try {
                if (!permission.participantActivityAccess) {
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
    _loadStateData.$inject = [
      'otusjs.activity.core.ContextService',
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.deploy.ActivityDataSourceService'
    ];
  }
}());
