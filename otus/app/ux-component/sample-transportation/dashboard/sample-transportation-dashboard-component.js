(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('sampleTransportationDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/dashboard/sample-transportation-dashboard-template.html'
    });

  function Controller() {
    var self = this;
  }
}());
