(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.BarChartsHorizontalFactory', Factory);

  Factory.$inject = [
    "otusjs.application.color.PalleteColorService"
  ];

  function Factory(PalleteColorService) {
    var self = this;

    /* Public methods */
    self.create = create;

    function create(dataset, element, color) {
      var colors = [];
      if ((Array.isArray(dataset) && dataset.length) && element) {
          if (color === undefined || color === null) {
              colors.push(PalleteColorService.getColor(0));
          } else {
              // colors.push(PalleteColorService.getColor(color));
              colors.push(color);
          }

        var keys = Object.keys(dataset[0]);

        var margin = {top: 20, right: 50, bottom: 30, left: 50},
          width = window.innerWidth - 400,
          height = (dataset.length * 50) - margin.top - margin.bottom;

        var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.2);

        var x = d3.scaleLinear()
          .range([0, width /1.2]);

        var svg = d3.select(element).append("svg")
          .attr("width", width + margin.right + margin.left)
          .attr("height", height + margin.top + margin.bottom)
          .style("margin-right", 80)
          .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        dataset.forEach(function (d) {
          d[keys[1]] = +d[keys[1]];
        });

        x.domain([0, d3.max(dataset, function (d) {
          return d[keys[1]];
        })])
        y.domain(dataset.map(function (d) {
          return d[keys[0]];
        }));

        var groups = svg.selectAll(".bar")
          .data(dataset)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("width", function (d) {
            return x(d[keys[1]]);
          })
          .attr("y", function (d) {
            return y(d[keys[0]]);
          })
          .attr("height", y.bandwidth())
          .attr("transform", "translate(200,0)")
          .on("mousemove", function (d) {
            var xPosition = d3.mouse(this)[0] + 185;
            var yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d[keys[1]]);
          })
          .on("mouseover", function () {
            tooltip.style("display", null);
            $(this).css("opacity", "0.5");
          })
          .on("mouseout", function () {
            tooltip.style("display", "none");
            $(this).css("opacity", "1");

          })
          .style("fill", function () {
            return colors[0];
          });

        svg.append("g")
          .attr("transform", "translate(200," + height + ")")
          .call(d3.axisBottom(x));

        svg.append("g")
          .attr("transform", "translate(200,0)")
          .call(d3.axisLeft(y));

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
      } else {
        if (element) $(element).html("<h1 style='text-align:center;padding:50px'>Não foi possível construir o gráfico! Dados inválidos.</h1>");
      }
    }

    return self;
  }
}());
