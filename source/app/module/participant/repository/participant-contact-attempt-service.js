(function () {
  'use strict';

  angular
    .module('otusjs.participant.repository')
    .service('otusjs.participant.repository.ParticipantContactAttemptService', Service);

  Service.$inject = [
    '$q',
    'otusjs.participant.repository.ParticipantContactAttemptRepositoryService',
    'otusjs.model.participant.ParticipantContactAttemptConfigurationFactory',
    'otusjs.model.participant.ParticipantContactAttemptFactory'
  ];

  function Service($q,
                   AttemptRepositoryService,
                   ParticipantContactAttemptConfigurationFactory,
                   ParticipantContactAttemptFactory) {
    var self = this;

    /* Public methods */
    self.create = create;
    self.findByRnByContactTypeByPosition = findByRnByContactTypeByPosition;
    self.deleteContactAttempt = deleteContactAttempt;
    self.findAttemptConfigurationByObjectType = findAttemptConfigurationByObjectType;

    function create(attempt) {
      var request = $q.defer();
      AttemptRepositoryService
        .create(attempt)
        .then(response => {
          request.resolve(response);
        }).catch(e => request.reject(e))
      return request.promise;
    }

    function deleteContactAttempt(id) {
      var request = $q.defer();
      AttemptRepositoryService
        .deleteContactAttempt(id)
        .then(response => {
          request.resolve(response);
        }).catch(e => request.reject(e))
      return request.promise;
    }

    function findByRnByContactTypeByPosition(rn, contactType, position) {
      var request = $q.defer();
      AttemptRepositoryService
        .findByRnByContactTypeByPosition(rn, contactType, position)
        .then(attempts => {
          const attemptObjects = [];
          for(let attempt of attempts) {
            attemptObjects.push(ParticipantContactAttemptFactory.fromJson(attempt));
          }
          request.resolve(attemptObjects);
        }).catch(e => request.reject(e))
      return request.promise;
    }

    function findAttemptConfigurationByObjectType(objectType) {
      var request = $q.defer();
      AttemptRepositoryService
        .findAttemptConfigurationByObjectType(objectType)
        .then(metadata => {
          const participantMetadata = ParticipantContactAttemptConfigurationFactory.fromJson(metadata);
          request.resolve(participantMetadata);
        }).catch(e => request.reject(e))
      return request.promise;
    }
  }
}());