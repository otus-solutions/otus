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
    'otusjs.otus.uxComponent.BarChartsHorizontalFactory'
  ];

  function Controller($q, LaboratoryMonitoringService, LoadingScreenService, BarChartsFactory, BarChartsHorizontalFactory) {
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
    self.openTabByExam = openTabByExam;
    self.downloadCSVFile = downloadCSVFile;
    /* Lifecycle methods */
    function onInit() { };

    function openTabPendingResultsByAliquots() {
      if (!$('#pending-results-chart svg').length) {
        _loadDataPendingResultsByAliquots();
      }
    };

    function openTabQuantitativeByTypeOfAliquots() {
      if (!$('#quantitative-by-aliquots svg').length) {
        _loadDataQuantitativeByTypeOfAliquots();
      }
    };

    function openTabOrphanByExams() {
      if (!$('#orphans-by-exam svg').length) {
        _loadDataOrphansByExam();
      }
    }

    function openTabStorageByAliquots() {
      if (!$('#storage-by-exam svg').length) {
        _loadStorageByAliquots();
      }
    }

    function openTabByExam() {
      if (!$('#by-exam svg').length) {
        _loadResultsByExam();
      }
    }

    function _loadDataPendingResultsByAliquots() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfPendingResultsByAliquots().then(function (response) {
        var colors = ['#88d8b0', '#ff6f69'];
        var element = '#pending-results-chart';
        BarChartsFactory.create(response, element, colors);
        LoadingScreenService.finish();
      }).catch(function (e) {
        LoadingScreenService.finish();
      });
    }

    function _loadDataQuantitativeByTypeOfAliquots() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots()
        .then(function (response) {
          var colors = ['#b33040', '#d25c4d', '#f2b447'];
          var element = '#quantitative-by-aliquots';
          BarChartsFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
        });
    };

    function _loadDataOrphansByExam() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOrphanByExams()
        .then(function (response) {
          var colors = ['#bae1ff'];
          var element = '#orphans-by-exam';
          BarChartsHorizontalFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
        });
    };

    function _loadStorageByAliquots() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfStorageByAliquots()
        .then(function (response) {
          var colors = ['#bae1ff'];
          var element = '#orphans-by-exam';
          BarChartsFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
        });
    };

    function _loadResultsByExam() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataByExam()
        .then(function (response) {
          var colors = ['#bae1ff'];
          var element = '#orphans-by-exam';
          BarChartsFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
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
          LaboratoryMonitoringService.downloadCSVFileByExam();
      }
    };
  };
}());
