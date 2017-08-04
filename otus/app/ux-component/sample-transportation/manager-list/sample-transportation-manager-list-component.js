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

    self.lotAdder = lotAdder;
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

    }

    function updateSelectedLots(selectedLots) {
      self.selectedLots = selectedLots;
    }

    function lotAdder() {
      ApplicationStateService.activateSampleTransportationLotInfoManager();
    }

    function getLots() {
      console.log(self.lots);
    }
  }
}());
