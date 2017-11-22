(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotChartSubtitleTable', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/aliquots-chart-subtitle-table/chart-subtitle-table-template.html',
      bindings: {
        lotDataSet: '<'
      }
    });

  function Controller() {
    var self = this;
  }
}());
