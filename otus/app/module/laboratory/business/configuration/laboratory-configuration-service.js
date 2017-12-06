(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.configuration')
    .service('otusjs.laboratory.business.configuration.LaboratoryConfigurationService', Service);

  Service.$inject = [
     'otusjs.laboratory.configuration.LaboratoryConfigurationService',
     'otusjs.laboratory.repository.LaboratoryRepositoryService',
    '$q',
  ];

  function Service(LaboratoryConfigurationService, LaboratoryRepositoryService, $q) {
    var self = this;

    self.getLaboratoryDescriptors = getLaboratoryDescriptors;
    self.fetchAliquotsDescriptors = fetchAliquotsDescriptors;

    onInit();

    function onInit() {
      // LaboratoryConfigurationService.reset(); // TODO: CHECK IF NEEDED
    }


    /*Laboratory Descriptors*/
    //takes nothing, returns promise
    function getLaboratoryDescriptors() {
      var defer = $q.defer();
      var labConfigInitialized = LaboratoryConfigurationService.checkLaboratoryConfiguration();

      if (labConfigInitialized) {
        defer.resolve(labConfigInitialized);
      } else {
        _fetchLaboratoryConfiguration()
          .then(function(laboratoryConfiguration) {
            LaboratoryConfigurationService.initializeLaboratoryConfiguration(laboratoryConfiguration);
            defer.resolve(LaboratoryConfigurationService.checkLaboratoryConfiguration());
          });
      }
      return defer.promise;
    }

    function _fetchLaboratoryConfiguration() {
      var defer = $q.defer();
      LaboratoryRepositoryService.getLaboratoryDescriptors()
        .then(function(response) {
          defer.resolve(response.data);
        }, function(e) {
          defer.reject(e);
        });

      return defer.promise;
    }

    /*Aliquots Descriptors*/
    function fetchAliquotsDescriptors() {
      // console.log(_fetchAliquotsDescriptors());
      var defer = $q.defer();
      var aliquotsInitialized = LaboratoryConfigurationService.checkAliquotsDescriptors();

      if (aliquotsInitialized) {
        defer.resolve(aliquotsInitialized);
      } else {
        _fetchAliquotsDescriptors()
          .then(function(aliquotsDescriptors) {
            LaboratoryConfigurationService.initializeAliquotsDescriptors(aliquotsDescriptors);
            defer.resolve(LaboratoryConfigurationService.checkAliquotsDescriptors());
          });
      }
      return defer.promise;
    }

    function _fetchAliquotsDescriptors() {
      var defer = $q.defer();
      LaboratoryRepositoryService.getAliquotsDescriptors() // TODO: implement
        .then(function(response) {
          defer.resolve(response.data);
        }, function(e) {
          defer.reject(e);
        });

      return defer.promise;
    }
  }

}());
