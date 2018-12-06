(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.BarChartsFactory',
    'otusjs.otus.uxComponent.QuantitativeAliquotsChartsFactory'
  ];

  function Controller(BarChartsFactory, QuantitativeAliquotsChartsFactory) {
    var self = this;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.openTabPending = openTabPending;
    self.openTabQuatitative = openTabQuatitative;
    self.openTabOrphans = openTabOrphans;
    self.openTabStorage = openTabStorage;
    /* Lifecycle methods */
    function onInit() { };

    function openTabPending() {
      if (!$("#pending-results-chart svg").length) {
        var dataset = [
          [
            {"char_title": "Pendentes","column":"FASTING_HORMONE_LOCAL","value":10},
            {"char_title": "Pendentes","column":"FASTING_GLYCEMIA_LOCAL","value":12},
            {"char_title": "Pendentes","column":"BUFFY_COAT_MG","value":5},
            {"char_title": "Pendentes","column":"POST_INSULINE_CENTRAL","value":1},
            {"char_title": "Pendentes","column":"POST_INSULINE_LOCAL","value":2},
            {"char_title": "Pendentes","column":"POST_GLYCEMIA","value":3},
            {"char_title": "Pendentes","column":"POST_SERUM","value":4},
            {"char_title": "Pendentes","column":"POST_GLYCEMIA_LOCAL","value":6},
            {"char_title": "Pendentes","column":"BIOCHEMICAL_URINE","value":10},
            {"char_title": "Pendentes","column":"URINARY_CALCIUM","value":16},
            {"char_title": "Pendentes","column":"FASTING_HORMONE","value":19}
          ]
        ];
        var colors = ["#c7453b"];
        var element = '#pending-results-chart';
        BarChartsFactory.create(dataset, element);
      }
    };

    function openTabQuatitative() {
      if (!$("#quantitative-by-aliquots svg").length) {
        var dataset = [
          [
            {"char_title": "Transportados","column":"FASTING_HORMONE_LOCAL","value":10},
            {"char_title": "Transportados","column":"FASTING_GLYCEMIA_LOCAL","value":12},
            {"char_title": "Transportados","column":"BUFFY_COAT_MG","value":5},
            {"char_title": "Transportados","column":"POST_INSULINE_CENTRAL","value":1},
            {"char_title": "Transportados","column":"POST_INSULINE_LOCAL","value":2},
            {"char_title": "Transportados","column":"POST_GLYCEMIA","value":3},
            {"char_title": "Transportados","column":"POST_SERUM","value":4},
            {"char_title": "Transportados","column":"POST_GLYCEMIA_LOCAL","value":6},
            {"char_title": "Transportados","column":"BIOCHEMICAL_URINE","value":10},
            {"char_title": "Transportados","column":"URINARY_CALCIUM","value":16},
            {"char_title": "Transportados","column":"FASTING_HORMONE","value":19}
          ],
          [
            {"char_title": "Preparados","column":"FASTING_HORMONE_LOCAL","value":15},
            {"char_title": "Preparados","column":"FASTING_GLYCEMIA_LOCAL","value":18},
            {"char_title": "Preparados","column":"BUFFY_COAT_MG","value":20},
            {"char_title": "Preparados","column":"POST_INSULINE_CENTRAL","value":15},
            {"char_title": "Preparados","column":"POST_INSULINE_LOCAL","value":10},
            {"char_title": "Preparados","column":"POST_GLYCEMIA","value":12},
            {"char_title": "Preparados","column":"POST_SERUM","value":15},
            {"char_title": "Preparados","column":"POST_GLYCEMIA_LOCAL","value":11},
            {"char_title": "Preparados","column":"BIOCHEMICAL_URINE","value":13},
            {"char_title": "Preparados","column":"URINARY_CALCIUM","value":19},
            {"char_title": "Preparados","column":"FASTING_HORMONE","value":17}
          ],
          [
            {"char_title": "Recebidos","column":"FASTING_HORMONE_LOCAL","value":9},
            {"char_title": "Recebidos","column":"FASTING_GLYCEMIA_LOCAL","value":9},
            {"char_title": "Recebidos","column":"BUFFY_COAT_MG","value":8},
            {"char_title": "Recebidos","column":"POST_INSULINE_CENTRAL","value":5},
            {"char_title": "Recebidos","column":"POST_INSULINE_LOCAL","value":4},
            {"char_title": "Recebidos","column":"POST_GLYCEMIA","value":6},
            {"char_title": "Recebidos","column":"POST_SERUM","value":8},
            {"char_title": "Recebidos","column":"POST_GLYCEMIA_LOCAL","value":9},
            {"char_title": "Recebidos","column":"BIOCHEMICAL_URINE","value":9},
            {"char_title": "Recebidos","column":"URINARY_CALCIUM","value":6},
            {"char_title": "Recebidos","column":"FASTING_HORMONE","value":5}
          ]
        ];
        var colors = ["#b33040","#d25c4d","#f2b447"]
        BarChartsFactory.create(dataset, "#quantitative-by-aliquots", colors);
      }
    };

    function openTabOrphans() {
      if (!$("#orphans-by-exam svg").length) {
        _loadDataOrphansByExam();
      }
    }

    function openTabStorage() {
      if (!$("#storage-by-exam svg").length) {
        _loadStorageDataByExam();
      }
    }



    function _loadDataQuantitativeByAliquots() {
      var data = [
        {
          'title': "FASTING_HORMONE_LOCAL",
          'transported': 10,
          'prepared': 15,
          'received': 9
        },
        {
          'title': "FASTING_GLYCEMIA_LOCAL",
          'transported': 12,
          'prepared': 18,
          'received': 9
        },
        {
          'title': "BUFFY_COAT_MG",
          'transported': 5,
          'prepared': 20,
          'received': 8
        },
        {
          'title': "POST_INSULINE_CENTRAL",
          'transported': 1,
          'prepared': 15,
          'received': 5
        },
        {
          'title': "POST_INSULINE_LOCAL",
          'transported': 2,
          'prepared': 10,
          'received': 4
        },
        {
          'title': "POST_GLYCEMIA",
          'transported': 3,
          'prepared': 12,
          'received': 6
        },
        {
          'title': "POST_SERUM",
          'transported': 4,
          'prepared': 15,
          'received': 8
        },
        {
          'title': "POST_GLYCEMIA_LOCAL",
          'transported': 6,
          'prepared': 11,
          'received': 9
        },
        {
          'title': "BIOCHEMICAL_URINE",
          'transported': 10,
          'prepared': 13,
          'received': 9
        },
        {
          'title': "URINARY_CALCIUM",
          'transported': 16,
          'prepared': 19,
          'received': 6
        },
        {
          'title': "FASTING_HORMONE",
          'transported': 19,
          'prepared': 17,
          'received': 5
        }
      ];
    };

    function _loadDataOrphansByExam() {
      var data = [
        {
          'title': "FASTING_HORMONE_LOCAL",
          'value': 10
        },
        {
          'title': "FASTING_GLYCEMIA_LOCAL",
          'value': 12
        },
        {
          'title': "BUFFY_COAT_MG",
          'value': 5
        },
        {
          'title': "POST_INSULINE_CENTRAL",
          'value': 1
        },
        {
          'title': "POST_INSULINE_LOCAL",
          'value': 2
        },
        {
          'title': "POST_GLYCEMIA",
          'value': 3
        },
        {
          'title': "POST_SERUM",
          'value': 4
        },
        {
          'title': "POST_GLYCEMIA_LOCAL",
          'value': 6
        },
        {
          'title': "BIOCHEMICAL_URINE",
          'value': 10
        },
        {
          'title': "URINARY_CALCIUM",
          'value': 16
        },
        {
          'title': "FASTING_HORMONE",
          'value': 19
        }
      ];
    };

    function _loadStorageDataByExam() {
      var data = [
        {
          'title': "FASTING_HORMONE_LOCAL",
          'value': 10
        },
        {
          'title': "FASTING_GLYCEMIA_LOCAL",
          'value': 12
        },
        {
          'title': "BUFFY_COAT_MG",
          'value': 5
        },
        {
          'title': "POST_INSULINE_CENTRAL",
          'value': 1
        },
        {
          'title': "POST_INSULINE_LOCAL",
          'value': 2
        },
        {
          'title': "POST_GLYCEMIA",
          'value': 3
        },
        {
          'title': "POST_SERUM",
          'value': 4
        },
        {
          'title': "POST_GLYCEMIA_LOCAL",
          'value': 6
        },
        {
          'title': "BIOCHEMICAL_URINE",
          'value': 10
        },
        {
          'title': "URINARY_CALCIUM",
          'value': 16
        },
        {
          'title': "FASTING_HORMONE",
          'value': 19
        }
      ];

      var svg = d3.select('#storage-by-exam').append('svg'),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

      var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

      var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

      xScale.domain(data.map(function (d) { return d.year; }));
      yScale.domain([0, d3.max(data, function (d) { return d.value; })]);

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

      g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
          return "$" + d;
        }).ticks(10));


      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.title); })
        .attr("y", function (d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.value); });

    };

    function _loadDataexamResults(params) {
      var data = [
        {
          'title': "SÓDIO...................................:",
          'value': 10
        },
        {
          'title': "CREATININA..............................:",
          'value': 12
        }
      ]
    }
  };
}());
