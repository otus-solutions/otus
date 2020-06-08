(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantsManagerState', Provider);

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
      abstract: true,
      parent: STATE.SESSION,
      name: STATE.PARTICIPANTS_MANAGER,
      url: '/' + STATE.PARTICIPANTS_MANAGER,
      template: '<otus-participants-manager-dashboard layout="column" flex></otus-participants-manager-dashboard>',
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function () {
          UserAccessPermissionService.getCheckingParticipantPermission().then(permission => {
            try {

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

  }
}());
