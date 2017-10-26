(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('chartSubtitleTable', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/lot-manager-list/chart-subtitle-table/chart-subtitle-table-template.html',
      bindings: {
        lotDataSet: '<'
      }
    });

  function Controller() {
    var self = this;
  }
}());
