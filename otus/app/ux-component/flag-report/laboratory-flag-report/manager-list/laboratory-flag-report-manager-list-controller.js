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
    'otusjs.application.exam.ExamStatusHistoryService',
    'otusjs.monitoring.business.FlagReportMonitoringService'
  ];

  function Controller($q, $timeout, FlagReportParseData, LoadingScreenService, FieldCenterRestService, DashboardContextService, ExamStatusHistoryService, FlagReportMonitoringService) {
    var self = this;
    self.centers;
    self.exams;
    self.nameList;
    self.selectedExam;
    self.examsData = [];

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public functions */
    self.updateData = updateData;
    self.updatePage = updatePage;
    self.setExams = setExams;
    self.downloadCSV = downloadCSV;

    // TODO: falar com o Breno sobre os valores para os estados e nomes dos exames
    var data = {
      "columns": [
        [
          "C", // TODO: Existe alguma necessidade disso?
          "URÉIA - SANGUE"
        ],
        [
          "C",
          "CREATININA - SANGUE"
        ],
        [
          "C",
          "ASPARTATO TRANSAMINASE(TGO/AST)-SANGUE"
        ],
        [
          "C",
          "ALANINA TRANSAMINASE (TGP/ALT) - SANGUE"
        ],
        [
          "C",
          "GAMA GLUTAMIL TRANSFERASE - SANGUE"
        ],
        [
          "C",
          "ÁCIDO ÚRICO - SANGUE"
        ],
        [
          "C",
          "TRIGLICÉRIDES - SANGUE"
        ],
        [
          "C",
          "COLESTEROL TOTAL E FRAÇÕES - SANGUE"
        ],
        [
          "C",
          "ELSA B12"
        ],
        [
          "C",
          "ELSA FOLATO"
        ],
        [
          "C",
          "FERRO - SANGUE"
        ],
        [
          "C",
          "CAPACIDADE DE LIGAÇÃO DO FERRO"
        ],
        [
          "C",
          "ELSA FERRITINA"
        ],
        [
          "C",
          "ELSA TURBISORO"
        ],
        [
          "C",
          "ELSA T4 - LIVRE (TIROXINA LIVRE)"
        ],
        [
          "C",
          "ELSA ATPO - ANTICORPOS ANTI-TIREOPEROXIDASE (ATPO)"
        ],
        [
          "C",
          "ELSA INS - INSULINA JEJUM"
        ],
        [
          "C",
          "GLICOSE - SANGUE"
        ],
        [
          "C",
          "HEMOGLOBINA GLICADA - SANGUE"
        ],
        [
          "C",
          "CURVA INSULINÊMICA - 120 MIN."
        ],
        [
          "C",
          "CURVA GLICÊMICA -120 MINUTOS"
        ],
        [
          "C",
          "ELSA TURBIURINA"
        ],
        [
          "C",
          "CREATININA - URINA AMOSTRA ISOLADA"
        ],
        [
          "C",
          "SÓDIO - URINA AMOSTRA ISOLADA"
        ],
        [
          "C",
          "POTÁSSIO - URINA AMOSTRA ISOLADA"
        ],
        [
          "C",
          "CÁLCIO - URINA AMOSTRA ISOLADA"
        ],
        [
          "C",
          "ELSA TSH (HORMÔNIO TIREOESTIMULANTE)"
        ],
        [
          "C",
          "ELSA 3FT"
        ]
      ],
      "index": [
        5002453,
        5002186,
        5003304,
        5000144,
        5003520,
        5001007,
        5005283,
        5000156,
        5002768,
        5004863,
        5000966
      ],
      "data": [
        [
          1,
          null,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          null,
          null,
          1,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          null,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          null,
          null,
          null,
          null,
          null,
          1,
          null,
          null,
          1,
          null,
          null,
          null
        ],
        [
          null,
          1,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          null,
          null,
          null,
          1,
          null,
          null,
          null,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          null,
          null,
          null,
          1,
          null,
          null,
          1,
          null,
          null,
          null,
          null,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          null,
          1,
          null,
          null,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          null,
          null,
          1,
          null,
          null,
          1,
          null,
          1,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          null,
          null,
          null,
          1,
          1,
          1,
          null,
          1,
          null,
          null,
          1,
          null,
          null,
          1,
          null,
          null,
          1,
          null,
          null
        ],
        [
          1,
          null,
          null,
          1,
          null,
          1,
          1,
          1,
          1,
          null,
          null,
          1,
          null,
          1,
          null,
          null,
          1,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ]
      ]
    };

    function onInit() {
      self.ready = false;
      self.colors = ExamStatusHistoryService.getColors();
      self.labels = ExamStatusHistoryService.getLabels();
      _resetData();
      _loadDefaultData();
    }

    function updatePage(exams = null, startPage, endPage) {
      if (startPage !== undefined && endPage !== undefined) {
        self.examsData.index = self.rawActivities.index.slice(startPage, endPage + 1);
      }
      self.examsData.data = angular.copy(exams);
      self.setExams(self.examsData, self.selectedExamName);
      LoadingScreenService.finish();
    }

    function updateData(exams = null, examName = null, center) {
      if (center && center !== self.selectedCenter.acronym) {
        _loadExamsProgress(center);
        _setCenter(center);
      } else {
        if (examName !== self.selectedExamName) {
          _setExamName(examName);
          self.newExamsData = FlagReportParseData.create(self.examsData, examName)
          self.setExams(self.newExamsData, examName);
        } else if (exams && exams !== self.exams) {
          self.setExams(exams, examName);
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
            var QUERY_ACRONYM = self.selectedExamName != null ? "ACRONIMO='" + self.selectedExamName + "'" : "2=2";
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

    function _prepareForCSV() {
      return $q(function (resolve, reject) {
        alasql("DROP TABLE IF EXISTS flags");
        alasql("CREATE TABLE IF NOT EXISTS flags(RN INT,ACRONIMO STRING)");
        var rn = 0;
        if (Array.isArray(self.rawActivities.data)) {
          if (self.activitiesData.data.length > 0) {
            try {
              self.activitiesData.data.forEach(function (line) {
                for (let i = 0; i < self.activitiesData.columns.length; i++) {
                  alasql("INSERT INTO flags VALUES(" + self.activitiesData.index[rn] + ",'" + self.activitiesData.columns[i][1] + "','" + StatusHistoryService.getStatusLabel(line[i]) + "')");
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

    function _resetData() {
      self.examsData = [];
      self.selectedExam = null;
    }

    function _getStatus() {
      self.status = ExamStatusHistoryService.listStatus();
      _loadExamsProgress(self.selectedCenter.acronym);
    }

    function _loadDefaultData() {
      LoadingScreenService.start();
      self.index++;
      if (!self.centers) {
        FieldCenterRestService.loadCenters().then((result) => {
          self.centers = angular.copy(result);
          _setUserFieldCenter();
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
          throw e;
        });
      } else {
        _loadExamsProgress(self.selectedCenter.acronym);
      }
    }

    function _setUserFieldCenter() {
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

    function _loadAllNames() {
      self.index++;
      if (!self.nameList) {
        FlagReportMonitoringService.listAcronyms()
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

    function _loadExamsProgress(center) {
      self.index++;
      if (!self.exams || center !== self.selectedCenter.acronym) {
        if (center !== self.selectedCenter.acronym) self.$onInit();
        FlagReportMonitoringService.getActivitiesProgressReport(center)
          .then((response) => {
            alasql("DROP TABLE IF EXISTS flags");
            self.rawActivities = angular.copy(response);
            self.examsData = angular.copy(response);
            self.ready = true;
            self.error = false;
            // TODO: fake data
            self.rawActivities = angular.copy(data);
            self.examsData = angular.copy(data);
          }).catch((e) => {
            LoadingScreenService.finish();
            throw e;
          });
      } else {
        self.setExams(self.exams, self.selectedExamName);
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

  }
}());
