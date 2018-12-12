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
    const QUANTITATIVE = 'quantitative';
    const ORPHAN = 'orphan';
    const STORAGE = 'storage';
    const RESULTS = 'results';

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
    self.downloadCSVFileOfPendingResultsByAliquots = downloadCSVFileOfPendingResultsByAliquots;
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

    function downloadCSVFileOfPendingResultsByAliquots() {
      LaboratoryMonitoringService.downloadCSVFileOfPendingResultsByAliquots(center);
    };

    function onFilter() {
      _loadDataByCenter();
      if (self.lotsListImutable.length) {
        self.lotsList = self.lotsListImutable
          .filter(function (lot) {
            return _filterByCenter(lot);
          })
          .filter(function (FilteredByCenter) {
            return _filterByPeriod(FilteredByCenter);
          })
          .filter(function (filteredByPeriod) {
            return _filterByExam(filteredByPeriod)
          });
      };
    };

    function _loadDataByCenter() {

    };

    function _loadDataPendingResultsByAliquots() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfPendingResultsByAliquots(center)
        .then(function (response) {
          var colors = ['#88d8b0', '#ff6f69'];
          var element = '#pending-results-chart';
          BarChartsVerticalFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
        });
    };

    function _loadDataQuantitativeByTypeOfAliquots() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots(center)
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

    function _loadStorageByAliquots() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfStorageByAliquots(center)
        .then(function (response) {
          var colors = ['#bae1ff'];
          var element = '#storage-by-exam';
          BarChartsVerticalFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
        });
    };

    function _loadResultsByExam() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataByExam(center)
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
