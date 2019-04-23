(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryFlagReportManagerListCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$timeout',
    'otusFlagReportParseDataFactory',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.monitoring.business.MonitoringService',
    'otusjs.application.exam.ExamStatusHistoryService'
  ];

  function Controller($q, $timeout, FlagReportParseData, LoadingScreenService, FieldCenterRestService, DashboardContextService, MonitoringService, ExamStatusHistoryService) {

    var self = this;
    self.centers;
    self.exams;
    self.nameList;
    self.selectedExam;
    self.selectedStatus;
    self.examsData = [];

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public functions */
    self.updateData = updateData;
    self.updatePage = updatePage;
    self.setExams = setExams;
    self.downloadCSV = downloadCSV;

    function onInit() {
      self.ready = false;
      self.colors = ExamStatusHistoryService.getColors();
      self.labels = ExamStatusHistoryService.getLabels();
      _resetData();
      _loadDefaultData();
    }

    function setUserFieldCenter() {
      LoadingScreenService.start();
      DashboardContextService
        .getLoggedUser()
        .then((userData) => {
          var { acronym } = userData.fieldCenter;
          if (!acronym) {
            _setCenter(self.centers[0].acronym);
          } else {
            self.centers = [].concat(self.centers.find((center) => {
              return center.acronym === userData.fieldCenter.acronym;
            }));
            _setCenter(userData.fieldCenter.acronym);
          }
          _loadAllNames();
          LoadingScreenService.finish();
        })
        .catch(function (e) {
          LoadingScreenService.finish();
          throw e;
        });
    }

    function updatePage(exams = null, startPage, endPage) {
      if (startPage !== undefined && endPage !== undefined) {
        self.examsData.index = self.rawActivities.index.slice(startPage, endPage + 1);
      }
      self.examsData.data = angular.copy(exams);
      self.setExams(self.examsData, self.selectedAcronym, self.selectedStatus);
      LoadingScreenService.finish();
    }

    function updateData(exams = null, acronym = null, status = null, center) {
      if (center && center !== self.selectedCenter.acronym) {
        _loadActivitiesProgress(center);
        _setCenter(center);
      } else {
        if (acronym !== self.selectedAcronym || status !== self.selectedStatus) {
          _setActivity(acronym);
          _setStatus(status);
          self.newActivitiesData = FlagReportParseData.create(self.examsData, acronym, status)
          self.setExams(self.newActivitiesData, acronym, status);
        } else if (exams && exams !== self.exams) {
          self.setExams(exams, acronym, status);
        }
      }
    }

    function downloadCSV() {
      LoadingScreenService.changeMessage("Por favor, aguarde! Estamos gerando o arquivo para download.");
      LoadingScreenService.start();
      $timeout(function () {
        _prepareForCSV().then(function (response) {
          if (response) {
            var name = "relatorio-flags-".concat(new Date().toLocaleDateString());
            var QUERY_ACRONYM = self.selectedAcronym != null ? "ACRONIMO='" + self.selectedAcronym + "'" : "2=2";
            var QUERY_STATUS = self.selectedStatus != null ? "STATUS='" + ExamStatusHistoryService.getStatusLabel(self.selectedStatus) + "'" : "3=3";
            alasql('SELECT * INTO CSV("' + name + '.csv",{headers:true}) FROM flags WHERE 1=1 AND ' + QUERY_ACRONYM + ' AND ' + QUERY_STATUS);
            LoadingScreenService.finish();
          }
        }).catch(function (e) {
          throw new Error(e);
        }).finally(function () {
          LoadingScreenService.finish();
        });
      }, 2000);
    }

    function setExams(exams) {
      self.exams = exams;
    }

    function _resetData() {
      self.examsData = [];
      self.selectedExam = null;
      self.selectedStatus = null;
    }

    function _loadAllNames() {
      self.index++;
      if (!self.nameList) {
        MonitoringService.listAcronyms()
          .then((exams) => {
            self.nameList = exams.map(function (name) {
              return name;
            }).filter(function (elem, index, self) {
              return index == self.indexOf(elem);
            });
            _getStatus();
          })
          .catch((e) => {
            LoadingScreenService.finish();
            throw e;
          });
      }
    }

    function _getStatus() {
      self.status = ExamStatusHistoryService.listStatus();
      self.selectedStatus = null;
      _loadExamsProgress(self.selectedCenter.acronym);
    }

    function _loadDefaultData() {
      LoadingScreenService.start();
      self.index++;
      if (!self.centers) {
        FieldCenterRestService.loadCenters().then((result) => {
          self.centers = angular.copy(result);
          setUserFieldCenter();
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
          throw e;
        });
      } else {
        _loadExamsProgress(self.selectedCenter.acronym);
      }
    }

    function _loadExamsProgress(center) {
      self.index++;
      if (!self.exams || center !== self.selectedCenter.acronym) {
        if (center !== self.selectedCenter.acronym) self.$onInit();
        MonitoringService.getActivitiesProgressReport(center)
          .then((response) => {
            alasql("DROP TABLE IF EXISTS flags");
            self.rawActivities = angular.copy(response);
            self.examsData = angular.copy(response);
            self.ready = true;
            self.error = false;
          }).catch((e) => {
            LoadingScreenService.finish();
            throw e;
          });
      } else {
        self.setExams(self.exams, self.selectedAcronym, self.selectedStatus);
        self.ready = true;
        self.error = false;
      }
    }

    function _setCenter(acronym) {
      self.selectedCenter = self.centers.find(function (center) {
        return center.acronym === acronym;
      });
    }

    function _setStatus(status) {
      self.selectedStatus = status;
    }

    function _setActivity(acronym) {
      self.selectedAcronym = acronym;
    }

  }
}());
