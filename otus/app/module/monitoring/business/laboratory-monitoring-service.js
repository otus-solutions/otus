(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.LaboratoryMonitoringService', Service);

  Service.$inject = [
    '$q',
    'otusjs.monitoring.repository.MonitoringCollectionService'
  ];

  function Service($q, $filter, MonitoringCollectionService) {
    var self = this;

    self.getDataOfPendingResultsByAliquots = getDataOfPendingResultsByAliquots;
    self.getDataQuantitativeByTypeOfAliquots = getDataQuantitativeByTypeOfAliquots;
    self.getDataOrphanByExams = getDataOrphanByExams;
    self.getDataOfStorageByAliquots = getDataOfStorageByAliquots;
    self.getDataOfResultsByExam = getDataOfResultsByExam;

    function getDataOfPendingResultsByAliquots() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOfPendingResultsByAliquots().then(function (result) {
        defer.resolve(result);
      }).catch(function () {
        defer.reject()
      });
      return defer.promise;
    }

    function getDataQuantitativeByTypeOfAliquots() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots().then(function (result) {
        defer.resolve(result);
      }).catch(function () {
        defer.reject()
      });
      return defer.promise;
    }

    function getDataOrphanByExams() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOrphanByExams().then(function (result) {
        defer.resolve(result);
      }).catch(function () {
        defer.reject()
      });
      return defer.promise;
    }

    function getDataOfStorageByAliquots() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOfStorageByAliquots().then(function (result) {
        defer.resolve(result);
      }).catch(function () {
        defer.reject()
      });
      return defer.promise;
    }

    function getDataOfResultsByExam(center) {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOfResultsByExam().then(function (result) {
        defer.resolve(result);
      }).catch(function () {
        defer.reject()
      });
      return defer.promise;
    }
  }
}());
