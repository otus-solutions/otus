(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/manager-toolbar/lot-info-manager-toolbar-template.html',
      bindings: {
        onAddLot: '&',
        onSaveLot: '&'
      }
    });

  Controller.$inject = [
    '$stateParams',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($stateParams,ApplicationStateService) {
    var self = this;

    self.$onInit = onInit;

    self.returnToSampleTransportationDashboard = returnToSampleTransportationDashboard;

    function onInit() {
      self.selectedLot = $stateParams.selectedLot;
    }

    function returnToSampleTransportationDashboard() {
      ApplicationStateService.activateSampleTransportationManagerList();
    }
  }
}());
