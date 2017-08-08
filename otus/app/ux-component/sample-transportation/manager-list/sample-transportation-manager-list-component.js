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
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;
    self.selectedLots;

    self.newLot = newLot;
    self.$onInit = onInit;
    self.updateSelectedLots = updateSelectedLots;
    self.handleViewInfoAction = handleViewInfoAction;
    self.handleDeleteAction = handleDeleteAction;
    self.handleChangeAction = handleChangeAction;

    function onInit() {
      self.selectedLots = [];
    }

    function handleViewInfoAction() {
      self.lotInfoComponent.show();
    }

    function handleDeleteAction() {
      self.listComponent.updateOnDelete();
    }

    function handleChangeAction() {
      ApplicationStateService.activateSampleTransportationLotInfoManager(self.lots, self.selectedLots[0]);
    }

    function updateSelectedLots(selectedLots) {
      self.selectedLots = selectedLots;
    }

    function newLot() {
      ApplicationStateService.activateSampleTransportationLotInfoManager(self.lots);
    }

    function getLots() {
      console.log(self.lots);
    }
  }
}());
