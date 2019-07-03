(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusFlagReportVisualizationCtrl', Controller);

  Controller.$inject = ['otusjs.application.activity.StatusHistoryService'];

  function Controller(StatusHistoryService) {
    var self = this;
    var _amountOfElementsInPage;
    self.activitiesData;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      constructor();
      self.onUpdate = constructor;
      $(window).resize(function () {
        constructor();
      })
    }

    function constructor(activities = null) {
      self.activitiesData = activities ? activities : self.activitiesData;
      _amountOfElementsInPage = self.activitiesData.data.length;
      let heatMapId = "#heatmap";
      if (self.activitiesData.columns && self.activitiesData.index && self.activitiesData.data) {
        heatmap_display(angular.copy(self.activitiesData), heatMapId);
      } else {
        $(heatMapId).html("<div style=\"text-align: center;\" flex layout='row'> <h1 flex>Não foi possível apresentar o gráfico</h1></div>");
      }
    }

    function heatmap_display(json, heatmapId) {
      var svg = d3.select(heatmapId).selectAll("*").remove();

      var tooltip = d3.select(heatmapId)
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden");

      //==================================================
      var CELL_SIZE = 24;
      var columnsCount = self.activitiesData.columns.length;
      var totalCellSize = CELL_SIZE * columnsCount;

      var scale = window.innerWidth / 1440;
      var translation = window.innerWidth / 15;
      var innerWidth = window.innerWidth;
      var verticalTranslation = window.innerHeight / 4;

      var contentWidth = ((totalCellSize + translation) * scale) + translation;
      var viewerWidth = contentWidth > innerWidth ? contentWidth : innerWidth;
      var viewerPosTop = 200;

      var legendElementWidth = CELL_SIZE * 3.2;
      var legendElementHeight = CELL_SIZE / 2;

      var contentHeight = ((CELL_SIZE*_amountOfElementsInPage + verticalTranslation) * scale);
      var viewerHeight = contentHeight > window.innerHeight ? contentHeight : window.innerHeight;

      var colors = self.colorsRange;
      var svg;

      //==================================================

      var arr = json.data;
      var row_number = arr.length;
      var col_number = arr[0] ? arr[0].length : 0;

      svg = d3.select(heatmapId)
        .append("svg")
        .attr("width", viewerWidth)
        .attr("height", viewerHeight)
        .append("g")
        .attr("transform", "translate(" + translation + "," + window.innerHeight / 7 + ")scale(" + window.innerWidth / 1440 + ")");

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
        .data(json.index)
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
          sortByValues("r", i, rowSortOrder);
          d3.select("#order").property("selectedIndex", 0);
        });

      var colLabels = svg.append("g")
        .attr("class", "colLabels")
        .selectAll(".colLabel")
        .data(json.columns)
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
          sortByValues("c", i, colSortOrder);
          d3.select("#order").property("selectedIndex", 0);
        });

      //Index to lines to d3 
      var lineIndexOne = -1;
      var lineIndexTwo = -1;
      var lineIndexThree = -1;

      var row = svg.selectAll(".row")
        .data(json.data)
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
          if (d != null) return StatusHistoryService.getStatusColor(d);
          else return "url(#diagonalHatch)";
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
        .data(self.legendRange)
        .enter().append("g")
        .attr("class", "legendElement");

      legend.append("svg:rect")
        .attr("x", function (d, i) {
          return legendElementWidth * i;
        })
        .attr("y", viewerPosTop)
        .attr("class", "cellLegend bordered")
        .attr("width", legendElementWidth)
        .attr("height", legendElementHeight)
        .style("fill", function (d, i) {
          return colors[i];
        });

      legend.append("text")
        .attr("class", "mono legendElement")
        .text(function (d) {
          return d;
        })
        .attr("x", function (d, i) {
          return legendElementWidth * i;
        })
        .attr("y", viewerPosTop + CELL_SIZE);

      function sortByValues(rORc, i, sortOrder) {
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
        changeOrder(newOrder, heatmapId);
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

    function changeOrder(newOrder, heatmapId) {
      var svg = d3.select(heatmapId);
      var t = svg.transition().duration(1000);
      if (newOrder == "sortinit_col") {
        t.selectAll(".cell")
          .attr("x", function (d) {
            var col = parseInt(d3.select(this).attr("col"));
            return col * cellSize;
          });
        t.selectAll(".colLabel")
          .attr("y", function (d, i) {
            return i * cellSize;
          })
          .attr("transform", function (d, i) {
            return "translate(" + cellSize / 2 + ", -3) rotate(-90) rotate(45, 0, " + (i * cellSize) + ")";
          });
      } else if (newOrder == "sortinit_row") {
        t.selectAll(".cell")
          .attr("y", function (d) {
            var row = parseInt(d3.select(this).attr("row"));
            return row * cellSize;
          });
        t.selectAll(".rowLabel")
          .attr("y", function (d, i) {
            return i * cellSize;
          })
          .attr("transform", function (d, i) {
            return "translate(-3," + cellSize / 1.5 + ")";
          });
      } else if (newOrder == "sortinit_col_row") {
        t.selectAll(".cell")
          .attr("x", function (d) {
            var col = parseInt(d3.select(this).attr("col"));
            return col * cellSize;
          })
          .attr("y", function (d) {
            var row = parseInt(d3.select(this).attr("row"));
            return row * cellSize;
          });
        t.selectAll(".colLabel")
          .attr("y", function (d, i) {
            return i * cellSize;
          })
          .attr("transform", function (d, i) {
            return "translate(" + cellSize / 2 + ", -3) rotate(-90) rotate(45, 0, " + (i * cellSize) + ")";
          });
        t.selectAll(".rowLabel")
          .attr("y", function (d, i) {
            return i * cellSize;
          })
          .attr("transform", function (d, i) {
            return "translate(-3," + cellSize / 1.5 + ")";
          });
      }
    }


  }
})()
