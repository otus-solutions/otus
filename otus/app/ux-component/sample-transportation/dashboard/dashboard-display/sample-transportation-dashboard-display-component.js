(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationDashboardDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/dashboard/dashboard-display/sample-transportation-dashboard-display-template.html',
    });

  function Controller() {
    var self = this;
  }
}());
