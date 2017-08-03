(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationManagerList', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/sample-transportation-manager-list-template.html',
      bindings: {
        lots: "<"
      }
    });

  Controller.$inject = [
    '$stateParams',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($stateParams, ApplicationStateService) {
    var self = this;
    self.selectedLots;

    self.lotAdder = lotAdder;
    self.$onInit = onInit;
    self.updateSelectedLots = updateSelectedLots;
    self.handleViewInfoAction = handleViewInfoAction;
    self.handleDeleteAction = handleDeleteAction;

    function onInit() {
      self.selectedLots = [];
      console.log($stateParams);
    }

    function handleViewInfoAction() {
      self.lotInfoComponent.show();
    }

    function handleDeleteAction() {
      self.listComponent.updateOnDelete();
    }

    function updateSelectedLots(selectedLots) {
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
