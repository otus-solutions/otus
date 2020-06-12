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
      template: '<otus-participant-create layout="column" permissions="$resolve.permissions" flex></otus-participant-create>',
      data: {
        redirect: _redirect
      },
      resolve: {
        permissions: _loadParticipantRegistration
      },
      onExit: function () {
        localStorage.removeItem("newParticipant");
      }
    };

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      UserAccessPermissionService.getCheckingParticipantPermission().then(permission => {
        Application
          .isDeployed()
          .then(function () {
              try {
                if (!permission.examSendingAccess) {
                  deferred.resolve(STATE.DASHBOARD);
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

    function _loadParticipantRegistration(ProjectConfiguration, SessionContextService, Application) {
      return Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            return ProjectConfiguration.getProjectConfiguration()
              .then(function(response) {
                var _permissions = {}
                _permissions.participantRegistration = response.data.participantRegistration;
                _permissions.autoGenerateRecruitmentNumber = response.data.autoGenerateRecruitmentNumber;
                return _permissions;
              });
          } catch (e) {
            console.error(e);
          }
        });
    }

    _loadParticipantRegistration.$inject = [
      'otusjs.deploy.ProjectConfigurationRestService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.user.business.UserAccessPermissionService'
    ];

  }
}());
