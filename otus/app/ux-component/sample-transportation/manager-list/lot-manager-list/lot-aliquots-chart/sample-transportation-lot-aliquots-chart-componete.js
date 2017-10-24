(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotAliquotsChart', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/lot-manager-list/lot-aliquots-chart/sample-transportation-lot-aliquots-chart-template.html',
      bindings: {
        lot: '<'
      }
    });

  Controller.$inject = [
    '$timeout'
  ]
  function Controller($timeout) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.renderChart = renderChart;

    function onInit() {
      $timeout(renderChart);
    }

    function renderChart() {
      var ctx = document.getElementById(self.lot.code).getContext('2d');
      console.log(self.lot.aliquotList);
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [10, 20, 30]
          }]
        }

      });
    }
  }
}());
