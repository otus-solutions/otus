(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    '$filter',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.LaboratoryMonitoringService',
    'otusjs.otus.uxComponent.BarChartsVerticalFactory',
    'otusjs.otus.uxComponent.BarChartsHorizontalFactory'
  ];

  function Controller($filter, LoadingScreenService, FieldCenterRestService, LaboratoryMonitoringService, BarChartsVerticalFactory, BarChartsHorizontalFactory) {
    const PENDING = 'pending';
    const ORPHAN = 'orphan';

    var self = this;
    self.centers = [];

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.openTabPendingResultsByAliquots = openTabPendingResultsByAliquots;
    self.openTabQuantitativeByTypeOfAliquots = openTabQuantitativeByTypeOfAliquots;
    self.openTabOrphanByExams = openTabOrphanByExams;
    self.openTabStorageByAliquots = openTabStorageByAliquots;
    self.openTabByExam = openTabByExam;
    self.downloadCSVFile = downloadCSVFile;
    self.onFilter = onFilter;
    /* Lifecycle methods */
    function onInit() {
      FieldCenterRestService.loadCenters().then(function (result) {
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
      });
    };

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
    };

    function openTabStorageByAliquots() {
      if (!$('#storage-by-exam svg').length) {
        _loadStorageByAliquots();
      }
    };

    function openTabByExam() {
      if (!$('#by-exam svg').length) {
        _loadResultsByExam();
      }
    };

    function downloadCSVFile(current) {
      switch (current) {
        case PENDING:
          LaboratoryMonitoringService.downloadCSVFileOfPendingResultsByAliquots('RS');
        case ORPHAN:
          LaboratoryMonitoringService.downloadCSVFileOfOrphansByExam();
      }
    };

    function onFilter() {

    };

    function _loadDataByCenter() {

    };

    function _loadDataPendingResultsByAliquots(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfPendingResultsByAliquots('RS')
        .then(function (response) {
          var colors = ['#88d8b0', '#ff6f69'];
          var element = '#pending-results-chart';
          BarChartsVerticalFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
        });
    };

    function _loadDataQuantitativeByTypeOfAliquots(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots('RS')
        .then(function (response) {
          var colors = ['#b33040', '#d25c4d', '#f2b447'];
          var element = '#quantitative-by-aliquots';
          BarChartsVerticalFactory.create(response, element, colors);
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

    function _loadStorageByAliquots(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfStorageByAliquots('RS')
        .then(function (response) {
          var colors = ['#bae1ff'];
          var element = '#storage-by-exam';
          BarChartsVerticalFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
        });
    };

    function _loadResultsByExam(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataByExam('RS')
        .then(function (response) {
          var colors = ['#bae1ff'];
          var element = '#result-by-exam';
          BarChartsVerticalFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
        });
    };
  };
}());
