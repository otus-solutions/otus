(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.core')
    .service('otusjs.laboratory.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.core.EventService'
  ];

  //TODO
  function Service($q, ContextService, EventService) {
    var self = this;
    var _participantLaboratoryRemoteStorageDefer = $q.defer();
    var _surveyDataSourceDefer = $q.defer();

    self.RemoteStorage = {};
    self.DataSource = {};
    self.Event = EventService;

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.getParticipantLaboratoryRemoteStorage = getParticipantLaboratoryRemoteStorage;
    self.setParticipantLaboratoryRemoteStorage = setParticipantLaboratoryRemoteStorage;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function getParticipantLaboratoryRemoteStorage() {
      if (self.RemoteStorage.ParticipantLaboratory) {
        _participantLaboratoryRemoteStorageDefer = $q.defer();
        _participantLaboratoryRemoteStorageDefer.resolve(self.RemoteStorage.ParticipantLaboratory);
      }
      return {
        whenReady: function() {
          return _participantLaboratoryRemoteStorageDefer.promise;
        }
      };
    }

    function setParticipantLaboratoryRemoteStorage(storage) {
      self.RemoteStorage.ParticipantLaboratory = storage;
      _participantLaboratoryRemoteStorageDefer.resolve(self.RemoteStorage.ParticipantLaboratory);
    }

  }
}());
