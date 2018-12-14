(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    '$filter',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.LaboratoryMonitoringService',
    'otusjs.otus.uxComponent.BarChartsVerticalFactory',
    'otusjs.otus.uxComponent.BarChartsHorizontalFactory'
  ];

  function Controller($filter, LoadingScreenService, DashboardContextService, FieldCenterRestService, LaboratoryMonitoringService, BarChartsVerticalFactory, BarChartsHorizontalFactory) {
    const PENDING = 'pending';
    const ORPHAN = 'orphan';

    var self = this;
    self.centers = [];
    self.centerFilter = '';

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
    self.loadData = loadData;
    /* Lifecycle methods */
    function onInit() {
      FieldCenterRestService.loadCenters().then(function (result) {
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        _setUserFieldCenter();
      });
    };

    function openTabPendingResultsByAliquots() {
      if (!$('#pending-results-chart svg').length) {
        _loadDataPendingResultsByAliquots(self.centerFilter);
      }
    };

    function openTabQuantitativeByTypeOfAliquots() {
      if (!$('#quantitative-by-aliquots svg').length) {
        _loadDataQuantitativeByTypeOfAliquots(self.centerFilter);
      }
    };

    function openTabOrphanByExams() {
      if (!$('#orphans-by-exam svg').length) {
        _loadDataOrphansByExam();
      }
    };

    function openTabStorageByAliquots() {
      if (!$('#storage-by-exam svg').length) {
        _loadStorageByAliquots(self.centerFilter);
      }
    };

    function openTabByExam() {
      if (!$('#by-exam svg').length) {
        _loadResultsByExam(self.centerFilter);
      }
    };

    function downloadCSVFile(current) {
      switch (current) {
        case PENDING:
          LaboratoryMonitoringService.downloadCSVFileOfPendingResultsByAliquots(self.centerFilter);
        case ORPHAN:
          LaboratoryMonitoringService.downloadCSVFileOfOrphansByExam();
      }
    };

    function loadData(center) {
      self.centerFilter = center;
      if (!$('#pending-results-chart svg').length) {
        _loadDataPendingResultsByAliquots(center);
      } else if (!$('#quantitative-by-aliquots svg').length) {
        _loadDataQuantitativeByTypeOfAliquots(center);
      } else if (!$('#storage-by-exam svg').length) {
        _loadStorageByAliquots(center);
      } else if (!$('#by-exam svg').length) {
        _loadResultsByExam(center);
      }
    };

    function _setUserFieldCenter() {
      DashboardContextService
        .getLoggedUser()
        .then(function (userData) {
          self.userHaveCenter = !!userData.fieldCenter.acronym;
          if (self.userHaveCenter) {
            self.centerFilter = userData.fieldCenter.acronym;
          } else {
            self.centerFilter = self.centers[0];
          };
        });
    };

    function _loadDataPendingResultsByAliquots(center) {
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

    function _loadDataQuantitativeByTypeOfAliquots(center) {
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

    function _loadStorageByAliquots(center) {
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

    function _loadResultsByExam(center) {
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
