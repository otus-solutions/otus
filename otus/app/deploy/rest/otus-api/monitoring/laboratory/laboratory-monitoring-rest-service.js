(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.LaboratoryMonitoringRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getDataOfPendingResultsByAliquots = getDataOfPendingResultsByAliquots;
    self.getDataQuantitativeByTypeOfAliquots = getDataQuantitativeByTypeOfAliquots;
    self.getDataOrphanByExams = getDataOrphanByExams;
    self.getDataOfStorageByAliquots = getDataOfStorageByAliquots;
    self.getDataOfResultsByExam = getDataOfResultsByExam;

    function initialize() {
      _rest = OtusRestResourceService.getOtusLaboratoryMonitoringResource();
    }

    function getDataOfPendingResultsByAliquots() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getDataOfPendingResultsByAliquots().$promise;
    }

    function getDataQuantitativeByTypeOfAliquots() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getDataQuantitativeByTypeOfAliquots().$promise;
    }

    function getDataOrphanByExams() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getDataOrphanByExams().$promise;
    }

    function getDataOfStorageByAliquots() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getDataOfStorageByAliquots().$promise;
    }

    function getDataOfResultsByExam() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getDataOfResultsByExam().$promise;
    }
  }
}());
