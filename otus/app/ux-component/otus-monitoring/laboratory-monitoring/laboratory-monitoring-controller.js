(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    '$filter',
    'otusjs.application.session.core.ContextService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.LaboratoryMonitoringService',
    'otusjs.otus.uxComponent.BarChartsVerticalFactory',
    'otusjs.otus.uxComponent.BarChartsHorizontalFactory'
  ];

  function Controller($filter, SessionContextService, LoadingScreenService, DashboardContextService, FieldCenterRestService, LaboratoryMonitoringService, BarChartsVerticalFactory, BarChartsHorizontalFactory) {
    const DATA_NOT_FOUND = 'Data Not Found';
    const PENDING = 'pending';
    const QUANTITATIVE = 'quantitative';
    const ORPHAN = 'orphan';
    const STORAGE = 'storage';
    const EXAM = 'exam';

    var self = this;
    self.dataNotFound = false;
    self.centers = [];
    self.centerFilter = '';
    self.ERROR_MESSAGE = 'Atualmente não há registros a serem exibidos!';

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.openTabPendingResultsByAliquots = openTabPendingResultsByAliquots;
    self.openTabQuantitativeByTypeOfAliquots = openTabQuantitativeByTypeOfAliquots;
    self.openTabOrphanByExams = openTabOrphanByExams;
    self.openTabStorageByAliquots = openTabStorageByAliquots;
    self.openTabByExam = openTabByExam;
    self.downloadCSVFile = downloadCSVFile;
    self.loadData = loadData;
    self.loadCenters = loadCenters;
    /* Lifecycle methods */
    function onInit() {
      self.dataNotFound = false;
      if (localStorage.getItem("centerUser")){
        self.centerFilter = localStorage.getItem("centerUser");
        self.openTabPendingResultsByAliquots();
      }
    };

    function loadCenters() {
      // var deferred = $q.defer();
      FieldCenterRestService.loadCenters().then(function (result) {
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        _setUserFieldCenter();
      });
    }

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
      if (!$('#results-by-exam svg').length) {
        _loadResultsByExam(self.centerFilter);
      }
    };

    function downloadCSVFile(current) {
      switch (current) {
        case PENDING:
          LaboratoryMonitoringService.downloadCSVFileOfPendingResultsByAliquots(self.centerFilter);
          break;
        case ORPHAN:
          LaboratoryMonitoringService.downloadCSVFileOfOrphansByExam();
          break;
      }
    };

    function loadData(currentTab, center) {
      self.centerFilter = center;
      switch (currentTab) {
        case PENDING:
          d3.selectAll('#pending-results-chart svg').remove();
          _loadDataPendingResultsByAliquots(center);
          break;
        case QUANTITATIVE:
          d3.selectAll('#quantitative-by-aliquots svg').remove();
          _loadDataQuantitativeByTypeOfAliquots(center);
          break;
        case STORAGE:
          d3.selectAll('#storage-by-exam svg').remove();
          _loadStorageByAliquots(center);
        case EXAM:
          d3.selectAll('#results-by-exam svg').remove();
          _loadResultsByExam(center);
          break;
      };
    };

    function _setUserFieldCenter() {
      DashboardContextService
        .getLoggedUser()
        .then(function (userData) {
          self.userHaveCenter = !!userData.fieldCenter.acronym;
          if (self.userHaveCenter) {
            self.centerFilter = userData.fieldCenter.acronym;
            localStorage.setItem("centerUser", self.centerFilter);
          } else {
            self.centerFilter = self.centers[0];
          };
        });
    };

    function _loadDataPendingResultsByAliquots(center) {
      LoadingScreenService.start();
      self.dataNotFound = false;
      LaboratoryMonitoringService.getDataOfPendingResultsByAliquots(center ? center : self.centerFilter)
        .then(function (response) {
          if (_hasData(response)) {
            var colors = ['#88d8b0', '#ff6f69'];
            var element = '#pending-results-chart';
            BarChartsVerticalFactory.create(response, element, colors);
          }
          LoadingScreenService.finish();
        }).catch(function (e) {
        _hasData(e)
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

    function _hasData(response) {
      if (response.data) {
        if (response.data.MESSAGE) {
          self.dataNotFound = true;
          return false;
        } else {
          return true;
        }
      } else return true;
    };
  };
}());
