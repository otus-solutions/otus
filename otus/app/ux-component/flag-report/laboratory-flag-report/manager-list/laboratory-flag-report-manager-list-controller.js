(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryFlagReportManagerListCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$timeout',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.application.exam.ExamStatusHistoryService',
    'otusjs.monitoring.business.FlagReportFilterService',
    'otusjs.monitoring.repository.FlagReportMonitoringService'
  ];

  function Controller($q, $timeout, LoadingScreenService, FieldCenterRestService, DashboardContextService, ExamStatusHistoryService, FlagReportFilterService, FlagReportMonitoringService) {
    const DATA_NOT_FOUND = "Não há registros a serem exibidos.";
    const GENERIC_ERROR = "Ocorreu algum problema. Por favor, tente novamente em alguns minutos.";
    const CSV_ERROR = 'Não foi possível baixar o csv. Por favor, tente novamente em alguns minutos.';
    var self = this;
    self.ready;
    self.error;
    self.exams;
    self.status;
    self.labels;
    self.colors;
    self.centers;
    self.message;
    self.rawExams;
    self.examsData;
    self.selectedExam;
    self.examsNameList;
    self.selectedStatus;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public functions */
    self.updateData = updateData;
    self.updatePage = updatePage;
    self.setExams = setExams;
    self.downloadCSV = downloadCSV;

    function onInit() {
      self.ready = false;
      self.error = false;
      self.status = undefined;
      self.examsData = [];
      self.selectedExam = null;
      self.selectedStatus = null;
      self.colors = ExamStatusHistoryService.getColors();
      self.labels = ExamStatusHistoryService.getLabels();
      _loadData();
    }

    function updatePage(exams, startPage, endPage) {
      if (startPage !== undefined && endPage !== undefined) {
        self.examsData.index = self.rawExams.index.slice(startPage, endPage + 1);
      }
      self.examsData.data = angular.copy(exams);
      self.setExams(self.examsData, self.selectedExamName, self.selectedStatus);
      LoadingScreenService.finish();
    }

    function updateData(exams, examName, status, center) {
      if (center && center !== self.selectedCenter.acronym) {
        _setExamsProgress(center);
        _setCenter(center);
      } else {
        if (examName !== self.selectedExamName || status !== self.selectedStatus) {
          _setExamName(examName);
          _setStatus(status);
          self.newExamsData = FlagReportFilterService.filter(self.examsData, examName, status);
          self.setExams(self.newExamsData, examName);
        } else if (exams && exams !== self.exams) {
          self.setExams(exams, examName);
        }
      }
    }

    function downloadCSV() {
      LoadingScreenService.changeMessage('Por favor, aguarde! Estamos gerando o arquivo para download.');
      LoadingScreenService.start();
      $timeout(function () {
        _prepareForCSV().then(function (response) {
          if (response) {
            var name = "relatorio-flags-exames-".concat(new Date().toLocaleDateString());
            var QUERY_EXAM_NAME = self.selectedExamName != null ? "NOME='" + self.selectedExamName + "'" : "2=2";
            var QUERY_STATUS = self.selectedStatus != null ? "STATUS='" + ExamStatusHistoryService.getStatusLabel(self.selectedStatus) + "'" : "3=3";
            alasql('SELECT * INTO CSV("' + name + '.csv",{headers:true}) FROM flagsExams WHERE 1=1 AND ' + QUERY_EXAM_NAME + ' AND ' + QUERY_STATUS);
            LoadingScreenService.finish();
          }
        }).catch(function (e) {
          throw new Error(e);
        }).finally(function () {
          $mdToast.show(
            $mdToast.simple()
              .textContent(CSV_ERROR)
              .hideDelay(5000)
          );
          LoadingScreenService.finish();
        });
      }, 2000);
    }

    function setExams(exams) {
      self.exams = exams;
    }

    function _prepareForCSV() {
      return $q(function (resolve, reject) {
        alasql("DROP TABLE IF EXISTS flagsExams");
        alasql("CREATE TABLE IF NOT EXISTS flagsExams(RN INT,NOME STRING, STATUS STRING)");
        var rn = 0;
        if (Array.isArray(self.rawExams.data)) {
          if (self.examsData.data.length > 0) {
            try {
              self.examsData.data.forEach(function (line) {
                for (let i = 0; i < self.examsData.columns.length; i++) {
                  alasql("INSERT INTO flagsExams VALUES(" + self.examsData.index[rn] + ",'" + self.examsData.columns[i][1] + "','" + ExamStatusHistoryService.getStatusLabel(line[i]) + "')");
                }
                rn++;
              });
            } catch (e) {
              reject(e);
            }
          }
          resolve(true);
        } else {
          reject("Data not found.");
        }
      });
    }

    function _loadData() {
      if (!self.centers) {
        LoadingScreenService.start();
        FieldCenterRestService.loadCenters().then((result) => {
          self.centers = angular.copy(result);
          _setDefaultData();
          LoadingScreenService.finish();
        }).catch(function (e) {
          self.ready = false;
          self.error = true;
          self.message = GENERIC_ERROR;
          LoadingScreenService.finish();
          throw e;
        });
      } else {
        _setExamsProgress(self.selectedCenter.acronym);
      }
    }

    function _setDefaultData() {
      DashboardContextService.getLoggedUser().then((userData) => {
        var { acronym } = userData.fieldCenter;
        if (!acronym) {
          _setCenter(self.centers[0].acronym);
        } else {
          self.centers = [].concat(self.centers.find((center) => {
            return center.acronym === userData.fieldCenter.acronym;
          }));
          _setCenter(userData.fieldCenter.acronym);
        }
        _setExamNames(self.selectedCenter.acronym);
        _setExamsProgress(self.selectedCenter.acronym);
      }).catch(function (e) {
        self.ready = false;
        self.error = true;
        self.message = GENERIC_ERROR;
        throw e;
      });
    }

    function _setExamNames(center) {
      if (!self.examsNameList) {
        FlagReportMonitoringService.getExamsName(center).then((examNames) => {
          self.examsNameList = examNames.map(function (examName) {
            return examName;
          }).filter(function (elem, index, self) {
            return index == self.indexOf(elem);
          });
          _getStatus();
        }).catch((e) => {
          LoadingScreenService.finish();
          throw e;
        });
      }
    }

    function _setExamsProgress(center) {
      if (!self.exams || center !== self.selectedCenter.acronym) {
        LoadingScreenService.start();
        if (center !== self.selectedCenter.acronym)
          self.$onInit();
        FlagReportMonitoringService.getExamsProgressReport(center).then((response) => {
          alasql("DROP TABLE IF EXISTS flagsExams");
          self.rawExams = angular.copy(response);
          self.examsData = angular.copy(response);
          self.ready = true;
          self.error = false;
          LoadingScreenService.finish();
        }).catch((e) => {
          self.ready = false;
          self.error = true;
          self.message = DATA_NOT_FOUND;
          LoadingScreenService.finish();
          throw e;
        });
      } else {
        self.setExams(self.exams);
        self.ready = true;
        self.error = false;
      }
    }

    function _setCenter(acronym) {
      self.selectedCenter = self.centers.find(function (center) {
        return center.acronym === acronym;
      });
    }

    function _setExamName(examName) {
      self.selectedExamName = examName;
    }

    function _setStatus(status) {
      self.selectedStatus = status;
    }

    function _getStatus() {
      self.status = ExamStatusHistoryService.listStatus();
      self.selectedStatus = null;
    }

  }
}());
