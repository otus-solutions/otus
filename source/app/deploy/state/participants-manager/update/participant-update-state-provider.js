(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantUpdateState', Provider);

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
      name: STATE.PARTICIPANT_UPDATE,
      url: '/' + STATE.PARTICIPANT_UPDATE,
      template: '<otus-participant-contact permissions="$resolve.permission"></otus-participant-contact>',
      data: {
        redirect: _redirect
      },
      resolve: {
        permission: _loadParticipantRegistration
      }
    };

    function _redirect($q, Application, UserAccessPermissionService, ParticipantContextService) {
      var deferred = $q.defer();

      UserAccessPermissionService.getCheckingParticipantPermission().then(permission => {
        Application
          .isDeployed()
          .then(function () {
            try {
              if (!permission.participantListAccess) {
                deferred.resolve(STATE.DASHBOARD);
                return;
              }
              ParticipantContextService.isValid();
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
      'otusjs.user.business.UserAccessPermissionService',
      'otusjs.participant.core.ContextService'

    ];

    function _loadParticipantRegistration(ProjectConfiguration, ParticipantContextService, SessionContextService, Application) {
      return Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            ParticipantContextService.restore();
            return ProjectConfiguration.getProjectConfiguration()
              .then(function(response) {
                var _permissions = {}
                _permissions.participantRegistration = response.data.participantRegistration;
                _permissions.autoGenerateRecruitmentNumber = response.data.autoGenerateRecruitmentNumber;
                _permissions.addressCensusRequired = response.data.addressCensusRequired;
                return _permissions;
              });
          } catch (e) {
            console.error(e);
          }
        });
    }

    _loadParticipantRegistration.$inject = [
      'otusjs.deploy.ProjectConfigurationRestService',
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
