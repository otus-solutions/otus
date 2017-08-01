(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationDashboardDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/dashboard-display/sample-transportation-dashboard-display-template.html'
    });

  Controller.$inject = [
    'otusjs.laboratory.business.transportation.AliquotTransportationService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(AliquotTransportationService, ApplicationStateService) {
    var self = this;

    self.lotAdder = lotAdder;

    function lotAdder() {
      ApplicationStateService.activateSampleTransportationLotAdder();
    }

    function getLots() {
      self.lots = AliquotTransportationService.loadLots();
      console.log(self.lots);
    }

  }
}());
