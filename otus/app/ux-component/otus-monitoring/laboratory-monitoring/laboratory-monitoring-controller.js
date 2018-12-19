(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$filter',
    'otusjs.application.session.core.ContextService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.LaboratoryMonitoringService',
    'otusjs.otus.uxComponent.BarChartsVerticalFactory',
    'otusjs.otus.uxComponent.BarChartsHorizontalFactory'
  ];

  function Controller($q, $filter, SessionContextService, LoadingScreenService, DashboardContextService, FieldCenterRestService, LaboratoryMonitoringService, BarChartsVerticalFactory, BarChartsHorizontalFactory) {
    const MESSAGE_OF_DATA_NOT_FOUND = 'Não há registros a serem exibidos.';
    const MESSAGE_OF_GENERIC_ERROR = 'Não conseguimos apresentar os dados, tente novamente mais tarde.';
    const DATA_NOT_FOUND = 'Data Not Found';
    const PENDING = 'pending';
    const QUANTITATIVE = 'quantitative';
    const ORPHAN = 'orphan';
    const STORAGE = 'storage';
    const EXAM = 'exam';

    var self = this;
    self.centers = [];
    self.centerFilter = '';
    self.message = '';
    self.errorInPendingResultsChart = false;
    self.errorInQuantitativeByAliquots = false;
    self.errorInStorageByExam = false;
    self.errorInExamResults = false;

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
      loadCenters().then(() => {
        _setUserFieldCenter();
        openTabPendingResultsByAliquots();
      })
    };

    function loadCenters() {
      let defer = $q.defer();
      FieldCenterRestService.loadCenters().then(function (result) {
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        defer.resolve();
      });
      return defer.promise;
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
      if (current === PENDING)
        LaboratoryMonitoringService.downloadCSVFileOfPendingResultsByAliquots(self.centerFilter);
      else
        LaboratoryMonitoringService.downloadCSVFileOfOrphansByExam();
    };

    function loadData(currentTab, center) {
      self.centerFilter = center;
      d3.selectAll('#pending-results-chart svg').remove();
      d3.selectAll('#quantitative-by-aliquots svg').remove();
      d3.selectAll('#results-by-exam svg').remove();
      d3.selectAll('#storage-by-exam svg').remove();
      switch (currentTab) {
        case PENDING:
          _loadDataPendingResultsByAliquots(center);
          break;
        case QUANTITATIVE:
          _loadDataQuantitativeByTypeOfAliquots(center);
          break;
        case STORAGE:
          _loadStorageByAliquots(center);
          break;
        case EXAM:
          _loadResultsByExam(center);
          break;
      };
    };

    function _setUserFieldCenter() {
      let defer = $q.defer();

      let user = SessionContextService.getData('loggedUser');
      if (!user.fieldCenter.acronym) {
        self.centerFilter = self.centers[0];
        defer.resolve();
      } else {
        self.centerFilter = user.fieldCenter.acronym;
        defer.resolve();
      };
      return defer.promise;
    };

    function _loadDataPendingResultsByAliquots(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfPendingResultsByAliquots(center)
        .then(function (response) {
          var colors = ['#88d8b0', '#ff6f69'];
          var element = '#pending-results-chart';
          self.errorInPendingResultsChart = false;
          BarChartsVerticalFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          self.errorInPendingResultsChart = true;
          _defineErrorMessage(e);
          LoadingScreenService.finish();
        });
    };

    function _loadDataQuantitativeByTypeOfAliquots(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots(center)
        .then(function (response) {
          var colors = ['#88d8b0', '#ffeead', '#ff6f69'];
          var element = '#quantitative-by-aliquots';
          BarChartsVerticalFactory.create(response, element, colors);
          self.errorInQuantitativeByAliquots = false;
          LoadingScreenService.finish();
        }).catch(function (e) {
          self.errorInQuantitativeByAliquots = true;
          _defineErrorMessage(e);
          LoadingScreenService.finish();
        });
    };

    function _loadDataOrphansByExam() {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOrphanByExams()
        .then(function (response) {
          var colors = ['#ff6f69'];
          var element = '#orphans-by-exam';
          BarChartsHorizontalFactory.create(response, element, colors);
          self.errorInOrphansByExam = false;
          LoadingScreenService.finish();
        }).catch(function (e) {
          self.errorInOrphansByExam = true;
          _defineErrorMessage(e);
          LoadingScreenService.finish();
        });
    };

    function _loadStorageByAliquots(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfStorageByAliquots(center)
        .then(function (response) {
          var colors = ['#88d8b0'];
          var element = '#storage-by-exam';
          BarChartsHorizontalFactory.create(response, element, colors);
          self.errorInStorageByExam = false;
          LoadingScreenService.finish();
        }).catch(function (e) {
          self.errorInStorageByExam = true;
          _defineErrorMessage(e);
          LoadingScreenService.finish();
        });
    };

    function _loadResultsByExam(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataByExam(center)
        .then(function (response) {
          var colors = ['#88d8b0'];
          var element = '#results-by-exam';
          BarChartsHorizontalFactory.create(response, element, colors);
          self.errorInExamResults = false;
          LoadingScreenService.finish();
        }).catch(function (e) {
          self.errorInExamResults = true;
          _defineErrorMessage(e);
          LoadingScreenService.finish();
        });
    };

    function _defineErrorMessage(response) {
      if (response.data.MESSAGE === DATA_NOT_FOUND) {
        self.message = MESSAGE_OF_DATA_NOT_FOUND;
        return true;
      } else if (response.data.MESSAGE) {
        self.message = MESSAGE_OF_GENERIC_ERROR;
      }
      return false;
    };
  };
}());
