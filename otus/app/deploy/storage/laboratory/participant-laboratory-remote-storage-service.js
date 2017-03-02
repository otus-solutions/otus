/**
 * ParticipantLaboratoryRestService
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantLaboratoryRemoteStorageService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.ParticipantLaboratoryRestService'
  ];

  /**
   * ParticipantLaboratoryRemoteStorageService creates a communication between the application and
   * ParticipantLaboratoryRestService. Thus, layers above this service doesn't really know from
   * where the storage is coming, considering that a remote storage not necessarily
   * is accessed through a REST service. The interface of this service has the
   * intent of represents to the client code that it is an collection like an
   * MongoDB or IndexDB collection. If new storage sources are created, this service
   * should wrap it.
   * @see {ParticipantLaboratoryRestService}
   * @namespace ParticipantLaboratoryRemoteStorage
   * @memberof Services
   */
  function Service($q, ParticipantLaboratoryRestService) {
    var self = this;

    /* Public methods */
    self.insert = insert;
    self.createLaboratoryEmpty = createLaboratoryEmpty;
    self.createLaboratory = createLaboratory;
    self.getLaboratory = getLaboratory;

    /**
     * Adds laboratories to collection.
     * @param {(object)} laboratory - the laboratory to be updated
     * @returns {Promise} promise with laboratory or laboratories inserted with the _id
     * value inserted
     * when resolved
     * @memberof LaboratoryRemoteStorageService
     */
    function insert(laboratoryToInsert) {
      var deferred = $q.defer();

      //TODO Enviar dados para backend (REST)
      ParticipantLaboratoryRestService.create();

      return deferred.promise;
    }

    /**
     * create laboratories.
     * @param {(object)} recruitmentNumber - the recruitment number of participant
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function createLaboratory(recruitmentNumber) {
      var deferred = $q.defer();

      ParticipantLaboratoryRestService
        .createLaboratory(recruitmentNumber)
        .then(function(response) {
          deferred.resolve(response.data);
        });

      return deferred.promise;
    }

    /**
     * create laboratories empty.
     * @param {(object)} recruitmentNumber - the recruitment number of participant
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function createLaboratoryEmpty(recruitmentNumber) {
      var deferred = $q.defer();

      ParticipantLaboratoryRestService
        .createLaboratoryEmpty(recruitmentNumber)
        .then(function(response) {
          deferred.resolve(response.data);
        });

      return deferred.promise;
    }

    /**
     * verifaul .
     * @param {(object)} recruitmentNumber - the recruitment number of participant
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function getLaboratory(recruitmentNumber) {
      var deferred = $q.defer();

      ParticipantLaboratoryRestService
        .getLaboratory(recruitmentNumber)
        .then(function(response) {
          deferred.resolve(response.data);
        });

      return deferred.promise;
    }
  }
}());
