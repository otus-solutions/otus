(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.transportation')
    .service('otusjs.laboratory.business.project.transportation.MaterialTransportationService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.transportation.TransportationService',
    'otusjs.laboratory.business.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.repository.LaboratoryRepositoryService'
  ];

  function Service($q, TransportationService, LaboratoryConfigurationService, LaboratoryRepositoryService) {
    var self = this;

    self.createAliquotLot = createAliquotLot;
    self.loadAliquotLotFromJson = loadAliquotLotFromJson;

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getLots = getLots;
    self.getLotsByOrigin = getLotsByOrigin;
    self.getLotsByDestination = getLotsByDestination;
    self.getTube = getTube;
    self.fetchConfiguration = fetchConfiguration;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    self.updateLotReceipt = updateLotReceipt;
    self.getContainerLabelToAliquot = getContainerLabelToAliquot;
    self.receiveMaterial = receiveMaterial;
    self.getMaterialMetadataOptions = getMaterialMetadataOptions;
    self.getMaterialTrackingList = getMaterialTrackingList;

    function getContainerLabelToAliquot(aliquot) {
      return aliquot.container.toUpperCase() === "CRYOTUBE" ? "Criotubo" : "Palheta";
    }

    function createAliquotLot() {
      return TransportationService.createAliquotLot();
    }

    function loadAliquotLotFromJson(lotJSON) {
      return TransportationService.buildAliquotLotFromJson(lotJSON);
    }

    function getAliquots(lotAliquot, unique) {
      var deferred = $q.defer();
      LaboratoryRepositoryService.getAliquots(lotAliquot, unique)
        .then(function(response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getTube(locationPointId, tubeCode) {
      var deferred = $q.defer();
      LaboratoryRepositoryService.getTube(locationPointId, tubeCode)
        .then(function(response) {
          deferred.resolve(response);
        })
        .catch(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getLots(originLocationPoint, destinationLocationPoint) {
      var deferred = $q.defer();

      LaboratoryConfigurationService.fetchAliquotsDescriptors()
        .then(function() {
          LaboratoryRepositoryService.getLots(originLocationPoint, destinationLocationPoint)
            .then(function(response) {
              var lots = JSON.parse(response).map(function(lotJson) {
                return TransportationService.buildAliquotLotFromJson(lotJson);
              });
              deferred.resolve(lots);
            })
            .catch(function(err) {
              deferred.reject(err);
            });
        });

      return deferred.promise;
    }

    function getLotsByOrigin(originLocationPoint) {
      var deferred = $q.defer();

      LaboratoryConfigurationService.fetchAliquotsDescriptors()
        .then(function () {
          LaboratoryRepositoryService.getLotsByOrigin(originLocationPoint)
            .then(function (response) {
              var lots = JSON.parse(response).map(function (lotJson) {
                return TransportationService.buildAliquotLotFromJson(lotJson);
              });
              deferred.resolve(lots);
            })
            .catch(function (err) {
              deferred.reject(err);
            });
        });

      return deferred.promise;
    }

    function getLotsByDestination(destinationLocationPoint) {
      var deferred = $q.defer();

      LaboratoryConfigurationService.fetchAliquotsDescriptors()
        .then(function () {
          LaboratoryRepositoryService.getLotsByDestination(destinationLocationPoint)
            .then(function (response) {
              var lots = JSON.parse(response).map(function (lotJson) {
                return TransportationService.buildAliquotLotFromJson(lotJson);
              });
              deferred.resolve(lots);
            })
            .catch(function (err) {
              deferred.reject(err);
            });
        });

      return deferred.promise;
    }

    function fetchConfiguration() {
      var deferred = $q.defer();

      LaboratoryConfigurationService.fetchAliquotsDescriptors()
        .then(function() {
          deferred.resolve(true);
        });

      return deferred.promise;
    }

    function createLot(lotStructure) {
      var deferred = $q.defer();

      LaboratoryRepositoryService.createLot(lotStructure)
        .then(function(response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function updateLot(lotStructure) {
      var deferred = $q.defer();

      LaboratoryRepositoryService.updateLot(lotStructure)
        .then(function(response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function updateLotReceipt(lotCode, lotReceipt) {
      var deferred = $q.defer();

      LaboratoryRepositoryService.updateLotReceipt(lotCode, lotReceipt)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function receiveMaterial(lotId, receiveMaterialStruct) {
      var deferred = $q.defer();

      LaboratoryRepositoryService.receiveMaterial(lotId, receiveMaterialStruct)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getMaterialMetadataOptions(materialType) {
      var deferred = $q.defer();

      LaboratoryRepositoryService.getMaterialMetadataOptions(materialType)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getMaterialTrackingList(materialCode) {
      var deferred = $q.defer();

      LaboratoryRepositoryService.getMaterialTrackingList(materialCode)
        .then(function (response) {
          deferred.resolve(response);
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }


    function deleteLot(lotCode) {
      var deferred = $q.defer();

      LaboratoryRepositoryService.deleteLot(lotCode)
        .then(function(response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    return self;
  }
}());
