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
      _loadDataPendingResults();
    };

    function _loadDataPendingResults() {
      var data = [
        {
          "chart_title": "Population",
          "unit": "",
          "Repetidos": 22,
          "Aguardando": 36
        },
        {
          "chart_title": "Popluation Grow Rate",
          "unit": "",
          "Repetidos": 131,
          "Aguardando": 48
        },
        {
          "chart_title": "Tallest Building",
          "unit": "",
          "Repetidos": 833,
          "Aguardando": 1614
        },
        {
          "chart_title": "Sex Ratio",
          "unit": "",
          "Repetidos": 108,
          "Aguardando": 106
        },
        {
          "chart_title": "Literacy All Gender",
          "unit": "",
          "Repetidos": 74,
          "Aguardando": 92
        },
        {
          "chart_title": "Literacy All Male",
          "unit": "",
          "Repetidos": 82,
          "Aguardando": 96
        },
        {
          "chart_title": "Literacy All Female",
          "unit": "",
          "Repetidos": 65,
          "Aguardando": 88
        },
        {
          "chart_title": "Area",
          "unit": "",
          "Repetidos": 331,
          "Aguardando": 9706
        },
        {
          "chart_title": "Area Land",
          "unit": "",
          "Repetidos": 297,
          "Aguardando": 9434
        },
        {
          "chart_title": "Area Water",
          "unit": "",
          "Repetidos": 34,
          "Aguardando": 272
        },
        {
          "chart_title": "Infant Mortality",
          "unit": "",
          "Repetidos": 46,
          "Aguardando": 15
        }
      ];

      _drawPendingResultsCharts(data);
    };

    function _drawPendingResultsCharts(data) {
      var groups = [];
      var keys = Object.keys(data[0]);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== "chart_title" && keys[i] !== "unit") {
          groups.push(keys[i]);
        }
      }

      for (i = 0; i < data.length; i++) {
        PendingResultsChartsFactory.create(groups, data[i]);
      }
    };
  }
}());
