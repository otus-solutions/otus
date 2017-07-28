(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardSampleTransportDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-sample-transport-display/dashboard-sample-transport-display-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;
  }
}());
