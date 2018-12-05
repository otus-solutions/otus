(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.PendingResultsChartsFactory'
  ];

  function Controller(PendingResultsChartsFactory) {
    var self = this;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Lifecycle methods */
    function onInit() {

    };

    self.OpenTabPending = function (){
      if(!$("#pending-results-chart svg").length){
        _loadDataPendingResults();
      }
    }
    self.OpenTabQuatitative = function (){
      if(!$("#quantitative-by-aliquots svg").length){
        _loadDataQuantitativeByAliquots();
      }
    }


    function _loadDataPendingResults() {
      var data = [
        {
          'chart_title': 'Population',
          'unit': '',
          'Repetidos': 22,
          'Aguardando': 36
        },
        {
          'chart_title': 'Popluation Grow Rate',
          'unit': '',
          'Repetidos': 131,
          'Aguardando': 48
        },
        {
          'chart_title': 'Tallest Building',
          'unit': '',
          'Repetidos': 833,
          'Aguardando': 1614
        },
        {
          'chart_title': 'Sex Ratio',
          'unit': '',
          'Repetidos': 108,
          'Aguardando': 106
        },
        {
          'chart_title': 'Literacy All Gender',
          'unit': '',
          'Repetidos': 74,
          'Aguardando': 92
        },
        {
          'chart_title': 'Literacy All Male',
          'unit': '',
          'Repetidos': 82,
          'Aguardando': 96
        },
        {
          'chart_title': 'Literacy All Female',
          'unit': '',
          'Repetidos': 65,
          'Aguardando': 88
        },
        {
          'chart_title': 'Area',
          'unit': '',
          'Repetidos': 331,
          'Aguardando': 9706
        },
        {
          'chart_title': 'Area Land',
          'unit': '',
          'Repetidos': 297,
          'Aguardando': 9434
        },
        {
          'chart_title': 'Area Water',
          'unit': '',
          'Repetidos': 34,
          'Aguardando': 272
        },
        {
          'chart_title': 'Infant Mortality',
          'unit': '',
          'Repetidos': 46,
          'Aguardando': 15
        }
      ];

      _drawChartsPendingResults(data);
    };

    function _drawChartsPendingResults(data) {
      var groups = [];
      var keys = Object.keys(data[0]);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== 'chart_title' && keys[i] !== 'unit') {
          groups.push(keys[i]);
        }
      }

      for (i = 0; i < data.length; i++) {
        PendingResultsChartsFactory.create(groups, data[i]);
      }
    };

    function _loadDataQuantitativeByAliquots() {
      // Setup svg using Bostock's margin convention
      var margin = { top: 20, right: 160, bottom: 35, left: 30 };

      var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var svg = d3.select("#quantitative-by-aliquots")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      /* Data in strings like it would be if imported from a csv */
      var data = [
        { year: "2006", redDelicious: "10", mcintosh: "15", oranges: "9", pears: "6" },
        { year: "2007", redDelicious: "12", mcintosh: "18", oranges: "9", pears: "4" },
        { year: "2008", redDelicious: "05", mcintosh: "20", oranges: "8", pears: "2" },
        { year: "2009", redDelicious: "01", mcintosh: "15", oranges: "5", pears: "4" },
        { year: "2010", redDelicious: "02", mcintosh: "10", oranges: "4", pears: "2" },
        { year: "2011", redDelicious: "03", mcintosh: "12", oranges: "6", pears: "3" },
        { year: "2012", redDelicious: "04", mcintosh: "15", oranges: "8", pears: "1" },
        { year: "2013", redDelicious: "06", mcintosh: "11", oranges: "9", pears: "4" },
        { year: "2014", redDelicious: "10", mcintosh: "13", oranges: "9", pears: "5" },
        { year: "2015", redDelicious: "16", mcintosh: "19", oranges: "6", pears: "9" },
        { year: "2016", redDelicious: "19", mcintosh: "17", oranges: "5", pears: "7" },
      ];

      var parse = d3.timeParse("%m/%Y");

      // Transpose the data into layers
      var keys = ["redDelicious", "mcintosh", "oranges", "pears"];
      var dataset = d3.stack()(keys.map(function (fruit) {
        return data.map(function (d) {
          return { x: d.year, y: +d[fruit] };
        });
      }));

      // Set x, y and colors
      var x = d3.scaleBand()
        .rangeRound([10, width - 10])
        .padding(0.02);

      var y = d3.scaleLinear().rangeRound([height, 0]);

      var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];

      // Define and draw axes
      var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat(function (d) { return d });

      var xAxis = d3.axisBottom()
        .scale(x)
        .tickFormat(d3.timeParse("%m/%Y"));

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      // Create groups for each series, rects for each segment 
      var groups = svg.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function (d, i) { return colors[i]; });

      var rect = groups.selectAll("rect")
        .data(function (d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.x); })
        .attr("y", function (d) { return y(d.y0 + d.y); })
        .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
        .attr("width", x)
        .on("mouseover", function () { tooltip.style("display", null); })
        .on("mouseout", function () { tooltip.style("display", "none"); })
        .on("mousemove", function (d) {
          var xPosition = d3.mouse(this)[0] - 15;
          var yPosition = d3.mouse(this)[1] - 25;
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip.select("text").text(d.y);
        });

      // Draw legend
      var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(30," + i * 19 + ")"; });

      legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

      legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d, i) {
          switch (i) {
            case 0: return "Anjou pears";
            case 1: return "Naval oranges";
            case 2: return "McIntosh apples";
            case 3: return "Red Delicious apples";
          }
        });

      // Prep the tooltip bits, initial display is hidden
      var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

      tooltip.append("rect")
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

      tooltip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");
    };
  }
}());
