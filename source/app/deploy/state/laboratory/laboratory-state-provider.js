(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.LaboratoryState', Provider);

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
      name: STATE.LABORATORY,
      url: '/' + STATE.LABORATORY,
      template: '<otus-laboratory layout="row" flex></otus-laboratory>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadStateData: _loadStateData
      }
    };

    function _redirect($q, LaboratoryContextService, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      Application.isDeployed().then(function () {
        UserAccessPermissionService.getCheckingLaboratoryPermission().then(permission => {
          try {
            if (!permission) {
              deferred.resolve(STATE.DASHBOARD);
              return;
            }
            LaboratoryContextService.isValid();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });
      });

      return deferred.promise;
    }

    function _loadStateData(ParticipantContextService, SessionContextService, Application) {
      Application
        .isDeployed()
        .then(function () {
          try {
            ParticipantContextService.restore();
            SessionContextService.restore();
          } catch (e) {
            console.log(e);
            return STATE.ERROR;
          }
        });
    }

    _redirect.$inject = [
      '$q',
      'otusjs.laboratory.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.user.business.UserAccessPermissionService'
    ];
    _loadStateData.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
