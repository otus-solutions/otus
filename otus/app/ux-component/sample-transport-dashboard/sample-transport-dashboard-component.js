(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('sampleTransportDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transport-dashboard/sample-transport-dashboard-template.html'
    });

  function Controller() {
    var self = this;
  }
}());
