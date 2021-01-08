(function () {
  'use strict';

  angular
    .module('otusjs.participant.core')
    .service('otusjs.participant.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.participant.core.ContextService',
    'otusjs.participant.core.EventService'
  ];

  function Service($q, ContextService, EventService) {
    var self = this;
    let _genericParticipantContactStorageDefer = $q.defer();
    let _genericParticipantContactAttemptStorageDefer = $q.defer();
    let _remoteStorage = {};

    self.DataSource = {};
    self.Event = EventService;

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureParticipantDataSourceService = configureParticipantDataSourceService;
    self.configureRemoteStorage = configureRemoteStorage;
    self.configureAttemptRemoteStorage = configureAttemptRemoteStorage;
    self.getParticipantContactRemoteStorage = getParticipantContactRemoteStorage;
    self.getParticipantContactAttemptRemoteStorage = getParticipantContactAttemptRemoteStorage;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function configureParticipantDataSourceService(dataSource) {
      self.DataSource.Participant = dataSource;
    }

    function configureRemoteStorage(restService) {
      _remoteStorage.genericContact = restService;
      _genericParticipantContactStorageDefer.resolve(_remoteStorage.genericContact);
    }

    function configureAttemptRemoteStorage(restService) {
      _remoteStorage.contactAttempt = restService;
      _genericParticipantContactStorageDefer.resolve(_remoteStorage.contactAttempt);
    }

    function getParticipantContactRemoteStorage() {
      if (_remoteStorage.genericContact) {
        _genericParticipantContactStorageDefer = $q.defer();
        _genericParticipantContactStorageDefer.resolve(_remoteStorage.genericContact);
      }

      return {
        whenReady() {
          return _genericParticipantContactStorageDefer.promise;
        }
      }
    }

    function getParticipantContactAttemptRemoteStorage() {
      if (_remoteStorage.contactAttempt) {
        _genericParticipantContactAttemptStorageDefer = $q.defer();
        _genericParticipantContactAttemptStorageDefer.resolve(_remoteStorage.contactAttempt);
      }

      return {
        whenReady() {
          return _genericParticipantContactAttemptStorageDefer.promise;
        }
      }
    }
  }
}());
