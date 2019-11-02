(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.transportation')
    .service(
      'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
      service);

  service.$inject = [
    '$q',
    'otusjs.laboratory.transportation.TransportationService',
    'otusjs.laboratory.business.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.repository.LaboratoryRepositoryService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function service($q, TransportationService, LaboratoryConfigurationService,
                   LaboratoryRepositoryService, LoadingScreenService) {
    var self = this;

    self.createAliquotLot = createAliquotLot;
    self.loadAliquotLotFromJson = loadAliquotLotFromJson;

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    self.getContainerLabelToAliquot = getContainerLabelToAliquot;

    var messageLoading =
      'Por favor aguarde o carregamento das alíquotas.<br> Esse processo pode demorar um pouco...';

    function getContainerLabelToAliquot(aliquot) {
      return aliquot.container.toUpperCase() === "CRYOTUBE" ? "Criotubo" :
        "Palheta";
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

    function getLots() {
      var deferred = $q.defer();

      LaboratoryConfigurationService.fetchAliquotsDescriptors()
        .then(function() {
          LaboratoryRepositoryService.getLots()
            .then(function(response) {
              var lots = JSON.parse(response).map(function(lotJson) {
                return TransportationService.buildAliquotLotFromJson(
                  lotJson);
              });

              deferred.resolve(lots);
            })
            .catch(function(err) {
              deferred.reject(err);
            });
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