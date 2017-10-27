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
    }

    function _renderChart() {
      self.ctx = document.getElementById(self.lotDataSet.chartId).getContext('2d');
      _setFieldCenter();

      var chartBorderWidth = 0;
      if(self.lotDataSet.data.length>1){
        chartBorderWidth = 1;
      }

      var myChart = new Chart(self.ctx, {
        type: 'doughnut',
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

    function _setFieldCenter(){
      Chart.pluginService.register({
        beforeDraw: function (chart) {
          var width = chart.chart.width,
            height = chart.chart.height,
            ctx = self.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = self.lotDataSet.fieldCenter.acronym,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      });
    }
  }
}());
