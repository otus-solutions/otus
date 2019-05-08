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
      var svg = d3.select("#exam-heatmap").selectAll("*").remove();
      var fullData = create(exams);
      var data = fullData.values;

      // var data = [{ "group": "A", "variable": "v1", "value": "30" }, { "group": "A", "variable": "v2", "value": "95" }, { "group": "A", "variable": "v3", "value": "22" }, { "group": "A", "variable": "v4", "value": "14" }, { "group": "A", "variable": "v5", "value": "59" }, { "group": "A", "variable": "v6", "value": "52" }, { "group": "A", "variable": "v7", "value": "88" }, { "group": "A", "variable": "v8", "value": "20" }, { "group": "A", "variable": "v9", "value": "99" }, { "group": "A", "variable": "v10", "value": "66" }, { "group": "B", "variable": "v1", "value": "37" }, { "group": "B", "variable": "v2", "value": "50" }, { "group": "B", "variable": "v3", "value": "81" }, { "group": "B", "variable": "v4", "value": "79" }, { "group": "B", "variable": "v5", "value": "84" }, { "group": "B", "variable": "v6", "value": "91" }, { "group": "B", "variable": "v7", "value": "82" }, { "group": "B", "variable": "v8", "value": "89" }, { "group": "B", "variable": "v9", "value": "6" }, { "group": "B", "variable": "v10", "value": "67" }, { "group": "C", "variable": "v1", "value": "96" }, { "group": "C", "variable": "v2", "value": "13" }, { "group": "C", "variable": "v3", "value": "98" }, { "group": "C", "variable": "v4", "value": "10" }, { "group": "C", "variable": "v5", "value": "86" }, { "group": "C", "variable": "v6", "value": "23" }, { "group": "C", "variable": "v7", "value": "74" }, { "group": "C", "variable": "v8", "value": "47" }, { "group": "C", "variable": "v9", "value": "73" }, { "group": "C", "variable": "v10", "value": "40" }, { "group": "D", "variable": "v1", "value": "75" }, { "group": "D", "variable": "v2", "value": "18" }, { "group": "D", "variable": "v3", "value": "92" }, { "group": "D", "variable": "v4", "value": "43" }, { "group": "D", "variable": "v5", "value": "16" }, { "group": "D", "variable": "v6", "value": "27" }, { "group": "D", "variable": "v7", "value": "76" }, { "group": "D", "variable": "v8", "value": "24" }, { "group": "D", "variable": "v9", "value": "1" }, { "group": "D", "variable": "v10", "value": "87" }, { "group": "E", "variable": "v1", "value": "44" }, { "group": "E", "variable": "v2", "value": "29" }, { "group": "E", "variable": "v3", "value": "58" }, { "group": "E", "variable": "v4", "value": "55" }, { "group": "E", "variable": "v5", "value": "65" }, { "group": "E", "variable": "v6", "value": "56" }, { "group": "E", "variable": "v7", "value": "9" }, { "group": "E", "variable": "v8", "value": "78" }, { "group": "E", "variable": "v9", "value": "49" }, { "group": "E", "variable": "v10", "value": "36" }, { "group": "F", "variable": "v1", "value": "35" }, { "group": "F", "variable": "v2", "value": "80" }, { "group": "F", "variable": "v3", "value": "8" }, { "group": "F", "variable": "v4", "value": "46" }, { "group": "F", "variable": "v5", "value": "48" }, { "group": "F", "variable": "v6", "value": "100" }, { "group": "F", "variable": "v7", "value": "17" }, { "group": "F", "variable": "v8", "value": "41" }, { "group": "F", "variable": "v9", "value": "33" }, { "group": "F", "variable": "v10", "value": "11" }, { "group": "G", "variable": "v1", "value": "77" }, { "group": "G", "variable": "v2", "value": "62" }, { "group": "G", "variable": "v3", "value": "94" }, { "group": "G", "variable": "v4", "value": "15" }, { "group": "G", "variable": "v5", "value": "69" }, { "group": "G", "variable": "v6", "value": "63" }, { "group": "G", "variable": "v7", "value": "61" }, { "group": "G", "variable": "v8", "value": "54" }, { "group": "G", "variable": "v9", "value": "38" }, { "group": "G", "variable": "v10", "value": "93" }, { "group": "H", "variable": "v1", "value": "39" }, { "group": "H", "variable": "v2", "value": "26" }, { "group": "H", "variable": "v3", "value": "90" }, { "group": "H", "variable": "v4", "value": "83" }, { "group": "H", "variable": "v5", "value": "31" }, { "group": "H", "variable": "v6", "value": "2" }, { "group": "H", "variable": "v7", "value": "51" }, { "group": "H", "variable": "v8", "value": "28" }, { "group": "H", "variable": "v9", "value": "42" }, { "group": "H", "variable": "v10", "value": "7" }, { "group": "I", "variable": "v1", "value": "5" }, { "group": "I", "variable": "v2", "value": "60" }, { "group": "I", "variable": "v3", "value": "21" }, { "group": "I", "variable": "v4", "value": "25" }, { "group": "I", "variable": "v5", "value": "3" }, { "group": "I", "variable": "v6", "value": "70" }, { "group": "I", "variable": "v7", "value": "34" }, { "group": "I", "variable": "v8", "value": "68" }, { "group": "I", "variable": "v9", "value": "57" }, { "group": "I", "variable": "v10", "value": "32" }, { "group": "J", "variable": "v1", "value": "19" }, { "group": "J", "variable": "v2", "value": "85" }, { "group": "J", "variable": "v3", "value": "53" }, { "group": "J", "variable": "v4", "value": "45" }, { "group": "J", "variable": "v5", "value": "71" }, { "group": "J", "variable": "v6", "value": "64" }, { "group": "J", "variable": "v7", "value": "4" }, { "group": "J", "variable": "v8", "value": "12" }, { "group": "J", "variable": "v9", "value": "97" }, { "group": "J", "variable": "v10", "value": "72" }];

      console.log(data);

      // set the dimensions and margins of the graph
      var margin = { top: 120, right: 25, bottom: 30, left: 100 };
      var width = window.innerWidth / 1.5;
      var height = window.innerHeight / 1.5;

      // append the svg object to the body of the page
      var svg = d3.select("#exam-heatmap")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
      var myGroups = fullData.x;
      var myVars = fullData.y;

      // Build X scales and axis:
      var x = d3.scaleBand()
        .range([0, width])
        .domain(myGroups)
        .padding(0.05);
      svg.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

      // Build Y scales and axis:
      var y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.05);
      svg.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

      // Build color scale
      var myColor = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([1, 100])

      // create a tooltip
      var tooltip = d3.select("#exam-heatmap")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

      // add the squares
      svg.selectAll()
        .data(data, function (d) { return d.group + ':' + d.variable; })
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.group) })
        .attr("y", function (d) { return y(d.variable) })
        .attr("rx", 4)
        .attr("ry", 10)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) { return myColor(d.value) })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)

    }

    function create(resp) {
      let ob = function (column, row, value) { return { group: column, variable: row, value: value } };
      let exams = resp.columns.map(column => column[1])
      let values = [];

      resp.index.forEach(participant => {
        values = values.concat(exams.map(exam => {
          return new ob(exam, participant, getRandomInt(0, 1) * 90)
        }));
      });

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      return { x: exams, y: resp.index, values: values }
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
