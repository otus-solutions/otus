(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$filter',
    '$mdToast',
    '$mdDialog',
    'otusjs.application.session.core.ContextService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.LaboratoryMonitoringService',
    'otusjs.otus.uxComponent.BarChartsVerticalFactory',
    'otusjs.otus.uxComponent.BarChartsHorizontalFactory',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.laboratoryViewerService.LaboratoryViewerService'
  ];

  function Controller(
    $q,
    $filter,
    $mdToast,
    $mdDialog,
    SessionContextService,
    LoadingScreenService,
    FieldCenterRestService,
    LaboratoryMonitoringService,
    BarChartsVerticalFactory,
    BarChartsHorizontalFactory,
    DialogShowService,
    LaboratoryViewerService) {

    const MESSAGE_OF_DATA_NOT_FOUND = 'Não há registros a serem exibidos.';
    const MESSAGE_OF_GENERIC_ERROR = 'Não conseguimos apresentar os dados, tente novamente mais tarde.';
    const DATA_NOT_FOUND = 'Data Not Found';
    const PENDING = 'pending';
    const QUANTITATIVE = 'quantitative';
    const ORPHAN = 'orphan';
    const STORAGE = 'storage';
    const EXAM = 'exam';

    var self = this;
    var _alert;
    self.centers = [];
    self.centerFilter = '';
    self.message = '';
    self.error = false;
    self.disableDownloadCSVFile = false;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.openTabPendingResultsByAliquots = openTabPendingResultsByAliquots;
    self.openTabQuantitativeByTypeOfAliquots = openTabQuantitativeByTypeOfAliquots;
    self.openTabOrphanByExams = openTabOrphanByExams;
    self.openTabStorageByAliquots = openTabStorageByAliquots;
    self.openTabByExam = openTabByExam;
    self.downloadCSVFile = downloadCSVFile;
    self.loadDataByCenter = loadDataByCenter;
    self.loadCenters = loadCenters;

    /* Lifecycle methods */
    function onInit() {
      LaboratoryViewerService.checkExistAndRunOnInitOrBackHome(_init);
    }

    function _init() {
      loadCenters().then(() => {
        _setUserFieldCenter();
        openTabPendingResultsByAliquots();
      }).catch(function (e) {
        self.error = true;
        self.message = MESSAGE_OF_GENERIC_ERROR;
      });
    }

    function loadCenters() {
      let defer = $q.defer();
      FieldCenterRestService.loadCenters().then(function (result) {
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        defer.resolve();
      }).catch(function (e) {
        defer.reject();
      });
      return defer.promise;
    }

    function openTabPendingResultsByAliquots() {
      self.error = false;
      if (!$('#pending-results-chart svg').length) {
        _loadDataPendingResultsByAliquots(self.centerFilter);
      }
    }

    function openTabQuantitativeByTypeOfAliquots() {
      self.error = false;
      if (!$('#quantitative-by-aliquots svg').length) {
        _loadDataQuantitativeByTypeOfAliquots(self.centerFilter);
      }
    }

    function openTabOrphanByExams() {
      self.error = false;
      if (!$('#orphans-by-exam svg').length) {
        _loadDataOrphansByExam();
      }
    }

    function openTabStorageByAliquots() {
      self.error = false;
      if (!$('#storage-by-exam svg').length) {
        _loadStorageByAliquots(self.centerFilter);
      }
    }

    function openTabByExam() {
      self.error = false;
      if (!$('#results-by-exam svg').length) {
        _loadResultsByExam(self.centerFilter);
      }
    }

    function downloadCSVFile(current) {
      if (current === PENDING)
        LaboratoryMonitoringService.downloadCSVFileOfPendingResultsByAliquots(self.centerFilter)
          .then()
          .catch((err) => {
            if(err.data.MESSAGE.includes("Data Not Found")){
              self.disableDownloadCSVFile = true;
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Não existem pendências para download.')
                  .hideDelay(5000)
              );
            } else {
              _alert = {
                dialogToTitle:'Ocorreu um erro',
                textDialog:'Não foi possível baixar o csv, entre em contato com o suporte.',
                ariaLabel:'Entre em contato com o suporte',
                buttons: [
                  {
                    message:'Ok',
                    action:function(){$mdDialog.hide()},
                    class:'md-raised md-primary'
                  }
                ]
              };
              DialogShowService.showDialog(_alert);
            }
          });
      else
        LaboratoryMonitoringService.downloadCSVFileOfOrphansByExam();
    }

    function loadDataByCenter(currentTab, center) {
      self.centerFilter = center;
      self.disableDownloadCSVFile = false;
      d3.selectAll('#pending-results-chart svg').remove();
      d3.selectAll('#quantitative-by-aliquots svg').remove();
      d3.selectAll('#storage-by-exam svg').remove();
      d3.selectAll('#results-by-exam svg').remove();
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
      }
    }

    function _setUserFieldCenter() {
      let defer = $q.defer();
      let user = SessionContextService.getData('loggedUser');
      if (!user.fieldCenter.acronym) {
        self.centerFilter = self.centers[0];
        defer.resolve();
      } else {
        self.centerFilter = user.fieldCenter.acronym;
        defer.resolve();
      }
      return defer.promise;
    }

    function _loadDataPendingResultsByAliquots(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfPendingResultsByAliquots(center)
        .then(function (response) {
          var colors = ['#88d8b0', '#ff6f69'];
          var element = '#pending-results-chart';
          self.error = false;
          BarChartsVerticalFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
        self.error = true;
        _defineErrorMessage(e);
        LoadingScreenService.finish();
      });
    }

    function _loadDataQuantitativeByTypeOfAliquots(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots(center)
        .then(function (response) {
          var colors = ['#88d8b0', '#ffeead', '#ff6f69'];
          var element = '#quantitative-by-aliquots';
          BarChartsVerticalFactory.create(response, element, colors);
          self.error = false;
          LoadingScreenService.finish();
        }).catch(function (e) {
        self.error = true;
        _defineErrorMessage(e);
        LoadingScreenService.finish();
      });
    }

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
    }

    function _loadStorageByAliquots(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataOfStorageByAliquots(center)
        .then(function (response) {
          var colors = ['#88d8b0'];
          var element = '#storage-by-exam';
          BarChartsHorizontalFactory.create(response, element, colors);
          self.error = false;
          LoadingScreenService.finish();
        }).catch(function (e) {
        self.error = true;
        _defineErrorMessage(e);
        LoadingScreenService.finish();
      });
    }

    function _loadResultsByExam(center) {
      LoadingScreenService.start();
      LaboratoryMonitoringService.getDataByExam(center)
        .then(function (response) {
          var colors = ['#88d8b0'];
          var element = '#results-by-exam';
          BarChartsHorizontalFactory.create(response, element, colors);
          self.error = false;
          LoadingScreenService.finish();
        }).catch(function (e) {
        self.error = true;
        _defineErrorMessage(e);
        LoadingScreenService.finish();
      });
    }

    function _defineErrorMessage(response) {
      if (response.data.MESSAGE === DATA_NOT_FOUND) {
        self.message = MESSAGE_OF_DATA_NOT_FOUND;
      } else if (response.data.MESSAGE) {
        self.message = MESSAGE_OF_GENERIC_ERROR;
      }
    }
  }
}());
