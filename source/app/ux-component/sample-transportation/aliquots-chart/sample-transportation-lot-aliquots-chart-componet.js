(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotAliquotsChart', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/aliquots-chart/sample-transportation-lot-aliquots-chart-template.html',
      bindings: {
        lotDataSet: '<'
      }
    });

  Controller.$inject = [
    '$timeout'
  ];

  function Controller($timeout) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.$onChanges = onChanges;

    function onInit() {
      Chart.defaults.global.tooltips.enabled = false;
      $timeout(_renderChart);
    }

    function onChanges(){
      if(self.myChart){
        self.myChart.destroy();
        _renderChart();
      }
    }

    function _renderChart() {
      self.ctx = document.getElementById('aliquot'.concat(self.lotDataSet.chartId)).getContext('2d');
      var chartBorderWidth = 0;
      if(self.lotDataSet.data.length>1){
        chartBorderWidth = 1;
      }

      self.myChart = new Chart(self.ctx, {
        type: 'pie',
        data: {
          labels: self.lotDataSet.labels,
          datasets: [{
            backgroundColor: self.lotDataSet.backgroundColor,
            data: self.lotDataSet.data,
            borderWidth: chartBorderWidth
          }]
        },
        options: {
          legend: {
            display: false
          },
          tooltips: {
            display: true,
            custom: function (tooltipModel) {
              var tooltipEl = document.getElementById('chartjs-tooltip'.concat(self.lotDataSet.chartId));
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              function getBody(bodyItem) {
                return bodyItem.lines;
              }

              if (tooltipModel.body) {
                var bodyLines = tooltipModel.body.map(getBody);
                var innerHtml = '';
                bodyLines.forEach(function (body) {
                  innerHtml = body;
                });
                var tableRoot = tooltipEl.querySelector('.chartjs-tooltip-key'.concat(self.lotDataSet.chartId));
                tableRoot.innerHTML = innerHtml;
              }

              tooltipEl.style.opacity = 1;
              tooltipEl.style.fontFamily = "Roboto";
              tooltipEl.style.fontSize = tooltipModel.fontSize;
              tooltipEl.style.fontStyle = tooltipModel._fontStyle;
            }
          }
        }
      });
    }
  }
}());
