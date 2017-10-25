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
      var ctx = document.getElementById(self.lotDataSet.chartId).getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            backgroundColor: self.lotDataSet.backgroundColor,
            data: self.lotDataSet.data
          }]
        }
      });
    }
  }
}());
