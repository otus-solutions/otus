(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.transportation')
    .service('otusjs.laboratory.business.project.transportation.AliquotTransportationService', service);

  service.$inject = [
    'otusjs.laboratory.transportation.TransportationService',
    'otusjs.laboratory.business.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.repository.LaboratoryRepositoryService',
    '$http',
    '$q'
  ];

  function service(TransportationService, LaboratoryConfigurationService, LaboratoryRepositoryService, $http, $q) {
    var self = this;

    self.getFullAliquotsList = getFullAliquotsList;
    self.loadLots = loadLots;
    self.createAliquotLot = createAliquotLot;
    self.loadAliquotLotFromJson = loadAliquotLotFromJson;

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getAliquotsByCenter = getAliquotsByCenter;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    //TODO: Remove this method
    self.getFullAliquotsList = getAliquots;
    //self.getFullAliquotsList = self.getFullAliquotsList;

    onInit();

    function onInit() {
      LaboratoryConfigurationService.getAliquotsDescriptors()
        .then(function() {
          loadLots()
            .then(function(response) {
              // console.log(response);
            });
        });
    }

    function _fetchAliquotsDescriptors() {

    }

    function loadLots() {
      //this returns the already created lots
      var defer = $q.defer();
      $http.get('app/module/laboratory/repository/laboratory/single-lot.json')
        .then(function(response) {
          //assume response.data as array
          if (response.data) {
            // console.log(response);
            var lots = response.data.map(function(lotJson) {
              return TransportationService.buildAliquotLotFromJson(lotJson);
            });
            defer.resolve(lots);
          }
        });
      return defer.promise;
    }

    function getFullAliquotsList() {
      //this returns the full aliquots list to check for conflicts when creating a new lot
      return $http.get('app/module/laboratory/repository/laboratory/aliquot-list.json');
    }

    function createAliquotLot() {
      return TransportationService.createAliquotLot();
    }

    function loadAliquotLotFromJson(lotJSON) {
      return TransportationService.buildAliquotLotFromJson(lotJSON);
    }

    function createLot(lotStructure) {
      return LaboratoryCollectionService.createLot(lotStructure);
    }

    function getAliquots() {
      var deferred = $q.defer();

      LaboratoryRepositoryService.getAliquots()
        .then(function(response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function(err) {
          deferred.reject(err);
        });
      
      return deferred.promise;
    }

    function getAliquotsByCenter(center) {
      var deferred = $q.defer();

      LaboratoryRepositoryService.getAliquotsByCenter(center)
        .then(function(response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function(err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getLots() {
      var deferred = $q.defer();

      LaboratoryRepositoryService.getLots()
        .then(function(response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function(err) {
          deferred.reject(err);
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
