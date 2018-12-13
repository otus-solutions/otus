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
    self.getDataByExam = getDataByExam;
    self.getDataToCSVOfPendingResultsByAliquots = getDataToCSVOfPendingResultsByAliquots;
    self.getDataToCSVOfOrphansByExam = getDataToCSVOfOrphansByExam;

    function initialize() {
      _rest = OtusRestResourceService.getOtusLaboratoryMonitoringResource();
    };

    function getDataOfPendingResultsByAliquots(center) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.getDataOfPendingResultsByAliquots({
        center: center
      }).$promise;
    };

    function getDataQuantitativeByTypeOfAliquots(center) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.getDataQuantitativeByTypeOfAliquots({
        center: center
      }).$promise;
    };

    function getDataOrphanByExams() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.getDataOrphanByExams().$promise;
    };

    function getDataOfStorageByAliquots(center) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.getDataOfStorageByAliquots({
        center: center
      }).$promise;
    };

    function getDataByExam(center) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.getDataByExam({
        center: center
      }).$promise;
    };

    function getDataToCSVOfPendingResultsByAliquots(center) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.getDataToCSVOfPendingResultsByAliquots({
        center: center
      }).$promise;
    };

    function getDataToCSVOfOrphansByExam() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getDataToCSVOfOrphansByExam().$promise;
    }

  }
}());
