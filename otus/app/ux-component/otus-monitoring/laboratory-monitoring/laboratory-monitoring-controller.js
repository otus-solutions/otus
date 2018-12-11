(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    '$q',
    'otusjs.monitoring.business.LaboratoryMonitoringService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.uxComponent.BarChartsVerticalFactory',
    'otusjs.otus.uxComponent.BarChartsHorizontalFactory',
    'otusjs.otus.uxComponent.QuantitativeAliquotsChartsFactory'
  ];

  function Controller($q, LaboratoryMonitoringService, LoadingScreenService, BarChartsFactory, BarChartsHorizontalFactory, QuantitativeAliquotsChartsFactory) {
    const PENDING = 'pending';
    const QUANTITATIVE = 'quantitative';
    const ORPHAN = 'orphan';
    const STORAGE = 'storage';
    const RESULTS = 'results';
    var self = this;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.openTabPendingResultsByAliquots = openTabPendingResultsByAliquots;
    self.openTabQuantitativeByTypeOfAliquots = openTabQuantitativeByTypeOfAliquots;
    self.openTabOrphanByExams = openTabOrphanByExams;
    self.openTabStorageByAliquots = openTabStorageByAliquots;
    self.openTabResultsByExam = openTabResultsByExam;
    self.downloadCSVFile = downloadCSVFile;
    /* Lifecycle methods */
    function onInit() { };

    function openTabPendingResultsByAliquots() {
      if (!$('#pending-results-chart svg').length) {
        LoadingScreenService.start();
        var colors = ['#88d8b0', '#ff6f69'];
        var element = '#pending-results-chart';
        BarChartsFactory.create(_loadDataPendingResultsByAliquots(), element, colors);
      }
    };

    function openTabQuantitativeByTypeOfAliquots() {
      if (!$('#quantitative-by-aliquots svg').length) {
        var colors = ['#b33040', '#d25c4d', '#f2b447'];
        var element = '#quantitative-by-aliquots';
        BarChartsFactory.create(_loadDataQuantitativeByTypeOfAliquots(), element, colors);
      }
    };

    function openTabOrphanByExams() {
      if (!$('#orphans-by-exam svg').length) {
        var colors = ['#bae1ff'];
        var element = '#orphans-by-exam';
        BarChartsFactory.create(_loadDataOrphansByExam(), element, colors);
      }
    }

    function openTabStorageByAliquots() {
      if (!$('#storage-by-exam svg').length) {
        var colors = ['#bae1ff'];
        var element = '#orphans-by-exam';
        BarChartsFactory.create(_loadStorageByAliquots(), element, colors);
      }
    }

    function openTabResultsByExam() {
      if (!$('#storage-by-exam svg').length) {
        var colors = ['#bae1ff'];
        var element = '#orphans-by-exam';
        BarChartsFactory.create(_loadResultsByExam(), element, colors);
      }
    }

    function _loadDataPendingResultsByAliquots() {
      LaboratoryMonitoringService.getDataOfPendingResultsByAliquots().then(function (response) {
        LoadingScreenService.finish();
        defer.resolve();
        return response;
      }).catch(function (e) {
        LoadingScreenService.finish();
        defer.reject();
        return [];
      });
    }

    function _loadDataQuantitativeByTypeOfAliquots() {
      LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots()
        .then(function (response) {
          LoadingScreenService.finish();
          defer.resolve();
          return response;
        }).catch(function (e) {
          LoadingScreenService.finish();
          defer.reject();
          return [];
        });
    };

    function _loadDataOrphansByExam() {
      LaboratoryMonitoringService.getDataOrphanByExams()
        .then(function (response) {
          LoadingScreenService.finish();
          defer.resolve();
          return response;
        }).catch(function (e) {
          LoadingScreenService.finish();
          defer.reject();
          return [];
        });
    };

    function _loadStorageByAliquots() {
      LaboratoryMonitoringService.getDataOfStorageByAliquots()
        .then(function (response) {
          LoadingScreenService.finish();
          defer.resolve();
          return response;
        }).catch(function (e) {
          LoadingScreenService.finish();
          defer.reject();
          return [];
        });
    };

    function _loadResultsByExam() {
      LaboratoryMonitoringService.getDataOfResultsByExam()
        .then(function (response) {
          LoadingScreenService.finish();
          defer.resolve();
          return response;
        }).catch(function (e) {
          LoadingScreenService.finish();
          defer.reject();
          return [];
        });
    };

    function downloadCSVFile(current) {
      switch (current) {
        case PENDING:
          LaboratoryMonitoringService.downloadCSVFileOfPendingResultsByAliquots();
        case QUANTITATIVE:
          LaboratoryMonitoringService.downloadCSVFileOfQuantitativeByTypeOfAliquots();
        case ORPHAN:
          LaboratoryMonitoringService.downloadCSVFileOfOrphansByExam();
        case STORAGE:
          LaboratoryMonitoringService.downloadCSVFileOfStorageByAliquots();
        case RESULTS:
          LaboratoryMonitoringService.downloadCSVFileOfResultsByExam();
      }
    };
  };
}());
