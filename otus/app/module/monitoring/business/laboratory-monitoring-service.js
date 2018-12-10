(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.LaboratoryMonitoringService', Service);

  Service.$inject = [
    '$q',
    'otusjs.monitoring.repository.MonitoringCollectionService'
  ];

  function Service($q, MonitoringCollectionService) {
    var self = this;
    /* Public methods */
    self.getDataOfPendingResultsByAliquots = getDataOfPendingResultsByAliquots;
    self.getDataQuantitativeByTypeOfAliquots = getDataQuantitativeByTypeOfAliquots;
    self.getDataOrphanByExams = getDataOrphanByExams;
    self.getDataOfStorageByAliquots = getDataOfStorageByAliquots;
    self.getDataOfResultsByExam = getDataOfResultsByExam;
    self.donwloadCSVFileOfPendingResults = donwloadCSVFileOfPendingResults;

    function getDataOfPendingResultsByAliquots() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOfPendingResultsByAliquots().then(function (response) {
        defer.resolve(response);
      }).catch(function () {
        defer.reject()
      });
      return defer.promise;
    };

    function getDataQuantitativeByTypeOfAliquots() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots().then(function (response) {
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

    function getDataOfStorageByAliquots() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOfStorageByAliquots().then(function (response) {
        defer.resolve(response);
      }).catch(function () {
        defer.reject()
      });
      return defer.promise;
    };

    function getDataOfResultsByExam() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOfResultsByExam().then(function (response) {
        defer.resolve(response);
      }).catch(function () {
        defer.reject()
      });
      return defer.promise;
    };

    function donwloadCSVFileOfPendingResults() {
      LoadingScreenService.changeMessage("Por favor, aguarde! Estamos gerando o arquivo para download.");
      LoadingScreenService.start();
      _buildCSVFileOfPendingResults().then(function (response) {
        if (response) {
          var name = "monitoramento-laboratorial-resultados-pendentes-".concat(new Date().toLocaleDateString());
          alasql('SELECT * INTO CSV("' + name + '.csv",{headers:true}) FROM LAB_MONITORING');
          alasql("DROP TABLE IF EXISTS LAB_MONITORING");
          LoadingScreenService.finish();
        }
      }).catch(function (e) {
        throw new Error(e);
      }).finally(function () {
        LoadingScreenService.finish();
      });
    };

    function _buildCSVFileOfPendingResults() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataToCSVOfPendingResults().then(function (response) {
        alasql("CREATE TABLE IF NOT EXISTS LAB_MONITORING(CODIGO INT, CENTRO STRING, TIPO STRING, CONDICAO STRING)");
        if (Array.isArray(response) && response.length > 0) {
          response.forEach(function (line) {
            alasql("INSERT INTO LAB_MONITORING VALUES(" + line.code + ",'" + line.fieldCenter + "','" + line.type + "','" + line.condition + "')");
          });
        }
      }).catch(function () {
        defer.reject()
      });
      return defer.promise;
    };
  }
}());
