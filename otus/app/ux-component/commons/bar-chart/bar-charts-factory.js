(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.BarChartsFactory', Factory);

  function Factory() {
    var self = this;
    var labels = [];
    const COLOR_PALLETE = ["#00796B","#604a2f","#7a5e38","#af9c6d","#9a8a63","#f9eb6a","#c9bd5b","#343434","#9bc6c2","#9a5419","#e88023","#26338c","#415ad0"];
    var COLORS = angular.copy(COLOR_PALLETE);


    /* Public methods */
    self.create = create;

    function _generate_colors() {
      let index = Math.floor(Math.random() * COLORS.length);
      let color = COLORS[index];
      COLORS.splice(index, 1);
      return color;
    }

    function _constructor(data, keys){
      for (var j = 0; j < data.length; j++) {
        labels.push(data[j][0][keys[0]])
        for (let i = 0; i < data[j].length; i++) {
          if(!j){
            data[j][i].position = 0;
          } else {
            data[j][i].position = data[j-1][i][keys[2]] + data[j-1][i].position;
          }
        }
      }
    }

    function create(dataset, element, colors) {
      console.log(colors)
      if ((Array.isArray(dataset) && dataset.length) && element) {
        var keys = Object.keys(dataset[0][0]);
        _constructor(dataset , keys);
        if (Array.isArray(colors)) {
          if (!colors.length) {
            colors = [];
            labels.forEach(function () {
              colors.push(_generate_colors());
            });
          }
        } else {
          colors = [];
          labels.forEach(function () {
            colors.push(_generate_colors());
          });
        }

        COLORS = angular.copy(COLOR_PALLETE);

        var margin = {top: 20, right: 160, bottom: 100, left: 30};
        var width = window.innerWidth - 80,
          height = window.innerHeight - 400;

        width = width < 960 ? 1500 : width;

        var svg = d3.select(element)
          .append("svg")
          .attr("width", width)
          .attr("height", height + margin.top + margin.bottom)
          .attr("padding", 100)
          .attr("margin", 100)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleBand()
          .domain(dataset[0].map(function (d) {
            return d[keys[1]];
          }))
          .range([20, width - 40])
          .paddingInner(0.2).round(true);

        var y = d3.scaleLinear()
          .domain([0, d3.max(dataset, function (d) {
            return d3.max(d, function (d) {
              return d.position + d[keys[2]];
            });
          })])
          .range([height, 0]);

        var yAxis = d3.axisLeft()
          .scale(y)
          .ticks(3)
          .tickSize(-width, 0, 0)
          .tickFormat(function (d) {
            return d
          });

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        var xAxis = d3.axisBottom()
          .scale(x)
          .ticks(6);

        svg.append("g")
          .attr("class", "x axis")
          .style("font-size", "0.6em")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        var groups = svg.selectAll("g.cost")
          .data(dataset)
          .enter().append("g")
          .attr("class", "cost")
          .style("fill", function (d, i) {
            return colors[i];
          });

        if (labels.length === 1) {
          var number = groups.selectAll('text')
            .data(function (d) {
              return d;
            })
            .enter()
            .append("text")
            .attr("x", function (d) {
              return x(d[keys[1]]) + Math.round(width / 40);
            })
            .attr("y", function (d) {
              return y(d[keys[2]]) - 10;
            })
            .attr("fill", "#000")
            .attr("dx", "0.5em")
            .attr("dy", "0.5em")
            .text(function (d) {
              return d[keys[2]];
            });
        }

        var rect = groups.selectAll("rect")
          .data(function (d) {
            return d;
          })
          .enter()
          .append("rect")
          .attr("x", function (d) {
            return x(d[keys[1]]);
          })
          .attr("y", function (d) {
            return y(d.position + d[keys[2]]);
          })
          .attr("height", function (d) {
            return y(d.position) - y(d.position + d[keys[2]]);
          })
          .attr("width", x.bandwidth())
          .on("mouseover", function () {
            tooltip.style("display", null);
          })
          .on("mouseout", function () {
            tooltip.style("display", "none");
          })
          .on("mousemove", function (d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d[keys[0]]+": "+d[keys[2]]);
          });

        var legend = svg.selectAll(".legend")
          .data(dataset)
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function (d, i) {
            return "translate(" + i * 150 + ", 0)";
          });

        legend.append("rect")
          .attr("x", 50)
          .attr("y", -25)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function (d, i) {
            return colors[i];
          });

        legend.append("text")
          .attr("x", 75)
          .attr("y", -13)
          .attr("dy", ".35em")
          .style("text-anchor", "start")
          .text(function (d, i) {
            return labels[i]
          });

        var tooltip = svg.append("g")
          .attr("class", "tooltip")
          .style("display", "none");

        tooltip.append("rect")
          .attr("width", 0)
          .attr("height", 20)
          .attr("fill", "white")
          .style("opacity", 0.5);

        tooltip.append("text")
          .attr("x", 15)
          .attr("dy", "1.2em")
          .style("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("font-weight", "bold");
      }
    }

    return self;
  }
}());
