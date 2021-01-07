/**
 * LaboratoryRestService
 * @namespace Services
 */
(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.LaboratoryRemoteStorageService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.LaboratoryRestService',
    'otusjs.deploy.SampleTransportRestService'
  ];

  /**
   * LaboratoryRemoteStorageService creates a communication between the application and
   * LaboratoryRestService. Thus, layers above this service doesn't really know from
   * where the storage is coming, considering that a remote storage not necessarily
   * is accessed through a REST service. The interface of this service has the
   * intent of represents to the client code that it is an collection like an
   * MongoDB or IndexDB collection. If new storage sources are created, this service
   * should wrap it.
   * @see {LaboratoryRestService}
   * @namespace LaboratoryRemoteStorage
   * @memberof Services
   */
  function Service($q, LaboratoryRestService, SampleTransportRestService) {
    var self = this;

    /* Public methods */
    self.insert = insert;
    self.initializeLaboratory = initializeLaboratory;
    self.getLaboratory = getLaboratory;
    self.getLaboratoryByTube = getLaboratoryByTube;
    self.update = update;
    self.updateAliquots = updateAliquots;
    self.deleteAliquot = deleteAliquot;
    self.convertStorageAliquot = convertStorageAliquot;
    self.updateTubeCollectionData = updateTubeCollectionData;
    self.updateTubeCustomMetadata = updateTubeCustomMetadata;

    /* Laboratory Configuration Methods */
    self.getDescriptors = getDescriptors;
    self.getAliquotDescriptors = getAliquotDescriptors;
    self.getCheckingExist = getCheckingExist;
    self.checkLaboratoryConfiguration = checkLaboratoryConfiguration;
    self.getTubeMedataDataByType = getTubeMedataDataByType;

    /* Laboratory Project Methods */
    self.getAliquots = getAliquots;
    self.getLots = getLots;
    self.getTube = getTube;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;

    /* Unattached Laboratory Methods */
    self.attacheLaboratory = attacheLaboratory;
    self.listUnattached = listUnattached;
    self.createUnattached = createUnattached;
    self.getUnattachedById = getUnattachedById;
    self.discardUnattached = discardUnattached;
    self.getUnattachedByIdentification = getUnattachedByIdentification;

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
      LaboratoryRestService.create();
      SampleTransportRestService.create();

      return deferred.promise;
    }

    /**
     * initialize laboratories.
     * @param {(object)} recruitmentNumber - the recruitment number of participant
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function initializeLaboratory(recruitmentNumber) {
      var deferred = $q.defer();
      LaboratoryRestService
        .initializeLaboratory(recruitmentNumber)
        .then(function (response) {
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
      LaboratoryRestService
        .getLaboratory(recruitmentNumber)
        .then(function (response) {
          deferred.resolve(response.data);
        });

      return deferred.promise;
    }

    function getLaboratoryByTube(tubeCode) {
      var deferred = $q.defer();

      LaboratoryRestService
        .getLaboratoryByTube(tubeCode)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (e) {
          deferred.reject(e);
        })

      return deferred.promise;
    }

    /**
     * initialize laboratories.
     * @param {(object)} recruitmentNumber - the recruitment number of participant
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function update(recruitmentNumber, participantLaboratory) {
      var deferred = $q.defer();
      LaboratoryRestService
        .updateLaboratoryParticipant(recruitmentNumber, participantLaboratory)
        .then(function (response) {
          deferred.resolve(response);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    /**
     * Update Collection Data of changed tubes
     * @param {(object)} recruitmentNumber - the recruitment number of participant
     * @param {(object)} updateStructure - the list of changed tubes to be updated
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function updateTubeCollectionData(recruitmentNumber, updateStructure) {
      var deferred = $q.defer();
      LaboratoryRestService
        .updateTubeCollectionData(recruitmentNumber, updateStructure)
        .then(function (response) {
          deferred.resolve(response);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function updateTubeCustomMetadata(tube){
      var deferred = $q.defer();
      LaboratoryRestService.updateTubeCustomMetadata(tube)
        .then(function (response) {
          deferred.resolve(response);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    /**
     * initialize laboratories.
     * @param {(object)} persistanceStructure - the recruitment number of participant and a persistanceStructure
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function updateAliquots(recruitmentNumber, persistanceStructure) {
      var deferred = $q.defer();
      LaboratoryRestService
        .updateAliquots(recruitmentNumber, persistanceStructure)
        .then(function (response) {
          deferred.resolve(response);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function convertStorageAliquot(aliquot) {
      var deferred = $q.defer();
      LaboratoryRestService
        .convertStorageAliquot(aliquot)
        .then(function (response) {
          deferred.resolve(response);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function deleteAliquot(aliquotCode) {
      var deferred = $q.defer();
      LaboratoryRestService
        .deleteAliquot(aliquotCode)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function getDescriptors() {
      var deferred = $q.defer();
      LaboratoryRestService
        .getDescriptors()
        .then(function (response) {
          deferred.resolve(response);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function getAliquotDescriptors() {
      var deferred = $q.defer();
      LaboratoryRestService
        .getAliquotDescriptors()
        .then(function (response) {
          deferred.resolve(response);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    /**
     * Laboratory Configuration
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function getCheckingExist() {
      var deferred = $q.defer();
      LaboratoryRestService.getCheckingExist()
        .then(function (response) {
          deferred.resolve(response);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function checkLaboratoryConfiguration(){
      var deferred = $q.defer();
      LaboratoryRestService.getCheckingExist()
        .then(function (response) {
          if(response.data){
            deferred.resolve(true);
          }
          else{
            deferred.reject(false);
          }
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function getTubeMedataDataByType(tubeType) {
      var deferred = $q.defer();
      LaboratoryRestService.getTubeMedataDataByType(tubeType)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    /**
     * Transport Lot
     * @param {(object)} lotAliquot - the structure for query
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function getAliquots(lotAliquot, unique) {
      var deferred = $q.defer();
      SampleTransportRestService
        .getAliquots(lotAliquot, unique)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });

      return deferred.promise;
    }

    /**
     * Transport Lot
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function getLots(locationPointId) {
      var deferred = $q.defer();

      SampleTransportRestService
        .getLots(locationPointId)
        .then(function (response) {
          deferred.resolve(response.data);
        });

      return deferred.promise;
    }


    /**
     * Transport Lot
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function getTube(locationPointId, tubeCode) {
      var deferred = $q.defer();

      SampleTransportRestService
        .getTube(locationPointId, tubeCode)
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (err) {
          deferred.reject(err);
        });


      return deferred.promise;
    }

    /**
     * Transport Lot
     * @param {(object)} lotStructure - the structure of lof
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function createLot(lotStructure) {
      var deferred = $q.defer();
      SampleTransportRestService
        .createLot(lotStructure)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    /**
     * Transport Lot
     * @param {(object)} lotStructure - the structure of lof
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function updateLot(lotStructure) {
      var deferred = $q.defer();
      SampleTransportRestService
        .updateLot(lotStructure)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    /**
     * Transport Lot
     * @param {(object)} lotCode - the code of lot
     * @returns {Promise} promise
     * @memberof LaboratoryRemoteStorageService
     */
    function deleteLot(lotCode) {
      var deferred = $q.defer();
      SampleTransportRestService
        .deleteLot(lotCode)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function createUnattached(fieldCenterAcronym, collectGroupName) {
      var deferred = $q.defer();
      LaboratoryRestService
        .initializeUnattached(fieldCenterAcronym, collectGroupName)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function attacheLaboratory(recruitmentNumber, laboratoryIdentification) {
      var deferred = $q.defer();
      LaboratoryRestService
        .attacheLaboratory(recruitmentNumber, laboratoryIdentification)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function listUnattached(collectGroupName, center, page, quantity) {
      var deferred = $q.defer();
      LaboratoryRestService
        .listUnattached(collectGroupName, center, page, quantity)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function getUnattachedById(laboratoryOid) {
      var deferred = $q.defer();
      LaboratoryRestService
        .getUnattachedById(laboratoryOid)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function discardUnattached(laboratoryOid) {
      var deferred = $q.defer();
      LaboratoryRestService
        .discardUnattached(laboratoryOid)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    function getUnattachedByIdentification(laboratoryIdentification) {
      var deferred = $q.defer();
      LaboratoryRestService
        .getUnattachedByIdentification(laboratoryIdentification)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

  }
}());
