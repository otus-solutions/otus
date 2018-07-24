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
      template: '<otus-participants-list layout="column" participants-list="$resolve.participants" flex></otus-participants-list>',
      data: {
        redirect: _redirect
      },
      resolve: {
        participants: _loadParticipantsContext
      }
    };

    function _redirect($q, DashboardContextService, ParticipantContextService, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            DashboardContextService.isValid();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    function _loadParticipantsContext(ParticipantStorageService, SessionContextService, Application) {

      return Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            var _participants = ParticipantStorageService.getCollection().data;
            return _participants;
          } catch (e) {
            console.log(e);
          }
        });
    }

    _redirect.$inject = [
      '$q',
      'otusjs.otus.dashboard.core.ContextService',
      'otusjs.participant.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _loadParticipantsContext.$inject = [
      'otusjs.participant.storage.ParticipantStorageService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
