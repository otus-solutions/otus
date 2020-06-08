(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantsListState', Provider);

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
      name: STATE.PARTICIPANTS_LIST,
      url: '/' + STATE.PARTICIPANTS_LIST,
      template: '<otus-participants-list layout="column" participants-list="$resolve.participants" permission="$resolve.permission" flex></otus-participants-list>',
      data: {
        redirect: _redirect
      },
      resolve: {
        participants: _loadParticipantsList,
        permission: _loadParticipantRegistration
      }
    };

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function () {
          UserAccessPermissionService.getCheckingParticipantPermission().then(permission => {
            try {
              if (!permission.participantListAccess) {
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

    function _loadParticipantsList(ParticipantStorageService) {
      return ParticipantStorageService.getCollection().data;
    }

    _loadParticipantRegistration.$inject = [
      'otusjs.deploy.ProjectConfigurationRestService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

    function _loadParticipantRegistration(ProjectConfiguration, SessionContextService, Application) {
      return Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            return ProjectConfiguration.getProjectConfiguration()
              .then(function(response) {
                var _permission = response.data.participantRegistration;
                return _permission;
              });
          } catch (e) {
            console.error(e);
          }
        });
    }

    _loadParticipantsList.$inject = [
      'otusjs.participant.storage.ParticipantStorageService'
    ];
  }
}());
