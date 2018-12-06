(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.PendingResultsChartFactory', Factory);

  function Factory() {
    const COLOR = {
      REPEATED: '#ff6f69',
      WAITING: '#bae1ff'
    };
    const MARGIN = {
      TOP: 70,
      RIGHT: 20,
      BOTTOM: 30,
      LEFT: 60
    };
    const WIDTH = 300;

    var self = this;
    /* Public methods */
    self.create = create;

    function create(groups, data) {
      var width = WIDTH - MARGIN.LEFT - MARGIN.RIGHT;
      var height = WIDTH - MARGIN.TOP - MARGIN.BOTTOM;
      var width = width / data.length - 10;
      width = width > 180 ? width : 180;
      var Y_DATA_FORMAT = d3.format('');
      var Y_AXIS_LABEL = data.unit;

      if (data.unit === 'percentage') {
        Y_DATA_FORMAT = d3.format('.1%');
      };

      var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.3);

      var y = d3.scaleLinear()
        .range([height, 0]);

      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisLeft(y);

      var value_data = groups.map(function (d) {
        return { x_axis: d, y_axis: data[d] };
      });

      x.domain(value_data.map(function (d) { return d.x_axis; }));
      y.domain([0, d3.max(value_data, function (d) { return d.y_axis; })]);

      var svg = d3.select('#pending-results-chart').append('svg')
        .attr('width', width + MARGIN.LEFT + MARGIN.RIGHT)
        .attr('height', height + MARGIN.TOP + MARGIN.BOTTOM)
        .append('g')
        .attr('transform', 'translate(' + MARGIN.LEFT + ',' + MARGIN.TOP + ')');

      var detailBox = svg.append('svg:text')
        .attr('dx', '20px')
        .attr('dy', '-5px')
        .attr('text-anchor', 'RIGHT')
        .style('fill', '#1D5096')
        .style('font-weight', 'bold');

      var title = svg.append('text')
        .attr('x', 5)
        .attr('y', -25)
        .attr('class', 'chart-title')
        .text(data.title);

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(180)')
        .attr('y', -25)
        .attr('x', -50)
        .style('text-anchor', 'LEFT')
        .text(Y_AXIS_LABEL);

      svg.selectAll('.bar')
        .data(value_data)
        .enter().append('rect')
        .style('fill', function (d) {
          if (d.x_axis === groups[0]) {
            return COLOR.REPEATED;
          } else {
            return COLOR.WAITING;
          }
        })
        .attr('x', function (d) { return x(d.x_axis); })
        .attr('width', x.bandwidth())
        .attr('y', function (d) { return y(d.y_axis); })
        .attr('height', function (d) { return height - y(d.y_axis); })
        .on('mouseover', function (d, i, j) {
          detailBox.attr('x', x(d.x_axis) - 8)
            .attr('y', y(d.y_axis))
            .text(Y_DATA_FORMAT(d.y_axis))
            .style('visibility', 'visible');

          d3.select(this)
            .style('opacity', 0.7);
        }).on('mouseout', function () {
          detailBox.style('visibility', 'hidden');

          d3.select(this)
            .style('opacity', 1.0);
        });
    };

    return self;
  }
}());
