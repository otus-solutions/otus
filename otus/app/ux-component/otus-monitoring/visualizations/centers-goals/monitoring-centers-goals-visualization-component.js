(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('monitoringCentersGoalsVisualizationComponent', {
      controller: Controller,
      templateUrl: 'app/ux-component/otus-monitoring/visualizations/centers-goals/monitoring-centers-goals-visualization-template.html',
      bindings: {
        selectedLots: '=',
        csvData: '=',
        createCentersGoalsChart: '=',
        centers: '='
      }
    });

  Controller.$inject = [
    '$filter'
  ];

  function Controller($filter) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.centers = $filter('orderBy')(self.centers);
      self.createCentersGoalsChart = createCentersGoalsChart;
    }

    function createCentersGoalsChart(qData) {
      var _cumulativeInfo = [];
      var _lengthOfdata = qData.data.length;
      for (var i = 0; i < _lengthOfdata; i++) {
        var total = (qData.data[i].data.reduce(function(a, b) {
          return a + b;
        }, 0));
        _cumulativeInfo[i] = {
          label: qData.data[i].label,
          data: [(total / qData.data[i].goal) * 100, 100 - ((total / qData.data[i].goal) * 100)],
          backgroundColor: [qData.data[i].backgroundColor, 'rgba(250, 250, 250, 0.5)'],
          borderColor: [qData.data[i].borderColor, 'rgba(240, 240, 240, 1)'],
          borderWidth: 1
        };
      }

      if (!self.chart) {
        var ctx = document.getElementById("centersGoalsDoughnutChart");
        self.chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: _cumulativeInfo
          },
          options: {
            maintainAspectRatio: true,
            cutoutPercentage: 40,
            title: {
              display: true,
              fontSize: 20,
              text: 'Porcentagem de Participantes Contemplados por Centro'
            },
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: function(t, d) {
                  return d.datasets[t.datasetIndex].label +
                    ": " +
                    (d.datasets[t.datasetIndex].data[t.index].toFixed(2)) +
                    "%";
                }
              }
            }
          }
        });
      } else {
        self.chart.data.datasets = (_cumulativeInfo);
        self.chart.update();
      }
    }
  }
}());
