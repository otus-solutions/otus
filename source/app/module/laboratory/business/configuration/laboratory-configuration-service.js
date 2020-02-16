(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.configuration')
    .service('otusjs.laboratory.business.configuration.LaboratoryConfigurationService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.repository.LaboratoryRepositoryService',
    'otusjs.laboratory.configuration.LaboratoryConfigurationService'
  ];

  function Service($q, LaboratoryRepositoryService, LaboratoryConfigurationService) {
    var self = this;
    /* Public methods */
    self.getCheckingExist = getCheckingExist;
    self.getLaboratoryDescriptors = getLaboratoryDescriptors;
    self.fetchAliquotsDescriptors = fetchAliquotsDescriptors;
    self.getQualityControlGroupNames = getQualityControlGroupNames;

    /* Laboratory Configuration */

    function getCheckingExist() {
      var defer = $q.defer();
      LaboratoryRepositoryService.getCheckingExist().then(function (response) {
        defer.resolve(response.data);
      }, function (e) {
        defer.resolve(false);
      });

      return defer.promise;
    }

    function getLaboratoryDescriptors() {
      var defer = $q.defer();
      var labConfigInitialized = LaboratoryConfigurationService.checkLaboratoryConfiguration();

      if (labConfigInitialized) {
        defer.resolve(labConfigInitialized);
      } else {
        _fetchLaboratoryConfiguration()
          .then(function (laboratoryConfiguration) {
            LaboratoryConfigurationService.initializeLaboratoryConfiguration(laboratoryConfiguration);
            defer.resolve(LaboratoryConfigurationService.checkLaboratoryConfiguration());
          });
      }
      return defer.promise;
    }

    function getQualityControlGroupNames() {
      var defer = $q.defer();

      LaboratoryRepositoryService.getLaboratoryDescriptors()
        .then(function (response) {
          let names = [];
          response.data.collectGroupConfiguration.groupDescriptors.forEach(function (descriptor) {
            if (descriptor.type === "QUALITY_CONTROL"){
              names.push(descriptor.name)
            }
          });
          defer.resolve(names);
        }, function (e) {
          defer.reject(e);
        });

      return defer.promise;
    }

    function _fetchLaboratoryConfiguration() {
      var defer = $q.defer();
      LaboratoryRepositoryService.getLaboratoryDescriptors()
        .then(function (response) {
          defer.resolve(response.data);
        }, function (e) {
          defer.reject(e);
        });

      return defer.promise;
    }

    /* Aliquots Descriptors */

    function fetchAliquotsDescriptors() {
      var defer = $q.defer();
      var aliquotsInitialized = LaboratoryConfigurationService.checkAliquotsDescriptors();

      if (aliquotsInitialized) {
        defer.resolve(aliquotsInitialized);
      } else {
        _fetchAliquotsDescriptors()
          .then(function (aliquotsDescriptors) {
            LaboratoryConfigurationService.initializeAliquotsDescriptors(aliquotsDescriptors);
            defer.resolve(LaboratoryConfigurationService.checkAliquotsDescriptors());
          });
      }
      return defer.promise;
    }

    function _fetchAliquotsDescriptors() {
      var defer = $q.defer();
      LaboratoryRepositoryService.getAliquotsDescriptors() // TODO: implement
        .then(function (response) {
          defer.resolve(response.data);
        }, function (e) {
          defer.reject(e);
        });

      return defer.promise;
    }
  }

}());
