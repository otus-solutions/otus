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
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(AliquotTransportationService, ApplicationStateService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.selectedLots;
    self.newLot = newLot;
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
      console.log('handleDeleteAction');
      console.log(self.selectedLots);
      AliquotTransportationService.deleteLot(self.selectedLots,true);
      AliquotTransportationService.deleteLot(self.selectedLots,false);
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
  }
}());
