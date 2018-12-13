(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.LaboratoryMonitoringService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.monitoring.repository.MonitoringCollectionService'
  ];

  function Service($q, LoadingScreenService, MonitoringCollectionService) {
    var self = this;
    /* Public methods */
    self.getDataOfPendingResultsByAliquots = getDataOfPendingResultsByAliquots;
    self.getDataQuantitativeByTypeOfAliquots = getDataQuantitativeByTypeOfAliquots;
    self.getDataOrphanByExams = getDataOrphanByExams;
    self.getDataOfStorageByAliquots = getDataOfStorageByAliquots;
    self.getDataByExam = getDataByExam;
    self.downloadCSVFileOfPendingResultsByAliquots = downloadCSVFileOfPendingResultsByAliquots;
    self.downloadCSVFileOfOrphansByExam = downloadCSVFileOfOrphansByExam;

    function getDataOfPendingResultsByAliquots(center) {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOfPendingResultsByAliquots(center).then(function (response) {
        defer.resolve(response);
      }).catch(function () {
        defer.reject()
      });

      return defer.promise;
    };

    function getDataQuantitativeByTypeOfAliquots(center) {
      var defer = $q.defer();
      MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots(center).then(function (response) {
        defer.resolve(response);
      }).catch(function () {
        defer.reject()
      });

      return defer.promise;
    };

    function getDataOrphanByExams() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOrphanByExams().then(function (response) {
        defer.resolve(response);
      }).catch(function () {
        defer.reject()
      });

      return defer.promise;
    };

    function getDataOfStorageByAliquots(center) {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOfStorageByAliquots(center).then(function (response) {
        defer.resolve(response);
      }).catch(function () {
        defer.reject()
      });

      return defer.promise;
    };

    function getDataByExam(center) {
      var defer = $q.defer();
      MonitoringCollectionService.getDataByExam(center).then(function (response) {
        defer.resolve(response);
      }).catch(function () {
        defer.reject()
      });

      return defer.promise;
    };

    function downloadCSVFileOfPendingResultsByAliquots(center) {
      var defer = $q.defer();
      LoadingScreenService.changeMessage("Por favor, aguarde! Estamos gerando o arquivo para download.");
      LoadingScreenService.start();
      MonitoringCollectionService.getDataToCSVOfPendingResultsByAliquots(center).then(function (response) {
        const style = {
          headers: true,
          column: { style: { Font: { Bold: "1" } } }
        };
        var name = "monitoramento-laboratorial-resultados-pendentes-".concat(new Date().toLocaleDateString());
        alasql('SELECT [aliquot] AS [Alíquotas], [transported] AS [Transportados], [prepared] AS [Preparadas] INTO CSV("' + name + '.csv") FROM ?', [style, response]);
      }).catch(function () {
        defer.reject()
      }).finally(function () {
        LoadingScreenService.finish();
      });
    };

    function downloadCSVFileOfOrphansByExam() {
      var defer = $q.defer();
      LoadingScreenService.changeMessage("Por favor, aguarde! Estamos gerando o arquivo para download.");
      LoadingScreenService.start();
      MonitoringCollectionService.getDataToCSVOfPendingResultsByAliquots().then(function (response) {
        const style = {
          headers: true,
          column: { style: { Font: { Bold: "1" } } }
        };
        var name = "monitoramento-laboratorial-exame-orfaos-".concat(new Date().toLocaleDateString());
        alasql('SELECT [aliquotCode] AS [Código da alíquota], [examName] AS [Nome do exame] INTO CSV("' + name + '.csv") FROM ?', [style, response]);
      }).catch(function () {
        defer.reject()
      }).finally(function () {
        LoadingScreenService.finish();
      });
    };
  }
}());
