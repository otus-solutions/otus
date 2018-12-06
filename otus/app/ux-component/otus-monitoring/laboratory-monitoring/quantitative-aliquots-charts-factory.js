(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.QuantitativeAliquotsChartsFactory', Factory);

  function Factory() {
    const REPEATED = '#ff6f69';
    const WAITING = '#bae1ff';
    const WIDTH = 300;
    const MARGIN = {
      TOP: 70,
      RIGHT: 20,
      BOTTOM: 30,
      LEFT: 60
    };

    var self = this;
    /* Public methods */
    self.create = create;

    function create(data, title) {
      var margin = {top: 20, right: 160, bottom: 35, left: 30};

      var width = window.innerWidth - 80,
        height = window.innerHeight - 300;

      const TRANSPORTED = "Transportados";
      const PREPARED = "Preparados";
      const RECEIVED = "Transportados";
      const COLORS = {
        "TRANSPORTED": "#b33040",
        "PREPARED": "#d25c4d",
        "RECEIVED": "#f2b447",
      };

      var svg = d3.select("#quantitative-by-aliquots")
        .append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom)
        .attr("padding", 100)
        .attr("margin", 100)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var dataset = [
        [
          {"column":"redDelicious","value":10,"position":0},
          {"column":"mcintosh","value":12,"position":0},
          {"column":"oranges","value":5,"position":0},
          {"column":"pears","value":1,"position":0},
          {"column":"teste8","value":2,"position":0},
          {"column":"teste7","value":3,"position":0},
          {"column":"teste6","value":4,"position":0},
          {"column":"teste5","value":6,"position":0},
          {"column":"teste4","value":10,"position":0},
          {"column":"teste3","value":16,"position":0},
          {"column":"teste2","value":19,"position":0}
          ],
        [
          {"column":"redDelicious","value":15,"position":10}, // position = position + value (anterior)
          {"column":"mcintosh","value":18,"position":12},
          {"column":"oranges","value":20,"position":5},
          {"column":"pears","value":15,"position":1},
          {"column":"teste8","value":10,"position":2},
          {"column":"teste7","value":12,"position":3},
          {"column":"teste6","value":15,"position":4},
          {"column":"teste5","value":11,"position":6},
          {"column":"teste4","value":13,"position":10},
          {"column":"teste3","value":19,"position":16},
          {"column":"teste2","value":17,"position":19}
          ],
        [
          {"column":"redDelicious","value":9,"position":25},
          {"column":"mcintosh","value":9,"position":30},
          {"column":"oranges","value":8,"position":25},
          {"column":"pears","value":5,"position":16},
          {"column":"teste8","value":4,"position":12},
          {"column":"teste7","value":6,"position":15},
          {"column":"teste6","value":8,"position":19},
          {"column":"teste5","value":9,"position":17},
          {"column":"teste4","value":9,"position":23},
          {"column":"teste3","value":6,"position":35},
          {"column":"teste2","value":5,"position":36}
          ]
      ];

      var x = d3.scaleBand()
        .domain(dataset[0].map(function(d) { return d.column; }))
        .range([40, width - 40])
        .paddingInner(0.05).round(true);

      var y = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.position + d.value; });  })])
        .range([height, 0]);

      var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat( function(d) { return d } );

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(6);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      var groups = svg.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function(d, i) {
          switch (i) {
            case 0: return COLORS.TRANSPORTED;
            case 1: return COLORS.PREPARED;
            case 2: return COLORS.RECEIVED;
          }
        });

      var rect = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.column); })
        .attr("y", function(d) { return y(d.position + d.value); })
        .attr("height", function(d) { return y(d.position) - y(d.position + d.value); })
        .attr("width", x.bandwidth())
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
          var xPosition = d3.mouse(this)[0] - 15;
          var yPosition = d3.mouse(this)[1] - 25;
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip.select("text").text(d.value);
        });

      var legend = svg.selectAll(".legend")
        .data(dataset)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + i * 150 + ", 0)"; });

      legend.append("rect")
        .attr("x",  50)
        .attr("y",-25)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) {
          switch (i) {
            case 0: return COLORS.TRANSPORTED;
            case 1: return COLORS.PREPARED;
            case 2: return COLORS.RECEIVED;
          }
        });

      legend.append("text")
        .attr("x", 75)
        .attr("y", -13)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d, i) {
          switch (i) {
            case 0: return TRANSPORTED;
            case 1: return PREPARED;
            case 2: return RECEIVED;
          }
        });

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

    return self;
  }
}());
