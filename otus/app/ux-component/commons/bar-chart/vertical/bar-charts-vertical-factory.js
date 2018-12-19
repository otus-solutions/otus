(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.BarChartsVerticalFactory', Factory);

  Factory.$inject = [
    "otusjs.application.color.PalleteColorService"
  ];

  function Factory(PalleteColorService) {
    var self = this;
    var labels = [];

    /* Public methods */
    self.create = create;

    function _constructor(data, keys) {
      labels = [];
      for (var j = 0; j < data.length; j++) {
        labels.push(data[j][0][keys[0]])
        for (let i = 0; i < data[j].length; i++) {
          if (!j) {
            data[j][i].position = 0;
          } else {
            data[j][i].position = data[j - 1][i][keys[2]] + data[j - 1][i].position;
          }
        }
      }
    }

    function create(dataset, element, colors) {
      if ((Array.isArray(dataset) && dataset.length) && element) {
        var keys = Object.keys(dataset[0][0]);
        _constructor(dataset, keys);
        if (Array.isArray(colors)) {
          if (!colors.length) {
            colors = [];
            labels.forEach(function (d, i) {
              colors.push(PalleteColorService.getColor(i));
            });
          }
        } else {
          colors = [];
          labels.forEach(function (d, i) {
            colors.push(PalleteColorService.getColor(i));
          });
        }

        var margin = { top: 20, right: 160, bottom: 80, left: 50 };
        var width = dataset[0].length * 120,
          height = window.innerHeight - 500;

        var svg = d3.select(element)
          .append("svg")
          .attr("width", width + (width < 240 ? 850 : 100))
          .attr("height", height + 150)
          .attr("margin", 250)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + (margin.top + 20) + ")");

        var x = d3.scaleBand()
          .domain(dataset[0].map(function (d) {
            return d[keys[1]];
          }))
          .range([20, width - 40])
          .paddingInner(0.2).round(true);

        var y = d3.scaleLinear()
          .domain([0, d3.max(dataset, function (d) {
            return d3.max(d, function (d) {
              return d.position + parseInt(d[keys[2]]);
            });
          })])
          .range([height, 0]);

        var yAxis = d3.axisLeft()
          .scale(y)
          .ticks(5)
          .tickSize(-width, 0, 0)
          .tickFormat(function (d) {
            return d
          });

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        var xAxis = d3.axisBottom()
          .scale(x)
          .ticks(2);

        svg.append("g")
          .attr("class", "x axis")
          .style("font-size", "0.7em")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis).selectAll("text").attr("transform", "translate(-40,35) rotate(-30)").attr("width", "50")

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
            .attr("class", "labelValue")
            .attr("x", function (d) {
              return x(d[keys[1]]) + Math.round(width / dataset[0].length - 80);
            })
            .attr("y", function (d) {
              return y(parseInt(d[keys[2]])) - 10;
            })
            .attr("fill", "#000")
            .attr("dx", "0.5em")
            .attr("dy", "0.5em")
            .text(function (d) {
              return parseInt(d[keys[2]]);
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
            return y(d.position + parseInt(d[keys[2]]));
          })
          .attr("height", function (d) {
            return y(d.position) - y(d.position + parseInt(d[keys[2]]));
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
            tooltip.select("text").text(d[keys[0]] + ": " + parseInt(d[keys[2]]));
          });

        var legend = svg.selectAll(".legend")
          .data(dataset)
          .enter().append("g")
          .attr("class", "legend")
          .attr("height", 500)
          .style("padding", "50")

          .attr("transform", function (d, i) {
            return "translate(" + i * 150 + ", -20)";
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

        var curYPos = 0;
        var curXPos = 0;
        var curDown = false;

        d3.selectAll("svg").on("mousedown", function () {
          curDown = true;
          curYPos = d3.event.offsetY;
          curXPos = d3.event.offsetX;
          d3.selectAll("svg").style("cursor", "all-scroll");
          d3.event.preventDefault();
        })
          .on("mouseup", function () {
            curDown = false;
            d3.selectAll("svg").style("cursor", "grab");
          })
          .on("mouseout", function () {
            curDown = false;
          }).on("mousemove", function () {
            if (curDown === true) {
              $("md-content").scrollTop(parseInt($("md-content").scrollTop() + (curYPos - d3.event.pageY)));
              $("md-content").scrollLeft(parseInt($("md-content").scrollLeft() + (curXPos - d3.event.pageX)));
            }
          }).style("cursor", 'grab');
      }
    }

    return self;
  }
}());
