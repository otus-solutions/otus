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
    self.getAliquotsByCenter = getAliquotsByCenter;
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

    function getAliquots() {
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      var deferred = $q.defer();

      LaboratoryRepositoryService.getAliquots()
        .then(function(response) {
          deferred.resolve(JSON.parse(response));
          LoadingScreenService.finish();
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
      console.log("listed");
    }

    function createLot(lotStructure) {
      console.log("created");
    }

    function updateLot(lotStructure) {
      console.log("updated");
    }

    function deleteLot(lotCode) {
      console.log("deleted");
    }

    return self;
  }
}());