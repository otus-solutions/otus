(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotAliquotsChart', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/lot-manager-list/lot-aliquots-chart/sample-transportation-lot-aliquots-chart-template.html',
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

    function onInit() {
      Chart.defaults.global.tooltips.enabled = false;
      $timeout(_renderChart);
      console.log(self.lotDataSet.labels);
    }

    function _renderChart() {
      var ctx = document.getElementById(self.lotDataSet.chartId).getContext('2d');

      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: self.lotDataSet.labels,
          datasets: [{
            backgroundColor: self.lotDataSet.backgroundColor,
            data: self.lotDataSet.data,
            borderWidth: 0
          }]
        },
        options: {
          legend: {
            display: false
          },
          tooltips: {
            display: false,
            custom: function (tooltipModel) {
              var tooltipEl = document.getElementById('chartjs-tooltip'+self.lotDataSet.chartId);
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
                var tableRoot = tooltipEl.querySelector('span');
                tableRoot.innerHTML = innerHtml;
              }

              tooltipEl.style.opacity = 1;
              tooltipEl.style.fontFamily = tooltipModel._fontFamily;
              tooltipEl.style.fontSize = tooltipModel.fontSize;
              tooltipEl.style.fontStyle = tooltipModel._fontStyle;
            }
          }
        }
      });
    }
  }
}());
