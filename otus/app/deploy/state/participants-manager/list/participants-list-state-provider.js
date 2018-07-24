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

    function _redirect($q, SessionContextService, DashboardContextService, ParticipantContextService, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            DashboardContextService.isValid();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    function _loadParticipantsList(ParticipantStorageService) {
      return ParticipantStorageService.getCollection().data;
    }

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

    _loadParticipantRegistration.$inject = [
      'otusjs.deploy.ProjectConfigurationRestService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

    _redirect.$inject = [
      '$q',
      'otusjs.application.session.core.ContextService',
      'otusjs.otus.dashboard.core.ContextService',
      'otusjs.participant.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _loadParticipantsList.$inject = [
      'otusjs.participant.storage.ParticipantStorageService'
    ];
  }
}());
