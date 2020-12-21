(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryFlagReportListManagerCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$timeout',
    '$rootScope',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.monitoring.business.MonitoringService',
    'otusjs.application.exam.ExamStatusHistoryService',
    'otusjs.monitoring.business.FlagReportFilterService',
    'otusjs.laboratoryViewerService.LaboratoryViewerService'
  ];

  function Controller(
    $q,
    $timeout,
    $rootScope,
    LoadingScreenService,
    FieldCenterRestService,
    DashboardContextService,
    MonitoringService,
    ExamStatusHistoryService,
    FlagReportFilterService,
    LaboratoryViewerService) {

    const DATA_NOT_FOUND = "Não há registros a serem exibidos.";
    const GENERIC_ERROR = "Ocorreu algum problema. Por favor, tente novamente em alguns minutos.";
    const CSV_ERROR = 'Não foi possível baixar o csv. Por favor, tente novamente em alguns minutos.';
    var _amountOfElementsInPage;

    var self = this;
    self.ready;
    self.error;
    self.status;
    self.labels;
    self.colors;
    self.centers;
    self.message;
    self.rawExams;

    self.examsNameList;
    self.selectedStatus;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public functions */
    self.updateData = updateData;
    self.updatePage = updatePage;
    self.downloadCSV = downloadCSV;

    function onInit() {
      self.laboratoryExists = false;
      LaboratoryViewerService.checkExistAndRunOnInitOrBackHome(_init);
    }

    function _init() {
      self.laboratoryExists = true;
      self.ready = false;
      self.error = false;
      self.examsData = {};
      self.selectedStatus = null;
      self.examsData = {};
      self.filteredExams = {};
      self.colors = ExamStatusHistoryService.getColors();
      self.labels = ExamStatusHistoryService.getLabels();
      _loadData();
    }

    function updatePage(exams, startPage, endPage) {
      if (startPage !== undefined && endPage !== undefined) {
        self.examsData.index = self.rawExams.index.slice(startPage, endPage + 1);
        _amountOfElementsInPage = endPage;
      }
      self.examsData.data = angular.copy(exams);
      if (self.selectedExamName) {
        self.newExamsData = FlagReportFilterService.filter(angular.copy(self.examsData), self.selectedExamName);
        _setFilteredExams(self.newExamsData, self.selectedExamName, self.selectedStatus);
      } else {
        _setFilteredExams(self.examsData, self.selectedExamName, self.selectedStatus);
      }
      _buildGraph(self.selectedStatus);
    }

    function updateData(exams, examName, status, center) {
      if (center && center !== self.selectedCenter.acronym) {
        _setExamsProgress(center);
        _setCenter(center);
      } else {
        if (examName !== self.selectedExamName || status !== self.selectedStatus) {
          _setExamName(examName);
          _setStatus(status);
          if (self.selectedExamName) {
            self.newExamsData = FlagReportFilterService.filter(angular.copy(self.examsData), examName);
            _setFilteredExams(self.newExamsData);
          } else {
            _setFilteredExams(self.examsData);

          }
          _buildGraph(self.selectedStatus);
        } else if (exams && exams !== self.filteredExams) {
          _setFilteredExams(exams);
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

    function _prepareForCSV() {
      return $q(function (resolve, reject) {
        alasql("DROP TABLE IF EXISTS flagsExams");
        alasql("CREATE TABLE IF NOT EXISTS flagsExams(RN INT,NOME STRING, STATUS STRING)");
        var rn = 0;
        if (Array.isArray(self.rawExams.data)) {
          if (self.rawExams.data.length > 0) {
            try {
              self.rawExams.data.forEach(function (line) {
                for (let i = 0; i < self.rawExams.columns.length; i++) {
                  alasql("INSERT INTO flagsExams VALUES(" + self.rawExams.index[rn] + ",'" + self.rawExams.columns[i][1] + "','" + ExamStatusHistoryService.getStatusLabel(line[i]) + "')");
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
        });
      } else {
        _setExamsProgress(self.selectedCenter.acronym);
      }
    }

    function _setDefaultData() {
      DashboardContextService.getLoggedUser().then((userData) => {
        var { acronym } = userData.fieldCenter;
        if (!acronym) {
          self.centers.length > 0 ? _setCenter(self.centers[0].acronym) : self.selectedCenter = {acronym: ""};
        } else {
          self.centers = [].concat(self.centers.find((center) => {
            return center.acronym === userData.fieldCenter.acronym;
          }));
          _setCenter(userData.fieldCenter.acronym);
        }
        _setExamNames(self.selectedCenter.acronym);
        _setExamsProgress(self.selectedCenter.acronym);
        _getStatus();
      }).catch(function (e) {
        self.ready = false;
        self.error = true;
        self.message = GENERIC_ERROR;
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
        }).catch((e) => {
          LoadingScreenService.finish();
        });
      }
    }

    function _setExamsProgress(center) {
      if (!self.filteredExams || center !== self.selectedCenter.acronym) {
        LoadingScreenService.start();
        if (center !== self.selectedCenter.acronym){
          _init();
        }
        MonitoringService.getExamsProgressReport(center).then((response) => {
          alasql("DROP TABLE IF EXISTS flagsExams");
          self.rawExams = angular.copy(response);
          self.examsData = angular.copy(response);
          self.ready = true;
          self.error = false;
          _clearBasicFilters();
          LoadingScreenService.finish();
        }).catch((e) => {
          self.ready = false;
          self.error = true;
          self.message = DATA_NOT_FOUND;
          LoadingScreenService.finish();
        });
      } else {
        _setFilteredExams(self.filteredExams);
        self.ready = true;
        self.error = false;
      }
    }

    function _buildGraph(status) {
      if (typeof self.filteredExams === "object") {
        self.filteredExams.hasOwnProperty('data') ? _heatmap_display(angular.copy(self.filteredExams), status): _notFoundMessage();
      } else if (typeof self.examsData === "object") {
        self.examsData.hasOwnProperty('data') ? _heatmap_display(angular.copy(self.examsData), status) : _notFoundMessage();
      } else {
        _notFoundMessage();
      }
    }

    function _notFoundMessage() {
      $("#heatmap-not-found").html("<div style=\"text-align: center;\" flex layout-align='center center' layout='row'> <span class='md-display-1' flex>Não há dados para exibir o gráfico.</span></div>");
    }

    function _heatmap_display(exams, status) {
      let heatmapId = "#exam-heatmap";
      let CELL_SIZE = 25;
      var svg = d3.select(heatmapId).selectAll("*").remove();

      var tooltip = d3.select(heatmapId)
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden");

      var horizontalTranslation = 1920 / 15;
      var verticalTranslation = window.innerHeight / 2.5;

      var viewerWidth = 1920;
      self.viewerHeight = CELL_SIZE * self.examsData.data.length + verticalTranslation + 30;
      var legendHeight = 70;
      var legendElementWidth = CELL_SIZE * 4.5;
      var svg;

      //==================================================

      var arr = exams.data;
      var row_number = arr.length;
      var col_number = arr[0] ? arr[0].length : 0;

      svg = d3.select(heatmapId)
        .append("svg")
        .attr("width", viewerWidth)
        .attr("height", self.viewerHeight)
        .append("g")
        .attr("transform", "translate(" + horizontalTranslation + "," + verticalTranslation + ")");

      svg.append('defs')
        .append('pattern')
        .attr('id', 'diagonalHatch')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 4)
        .append('path')
        .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
        .attr('stroke', '#FFF')
        .attr('stroke-width', 1);

      var rowSortOrder = false;
      var colSortOrder = false;

      var rowLabels = svg.append("g")
        .attr("class", "rowLabels")
        .selectAll(".rowLabel")
        .data(exams.index)
        .enter().append("text")
        .text(function (d) {
          return d.count > 1 ? d.join("/") : d;
        })
        .attr("x", 0)
        .attr("y", function (d, i) {
          return (i * CELL_SIZE);
        })
        .style("text-anchor", "end")
        .attr("transform", function (d, i) {
          return "translate(-3," + CELL_SIZE / 1.5 + ")";
        })
        .attr("class", "rowLabel mono")
        .attr("id", function (d, i) {
          return "rowLabel_" + i;
        })
        .on('mouseover', function (d, i) {
          d3.select('#rowLabel_' + i).classed("hover", true);
        })
        .on('mouseout', function (d, i) {
          d3.select('#rowLabel_' + i).classed("hover", false);
        })
        .on("click", function (d, i) {
          rowSortOrder = !rowSortOrder;
          _sortByValues("r", i, rowSortOrder);
          d3.select("#order").property("selectedIndex", 0);
        });

      var colLabels = svg.append("g")
        .attr("class", "colLabels")
        .selectAll(".colLabel")
        .data(exams.columns)
        .enter().append("text")
        .text(function (d) {
          d.shift();
          return d.count > 1 ? d.reverse().join("/") : d.reverse();
        })
        .attr("x", 0)
        .attr("y", function (d, i) {
          return (i * CELL_SIZE);
        })
        .style("text-anchor", "left")
        .attr("transform", function (d, i) {
          return "translate(" + CELL_SIZE / 2 + ", -3) rotate(-90) rotate(45, 0, " + (i * CELL_SIZE) + ")";
        })
        .attr("class", "colLabel mono")
        .attr("style", "cursor:pointer")
        .attr("id", function (d, i) {
          return "colLabel_" + i;
        })
        .on('mouseover', function (d, i) {
          d3.select('#colLabel_' + i).classed("hover", true);
        })
        .on('mouseout', function (d, i) {
          d3.select('#colLabel_' + i).classed("hover", false);
        })
        .on("click", function (d, i) {
          colSortOrder = !colSortOrder;
          _sortByValues("c", i, colSortOrder);
          d3.select("#order").property("selectedIndex", 0);
        });

      //Index to lines to d3
      var lineIndexOne = -1;
      var lineIndexTwo = -1;
      var lineIndexThree = -1;

      var row = svg.selectAll(".row")
        .data(exams.data)
        .enter().append("g")
        .attr("id", function (d) {
          return d.idx;
        })
        .attr("class", "row");

      var j = 0;
      var heatMap = row.selectAll(".cell")
        .data(function (d) {
          j++;
          return d;
        })
        .enter().append("svg:rect")
        .attr("x", function (d, i) {
          return i * CELL_SIZE;
        })
        .attr("y", function (d, i) {
          if (i == 0) {
            lineIndexOne++;
          }
          return lineIndexOne * CELL_SIZE;
        })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", function (d, i) {
          if (i == 0) {
            lineIndexTwo++;
          }
          return "cell bordered cr" + lineIndexTwo + " cc" + i;
        })
        .attr("row", function (d, i) {
          if (i == 0) {
            lineIndexThree++;
          }
          return lineIndexThree;
        })
        .attr("col", function (d, i) {
          return i;
        })
        .attr("width", CELL_SIZE)
        .attr("height", CELL_SIZE)
        .style("fill", function (d) {
          if (!ExamStatusHistoryService.getStatusColor(status)) {
            return ExamStatusHistoryService.getStatusColor(d);
          } else if (d == status) {
            return ExamStatusHistoryService.getStatusColor(d);
          } else {
            return ExamStatusHistoryService.getDefaultColor();
          }
        })
        .on('mouseover', function (d, i) {
          var j = d3.select(this).attr("row");
          d3.select('#colLabel_' + i).classed("hover", true);
          d3.select('#rowLabel_' + j).classed("hover", true);
          tooltip.style("visibility", "visible");
        })
        .on('mouseout', function (d, i) {
          var j = d3.select(this).attr("row");
          d3.select('#colLabel_' + i).classed("hover", false);
          d3.select('#rowLabel_' + j).classed("hover", false);
          tooltip.style("visibility", "hidden");
        })
        .on("mousemove", function (d, i) {
          tooltip.style("top", (d3.event.pageY - 320) + "px").style("left", (d3.event.pageX - 75) + "px");
        });

      var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(0,-300)")
        .selectAll(".legendElement")
        .data(self.labels)
        .enter().append("g")
        .attr("class", "legendElement");

      legend.append("svg:rect")
        .attr("x", function (d, i) {
          return legendElementWidth * i;
        })
        .attr("y", legendHeight)
        .attr("class", "cellLegend bordered")
        .attr("width", legendElementWidth)
        .attr("height", CELL_SIZE / 2)
        .style("fill", function (d, i) {
          return self.colors[i];
        });

      legend.append("text")
        .attr("class", "mono legendElement")
        .text(function (d) {
          return d;
        })
        .attr("x", function (d, i) {
          return legendElementWidth * i;
        })
        .attr("y", legendHeight + CELL_SIZE);

      function _sortByValues(rORc, i, sortOrder) {
        var t = svg.transition().duration(1000);
        var values = [];
        var sorted;
        d3.selectAll(".c" + rORc + i)
          .filter(function (d) {
            if (d != null) values.push(d);
            else values.push(-999);
          });

        if (rORc == "r") {
          sorted = d3.range(col_number).sort(function (a, b) {
            if (sortOrder) {
              return values[b] - values[a];
            } else {
              return values[a] - values[b];
            }
          });
          t.selectAll(".cell")
            .attr("x", function (d) {
              var col = parseInt(d3.select(this).attr("col"));
              return sorted.indexOf(col) * CELL_SIZE;
            });
          t.selectAll(".colLabel")
            .attr("y", function (d, i) {
              return sorted.indexOf(i) * CELL_SIZE;
            })
            .attr("transform", function (d, i) {
              return "translate(" + CELL_SIZE / 2 + ", -3) rotate(-90) rotate(45, 0, " + (sorted.indexOf(i) * CELL_SIZE) + ")";
            });
        } else { // sort on rows
          sorted = d3.range(row_number).sort(function (a, b) {
            if (sortOrder) {
              return values[b] - values[a];
            } else {
              return values[a] - values[b];
            }
          });
          t.selectAll(".cell")
            .attr("y", function (d) {
              var row = parseInt(d3.select(this).attr("row"));
              return sorted.indexOf(row) * CELL_SIZE;
            });
          t.selectAll(".rowLabel")
            .attr("y", function (d, i) {
              return sorted.indexOf(i) * CELL_SIZE;
            })
            .attr("transform", function (d, i) {
              return "translate(-3," + CELL_SIZE / 1.5 + ")";
            });
        }
      }

      d3.select("#order").on("change", function () {
        var newOrder = d3.select("#order").property("value");
        _changeOrder(newOrder, heatmapId);
      });

      d3.select("#palette")
        .on("keyup", function () {
          var newPalette = d3.select("#palette").property("value");
          if (newPalette != null)
            changePalette(newPalette, heatmapId);
        })
        .on("change", function () {
          var newPalette = d3.select("#palette").property("value");
          changePalette(newPalette, heatmapId);
        });
    }

    function _changeOrder(newOrder, heatmapId) {
      var svg = d3.select(heatmapId);
      var t = svg.transition().duration(1000);
      if (newOrder == "sortinit_col") {
        t.selectAll(".cell")
          .attr("x", function (d) {
            var col = parseInt(d3.select(this).attr("col"));
            return col * CELL_SIZE;
          });
        t.selectAll(".colLabel")
          .attr("y", function (d, i) {
            return i * CELL_SIZE;
          })
          .attr("transform", function (d, i) {
            return "translate(" + CELL_SIZE / 2 + ", -3) rotate(-90) rotate(45, 0, " + (i * CELL_SIZE) + ")";
          });
      } else if (newOrder == "sortinit_row") {
        t.selectAll(".cell")
          .attr("y", function (d) {
            var row = parseInt(d3.select(this).attr("row"));
            return row * CELL_SIZE;
          });
        t.selectAll(".rowLabel")
          .attr("y", function (d, i) {
            return i * CELL_SIZE;
          })
          .attr("transform", function (d, i) {
            return "translate(-3," + CELL_SIZE / 1.5 + ")";
          });
      } else if (newOrder == "sortinit_col_row") {
        t.selectAll(".cell")
          .attr("x", function (d) {
            var col = parseInt(d3.select(this).attr("col"));
            return col * CELL_SIZE;
          })
          .attr("y", function (d) {
            var row = parseInt(d3.select(this).attr("row"));
            return row * CELL_SIZE;
          });
        t.selectAll(".colLabel")
          .attr("y", function (d, i) {
            return i * CELL_SIZE;
          })
          .attr("transform", function (d, i) {
            return "translate(" + CELL_SIZE / 2 + ", -3) rotate(-90) rotate(45, 0, " + (i * CELL_SIZE) + ")";
          });
        t.selectAll(".rowLabel")
          .attr("y", function (d, i) {
            return i * CELL_SIZE;
          })
          .attr("transform", function (d, i) {
            return "translate(-3," + CELL_SIZE / 1.5 + ")";
          });
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
    }

    function _setFilteredExams(filteredExams) {
      self.filteredExams = filteredExams;
    }

    function _clearBasicFilters() {
      $rootScope.$broadcast('clear');
    }

  }

}());
