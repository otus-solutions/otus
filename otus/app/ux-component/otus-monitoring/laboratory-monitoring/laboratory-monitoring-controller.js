(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const WIDTH = 800;
    const COLOR_1 = '#ff6f69';
    const COLOR_2 = '#bae1ff';
    const margin = {
      top: 70,
      right: 20,
      bottom: 30,
      left: 60
    };

    var self = this;
    self.data = [];

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Lifecycle methods */
    function onInit() {
      _loadDataPendingResults();
    };

    function _loadDataPendingResults() {
      self.data = [
        {
          "chart_title": "Population",
          "unit": "billion",
          "India": 1.22,
          "China": 1.36
        },
        {
          "chart_title": "Popluation Grow Rate",
          "unit": "percentage",
          "India": 0.0131,
          "China": 0.0048
        },
        {
          "chart_title": "Tallest Building",
          "unit": "meter",
          "India": 833,
          "China": 1614
        }];


      var width = WIDTH - margin.left - margin.right;
      var height = WIDTH - margin.top - margin.bottom;
      var groups = [];
      var width = width / self.data.length - 10;
      width = width > 180 ? width : 180;
      var keys = Object.keys(self.data[0]);

      for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== "chart_title" && keys[i] !== "unit") {
          groups.push(keys[i]);
        }
      }

      for (i = 0; i < self.data.length; i++) {
        _drawPendingResultsCharts(width, width, groups, self.data[i]);
      }
    };

    function _drawPendingResultsCharts(width, height, groups, bar_data) {
      var Y_DATA_FORMAT = d3.format("");

      var Y_AXIS_LABEL = bar_data.unit;

      if (bar_data.unit === 'percentage') {
        Y_DATA_FORMAT = d3.format(".1%");
      }

      var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);

      var y = d3.scaleLinear()
        .range([height, 0]);

      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisRight(y);

      var value_data = groups.map(function (d) {
        return { x_axis: d, y_axis: bar_data[d] };
      });

      x.domain(value_data.map(function (d) { return d.x_axis; }));
      y.domain([0, d3.max(value_data, function (d) { return d.y_axis; })]);

      var svg = d3.select("#pending-results-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var detailBox = svg.append("svg:text")
        .attr("dx", "20px")
        .attr("dy", "-5px")
        .attr("text-anchor", "right")
        .style("fill", "#1D5096")
        .style("font-weight", "bold");

      var title = svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("class", "chart-title")
        .text(bar_data.chart_title);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", -25)
        .attr("x", 0)
        .style("text-anchor", "left")
        .text(Y_AXIS_LABEL);

      svg.selectAll(".bar")
        .data(value_data)
        .enter().append("rect")
        .style("fill", function (d) {
          if (d.x_axis === groups[0]) {
            return COLOR_1;
          } else {
            return COLOR_2;
          }
        })
        .attr("x", function (d) { return x(d.x_axis); })
        .attr("width", x.scaleBand())
        .attr("y", function (d) { return y(d.y_axis); })
        .attr("height", function (d) { return height - y(d.y_axis); })
        .on("mouseover", function (d, i, j) {
          detailBox.attr("x", x.range()[i] - Y_DATA_FORMAT(d.y_axis).length / 2)
            .attr("y", y(d.y_axis))
            .text(Y_DATA_FORMAT(d.y_axis))
            .style("visibility", "visible");

          d3.select(this)
            .style("opacity", 0.7);
        }).on("mouseout", function () {
          detailBox.style("visibility", "hidden");

          d3.select(this)
            .style("opacity", 1.0);
        });
    };
  }
}());
