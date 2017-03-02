/**
 * LaboratoryCollectionService
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.repository')
    .service('otusjs.laboratory.repository.ParticipantLaboratoryCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.core.ModuleService',
    'otusjs.laboratory.storage.ParticipantLaboratoryLocalStorageService'
  ];

  /**
   * LaboratoryCollectionService represents to application the activity collection. It abstracts to
   * other layers the storage implementation. Currently, are two storages wrapped in this service: a
   * remote storage and a local storage. Basically the oprations workflow is try to send/retrieve data
   * from remote storage and after the same operation is done into local storage.
   * @namespace LaboratoryCollectionService
   * @memberof Services
   */
  function Service($q, ModuleService, ParticipantLaboratoryLocalStorageService) {
    var self = this;
    var _remoteStorage = ModuleService.getParticipantLaboratoryRemoteStorage();
    var _participant = null;

    /* Public methods */
    self.useParticipant = useParticipant;
    self.resetParticipantInUse = resetParticipantInUse;
    self.insert = insert;
    self.listAll = listAll;
    self.createLaboratory = createLaboratory;
    self.createLaboratoryEmpty = createLaboratoryEmpty;
    self.update = update;
    self.getLaboratory = getLaboratory;

    /**
     * Configures collection to use a participant as reference on "ready-queries". Ready-queries are
     * all methods of this service that deal with data and don't need parameters to operator over
     * data set.
     * @param {(object)} participant - the participant to be used as reference
     * @memberof LaboratoryCollectionService
     */
    function useParticipant(participant) {
      _participant = participant;
    }

    /**
     * Reset the participant reference that should be used by collection.
     * @see {@link | useParticipant}
     * @memberof LaboratoryCollectionService
     */
    function resetParticipantInUse() {
      _participant = null;
    }

    /**
     * Adds laboratory to collection.
     * @param {(object)} laboratory - the activity to be inserted
     * @returns {Promise} promise with laboratory inserted when resolved
     * @memberof LaboratoryCollectionService
     */
    function insert(laboratory) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .insert(laboratory)
            .then(function(remoteLaboratory) {
              var localLaboratory = ParticipantLaboratoryLocalStorageService.insert(remoteLaboratory);
              request.resolve(localLaboratory);
            });
        });

      return request.promise;
    }

    /**
     * Updates laboratory in collection.
     * @param {(object)} laboratory - the laboratory to be updated
     * @memberof LaboratoryCollectionService
     */
    function update(laboratory) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .update(laboratory)
            .then(function(remoteLaboratory) {
              ParticipantLaboratoryLocalStorageService.update(remoteLaboratory);
              request.resolve();
            });
        });

      return request.promise;
    }

    /**
     * Fetches laboratory from collection based on participant passed to {@link | useParticipant}
     * method.
     * @param {(object)} laboratory - the laboratory to be updated
     * @returns {Promise} promise with activity or laboratory found
     * @memberof LaboratoryCollectionService
     */
    function listAll() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .find({
              recruitmentNumber: _participant.recruitmentNumber
            })
            .then(function(laboratory) {
              ParticipantLaboratoryLocalStorageService.clear();
              var localData = ParticipantLaboratoryLocalStorageService.insert(laboratory);
              request.resolve(localData);
            });
        });

      return request.promise;
    }

    function createLaboratory() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .createLaboratory(_participant.recruitmentNumber)
            .then(function(laboratory) {
              ParticipantLaboratoryLocalStorageService.clear();
              var localData = ParticipantLaboratoryLocalStorageService.insert(laboratory);
              request.resolve(localData);
            });
        });

      return request.promise;
    }

    function createLaboratoryEmpty() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .createLaboratoryEmpty(_participant.recruitmentNumber)
            .then(function(laboratory) {
              ParticipantLaboratoryLocalStorageService.clear();
              var localData = ParticipantLaboratoryLocalStorageService.insert(laboratory);
              request.resolve(localData);
            });
        });

      return request.promise;
    }

    function getLaboratory() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .getLaboratory(_participant.recruitmentNumber)
            .then(function(laboratory) {
              request.resolve(laboratory);
            });
        });

      return request.promise;
    }
  }
}());
