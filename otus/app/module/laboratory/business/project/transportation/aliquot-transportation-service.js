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

    onInit();

    function onInit() {
      createLot(false);
      LaboratoryConfigurationService.getAliquotsDescriptors()
        .then(function() {
          loadLots()
            .then(function(response) {
              console.log(response);
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
            console.log(response);
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

    function createLot(forceResult) {
      LaboratoryRepositoryService.createLot({}, forceResult)
        .then(function(response) {
          console.log(response.data);
        }, function(err) {
          console.log(err.data);
        });
    }

    return self;
  }
}());
