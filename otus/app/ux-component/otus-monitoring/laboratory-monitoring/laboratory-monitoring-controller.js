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
    /* Public methods */
    self.openTabPending = openTabPending;
    self.openTabQuatitative = openTabQuatitative;
    /* Lifecycle methods */
    function onInit() { };

    function openTabPending() {
      if (!$("#pending-results-chart svg").length) {
        _loadDataPendingResults();
      }
    };

    function openTabQuatitative() {
      if (!$("#quantitative-by-aliquots svg").length) {
        _loadDataQuantitativeByAliquots();
      }
    };

    function _loadDataPendingResults() {
      var data = [
        {
          'chart_title': 'Population',
          'Repetidos': 22,
          'Aguardando': 36
        },
        {
          'chart_title': 'Popluation Grow Rate',
          'Repetidos': 131,
          'Aguardando': 48
        },
        {
          'chart_title': 'Tallest Building',
          'Repetidos': 833,
          'Aguardando': 1614
        },
        {
          'chart_title': 'Sex Ratio',
          'Repetidos': 108,
          'Aguardando': 106
        },
        {
          'chart_title': 'Literacy All Gender',
          'Repetidos': 74,
          'Aguardando': 92
        },
        {
          'chart_title': 'Literacy All Male',
          'Repetidos': 82,
          'Aguardando': 96
        },
        {
          'chart_title': 'Literacy All Female',
          'Repetidos': 65,
          'Aguardando': 88
        },
        {
          'chart_title': 'Area',
          'Repetidos': 331,
          'Aguardando': 9706
        },
        {
          'chart_title': 'Area Land',
          'Repetidos': 297,
          'Aguardando': 9434
        },
        {
          'chart_title': 'Area Water',
          'Repetidos': 34,
          'Aguardando': 272
        },
        {
          'chart_title': 'Infant Mortality',
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
      var data = [
        { transportados: 5, preparados: 10, recebidos: 22 },
        { transportados: 4, preparados: 12, recebidos: 28 },
        { transportados: 2, preparados: 19, recebidos: 32 },
        { transportados: 7, preparados: 23, recebidos: 35 },
        { transportados: 23, preparados: 17, recebidos: 43 },
      ];
      
      var w = 800,
        h = 400,
        padding = 40;

      var fruits = Object.keys(data[0]);

      var colors = d3.scaleOrdinal(d3.schemeCategory10);

      var xScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([padding, w - padding])
        .paddingInner(0.05);

      var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
          var total = 0;
          for (var i = 0; i < fruits.length; i++) {
            total += d[fruits[i]];
          }
          return total;
        })])
        .range([h - padding, 0]);

      var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(6);

      var stack = d3.stack()
        .keys(fruits)
        .order(d3.stackOrderDescending);

      var series = stack(data);

      var svg = d3.select('#quantitative-by-aliquots').append('svg')
        .attr('width', w)
        .attr('height', h)

      var groups = svg.selectAll('g')
        .data(series)
        .enter()
        .append('g')
        .style('fill', function (d, i) {
          return colors(i);
        });

      var rects = groups.selectAll('rect')
        .data(function (d) { return d; })
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
          return xScale(i);
        })
        .attr('y', function (d) {
          return yScale(d[1]);
        })
        .attr('height', function (d) {
          return yScale(d[0]) - yScale(d[1]);
        })
        .attr('width', xScale.bandwidth());

      svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + padding + ', 0)')
        .call(yAxis);

      var legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + (padding + 12) + ', 0)');

      legend.selectAll('rect')
        .data(fruits)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', function (d, i) {
          return i * 18;
        })
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', function (d, i) {
          return colors(i);
        });

      legend.selectAll('text')
        .data(fruits)
        .enter()
        .append('text')
        .text(function (d) {
          return d;
        })
        .attr('x', 18)
        .attr('y', function (d, i) {
          return i * 18;
        })
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'hanging');
    };
  };
}());
