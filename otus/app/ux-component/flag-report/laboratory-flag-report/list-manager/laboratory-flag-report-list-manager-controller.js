(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryFlagReportListManagerCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$timeout',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.monitoring.business.MonitoringService',
    'otusjs.application.exam.ExamStatusHistoryService',
    'otusjs.monitoring.business.FlagReportFilterService'
  ];

  function Controller($q, $timeout, LoadingScreenService, FieldCenterRestService, DashboardContextService, MonitoringService, ExamStatusHistoryService, FlagReportFilterService) {
    const CELL_SIZE = 25;
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
      _buildGraph();
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
      _buildGraph();
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
        MonitoringService.getExamsName(center).then((examNames) => {
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
        MonitoringService.getExamsProgressReport(center).then((response) => {
          alasql("DROP TABLE IF EXISTS flagsExams");
          self.rawExams = angular.copy(response);
          self.examsData = angular.copy(response);
          self.ready = true;
          self.error = false;
          self.setExams(undefined);
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

    function _buildGraph() {
      self.examsData = self.exams ? self.exams : self.examsData;
      if (self.examsData.columns && self.examsData.index && self.examsData.data) {
        _heatmap_display(angular.copy(self.examsData), "#exam-heatmap", "Spectral");
      } else {
        $("#exam-heatmap").html("<div style=\"text-align: center;\" flex layout='row'> <h1 flex>Não foi possível apresentar o gráfico</h1></div>");
      }
    }

    function _heatmap_display(exams) {
      var svg = d3.select("#exam-heatmap").selectAll("*").remove(); // TODO: Rever, mapa sendo chamado mais de uma vez!
      var fakeData = _createFakeData(exams);

      var margin = { top: 170, right: 100, bottom: 100, left: 100 };
      var xAxisData = fakeData.x;
      var yAxisData = fakeData.y;
      var gridSize = 15;
      var width = xAxisData.length * gridSize;
      var height = yAxisData.length * gridSize;

      var svg = d3.select("#exam-heatmap")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .call(d3.zoom().on("zoom", function () {
          svg.attr("transform", d3.event.transform)
        }))
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


      var yAxis = svg.selectAll(".yAxis")
        .data(fakeData.y)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", "yAxis");


      var xAxis = svg.selectAll(".xAxis")
        .data(fakeData.x)
        .enter().append("svg:g")
      xAxis.append("text")
        .text(function (d) { return d; })
        .style("text-anchor", "start")
        .attr("x", 6)
        .attr("y", 7)
        .attr("class", "xAxis")
        .attr("transform", function (d, i) { return "translate(" + i * gridSize + ", -6) rotate(-45)" });

      //vertical lines
      svg.selectAll(".vline").data(d3.range(xAxisData.length + 1)).enter()
        .append("line")
        .attr("x1", function (d) {
          return d * gridSize;
        }).attr("x2", function (d) {
          return d * gridSize;
        }).attr("y1", function (d) {
          return 0;
        }).attr("y2", function (d) {
          return height;
        }).style("stroke", "#eee"); // TODO: deixar mais agradavél!

      // horizontal lines
      svg.selectAll(".hline")
        .data(d3.range(yAxisData.length + 1)).enter()
        .append("line")
        .attr("y1", function (d) {
          return d * gridSize;
        }).attr("y2", function (d) {
          return d * gridSize;
        }).attr("x1", function (d) {
          return 0;
        }).attr("x2", function (d) {
          return width;
        }).style("stroke", "#eee"); // TODO: deixar mais agradavél!

    }

    function _createFakeData(data) {
      let ob = function (column, row, value) { return { group: column, variable: row, value: value } };
      let exams = data.columns.map(column => column[1])
      let values = [];

      data.index.forEach(participant => {
        values = values.concat(exams.map(exam => {
          return new ob(exam, participant, getRandomInt(0, 1))
        }));
      });

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      return { x: exams, y: data.index, values: values }
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
