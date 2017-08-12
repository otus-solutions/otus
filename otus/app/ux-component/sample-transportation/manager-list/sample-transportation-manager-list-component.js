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
    '$mdDialog',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($mdDialog, laboratoryContextService, AliquotTransportationService, ApplicationStateService) {
    var self = this;
    var _confirmDeleteSelectedLots;

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
      _buildDialogs();
    }

    function handleViewInfoAction() {
      self.lotInfoComponent.show();
    }

    function handleDeleteAction() {
      $mdDialog.show(_confirmDeleteSelectedLots).then(function() {
        AliquotTransportationService.deleteLot(self.selectedLot);
        self.listComponent.updateOnDelete();
      });
    }

    function handleChangeAction() {
      laboratoryContextService.selectLot(self.selectedLots[0].toJSON())
      ApplicationStateService.activateSampleTransportationLotInfoManager();
    }

    function updateSelectedLots(selectedLots) {
      self.selectedLots = selectedLots;
    }

    function newLot() {
      ApplicationStateService.activateSampleTransportationLotInfoManager();
    }

    function _buildDialogs() {
      _confirmDeleteSelectedLots = $mdDialog.confirm()
        .title('Confirmar exclusão de Lote(s):')
        .textContent('O(s) lote(s) será(ão) excluido(s)')
        .ariaLabel('Confirmação de exclusão')
        .ok('Ok')
        .cancel('Voltar');
    }
  }
}());
