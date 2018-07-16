/**
 * LaboratoryCollectionService
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.repository')
    .service('otusjs.laboratory.repository.LaboratoryCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.core.ModuleService',
    'otusjs.laboratory.storage.LaboratoryLocalStorageService'
  ];

  /**
   * LaboratoryCollectionService represents to application the activity collection. It abstracts to
   * other layers the storage implementation. Currently, are two storages wrapped in this service: a
   * remote storage and a local storage. Basically the oprations workflow is try to send/retrieve data
   * from remote storage and after the same operation is done into local storage.
   * @namespace LaboratoryCollectionService
   * @memberof Services
   */
  function Service($q, ModuleService, LaboratoryLocalStorageService) {
    var self = this;
    var _remoteStorage = ModuleService.getLaboratoryRemoteStorage();
    var _participant = null;

    /* Public methods */
    self.useParticipant = useParticipant;
    self.resetParticipantInUse = resetParticipantInUse;
    self.insert = insert;
    self.listAll = listAll;
    self.initializeLaboratory = initializeLaboratory;
    self.update = update;
    self.updateTubeCollectionData = updateTubeCollectionData;
    self.updateAliquots = updateAliquots;
    self.getLaboratory = getLaboratory;
    self.getDescriptors = getDescriptors;
    self.getAliquotDescriptors = getAliquotDescriptors;

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;

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
              var localLaboratory = LaboratoryLocalStorageService.insert(remoteLaboratory);
              request.resolve(localLaboratory);
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
              LaboratoryLocalStorageService.clear();
              var localData = LaboratoryLocalStorageService.insert(laboratory);
              request.resolve(localData);
            });
        });

      return request.promise;
    }

    function initializeLaboratory() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .initializeLaboratory(_participant.recruitmentNumber)
            .then(function(laboratory) {
              request.resolve(laboratory);
            });
        });

      return request.promise;
    }

    /**
     * Update laboratory in collection.
     * @param {(object)} laboratory - the laboratory to be updated
     * @memberof LaboratoryCollectionService
     */
    function update(laboratory) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .update(_participant.recruitmentNumber, laboratory)
            .then(function(remoteLaboratory) {
              request.resolve();
            }, function(e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    /**
     * Update Collection Data of changed tubes
     * @param {(object)} updateStructure - the list of changed tubes to be updated
     * @memberof LaboratoryCollectionService
     */
    function updateTubeCollectionData(updateStructure) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .updateTubeCollectionData(_participant.recruitmentNumber, updateStructure)
            .then(function(remoteLaboratory) {
              request.resolve();
            }, function(e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    /**
     * Updates the aliquots list in the participant laboratory.
     * @param {(object)} persistanceStructure - an array of tubes with an array of aliquots
     * @memberof LaboratoryCollectionService
     */
    function updateAliquots(updateStructure) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .updateAliquots(_participant.recruitmentNumber, updateStructure)
            .then(function(data) {
              request.resolve();
            }, function(e) {
              request.reject(e);
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

    function getDescriptors() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .getDescriptors()
            .then(function(descriptors) {
              request.resolve(descriptors);
            });
        });

      return request.promise;
    }

    function getAliquotDescriptors() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .getAliquotDescriptors()
            .then(function(descriptors) {
              request.resolve(descriptors);
            });
        });

      return request.promise;
    }

    /**
     * Create the transport lot.
     * @param {(object)} lotAliquot - structure of aliquot lot query
     * @memberof LaboratoryCollectionService
     */
    function getAliquots(lotAliquot, unique) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .getAliquots(lotAliquot, unique)
            .then(function(aliquots) {
              request.resolve(aliquots);
            }).catch(function(err) {
              request.reject(err);
            });
        });

      return request.promise;
    }

    function getLots() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .getLots()
            .then(function(lots) {
              request.resolve(lots);
            });
        });

      return request.promise;
    }

    /**
     * Create the transport lot.
     * @param {(object)} lotStructure - structure of transport lot
     * @memberof LaboratoryCollectionService
     */
    function createLot(lotStructure) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .createLot(lotStructure)
            .then(function(data) {
              request.resolve(data);
            })
            .catch(function(e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    /**
     * Update the transport lot.
     * @param {(object)} lotStructure - structure of transport lot
     * @memberof LaboratoryCollectionService
     */
    function updateLot(lotStructure) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .updateLot(lotStructure)
            .then(function(data) {
              request.resolve(data);
            })
            .catch(function(e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    /**
     * Delete the transport lot.
     * @param {(object)} lotCode - code of transport lot
     * @memberof LaboratoryCollectionService
     */
    function deleteLot(lotCode) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .deleteLot(lotCode)
            .then(function(data) {
              request.resolve(data);
            })
            .catch(function(e) {
              request.reject(e);
            });
        });

      return request.promise;
    }
  }
}());
