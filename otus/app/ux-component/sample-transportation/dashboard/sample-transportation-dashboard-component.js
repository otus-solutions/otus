(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('sampleTransportationDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/dashboard/sample-transportation-dashboard-template.html',
      bindings: {
        lots: '<'
      }
    });

  function Controller() {
    var self = this;

    // lifecycle hooks
    self.$onInit = onInit;


    function onInit() {
    }
  }
}());
