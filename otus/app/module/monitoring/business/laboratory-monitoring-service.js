(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.LaboratoryMonitoringService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.model.chart.VerticalBarFactory',
    'otusjs.monitoring.repository.MonitoringCollectionService'
  ];

  function Service($q, LoadingScreenService, VerticalBarFactory, MonitoringCollectionService) {
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
        defer.resolve(VerticalBarFactory.fromJsonObject(response, { received: 'Recebidos', waiting: 'Aguardando' }));
      }).catch(function (e) {
        defer.reject(e);
      });

      return defer.promise;
    };

    function getDataQuantitativeByTypeOfAliquots(center) {
      var defer = $q.defer();
      MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots(center).then(function (response) {
        defer.resolve(VerticalBarFactory.fromJsonObject(response, { received: 'Recebidos', prepared: 'Preparados', transported: 'Transportados' }));
      }).catch(function (e) {
        defer.reject(e);
      });

      return defer.promise;
    };

    function getDataOrphanByExams() {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOrphanByExams().then(function (response) {
        defer.resolve(response);
      }).catch(function (e) {
        defer.reject(e);
      });

      return defer.promise;
    };

    function getDataOfStorageByAliquots(center) {
      var defer = $q.defer();
      MonitoringCollectionService.getDataOfStorageByAliquots(center).then(function (response) {
        defer.resolve(response);
      }).catch(function (e) {
        defer.reject(e);
      });

      return defer.promise;
    };

    function getDataByExam(center) {
      var defer = $q.defer();
      MonitoringCollectionService.getDataByExam(center).then(function (response) {
        defer.resolve(response);
      }).catch(function (e) {
        defer.reject(e);
      });

      return defer.promise;
    };

    function downloadCSVFileOfPendingResultsByAliquots(center) {
      var defer = $q.defer();
      LoadingScreenService.changeMessage('Por favor, aguarde! Estamos gerando o arquivo para download.');
      LoadingScreenService.start();
      MonitoringCollectionService.getDataToCSVOfPendingResultsByAliquots(center).then(function (response) {
        var headers = '[aliquot] AS [Alíquotas], [transported] AS [Transportados], [prepared] AS [Preparadas]';
        var name = 'monitoramento-laboratorial-resultados-pendentes-'.concat(new Date().toLocaleDateString());
        alasql('SELECT ' + headers + ' INTO CSV("' + name + '.csv") FROM ? ', [response]);
      }).catch(function () {
        defer.reject()
      }).finally(function () {
        LoadingScreenService.finish();
      });
    };

    function downloadCSVFileOfOrphansByExam() {
      var defer = $q.defer();
      LoadingScreenService.changeMessage('Por favor, aguarde! Estamos gerando o arquivo para download.');
      LoadingScreenService.start();
      MonitoringCollectionService.getDataToCSVOfOrphansByExam().then(function (response) {
        var headers = '[aliquotCode] AS [Código da alíquota], [examName] AS [Nome do exame]';
        var name = 'monitoramento-laboratorial-exame-orfaos-'.concat(new Date().toLocaleDateString());
        alasql('SELECT ' + headers + ' INTO CSV("' + name + '.csv") FROM ? ', [response]);
      }).catch(function () {
        defer.reject()
      }).finally(function () {
        LoadingScreenService.finish();
      });
    };
  }
}());
