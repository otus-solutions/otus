(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationDashboardDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/dashboard-display/sample-transportation-dashboard-display-template.html',
      bindings:{
        lots: "<"
      }
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;
    self.selectedLots;

    self.lotAdder = lotAdder;
    self.$onInit = onInit;
    self.selectLot = selectLot;

    function onInit() {
      self.selectedLots = [];
    }

    function selectLot(selectedLots) {
      self.selectedLots = selectedLots;
    }

    function lotAdder() {
      ApplicationStateService.activateSampleTransportationLotAdder();
    }

    function getLots() {
      console.log(self.lots);
    }
  }
}());
