(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/manager-toolbar/lot-info-manager-toolbar-template.html',
      bindings: {
        lot: '<'
      }
    });

  Controller.$inject = [
    'otusjs.laboratory.core.ContextService',
    'otusjs.application.state.ApplicationStateService',
    '$mdDialog',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
  ];

  function Controller(laboratoryContextService, ApplicationStateService, $mdDialog, AliquotTransportationService) {
    var self = this;
    var confirmCancel;

    self.$onInit = onInit;

    self.returnToSampleTransportationDashboard = returnToSampleTransportationDashboard;
    self.newLot = newLot;
    self.changeLot = changeLot;
    self.cancel = cancel;

    function onInit() {
      _buildDialogs()
    }

    function returnToSampleTransportationDashboard() {
      $mdDialog.show(confirmCancel).then(function() {
        self.onCancel();
      });
    }

    function _buildDialogs() {
      confirmCancel = $mdDialog.confirm()
        .title('Confirmar cancelamento:')
        .textContent('As alterações realizadas no lote serão descartadas')
        .ariaLabel('Confirmação de cancelamento')
        .ok('Ok')
        .cancel('Voltar');
    }

    function newLot() {
      // TODO: Novo lote
      laboratoryContextService.selectLot();
      AliquotTransportationService.createLot(self.lot, true);
      AliquotTransportationService.createLot(self.lot, false);
    }

    function changeLot() {
      // TODO: Alterar lote
      laboratoryContextService.selectLot();
      AliquotTransportationService.alterLot(self.lot, true);
      AliquotTransportationService.alterLot(self.lot, false);
    }

    function cancel() {
      laboratoryContextService.selectLot();
      ApplicationStateService.activateSampleTransportationManagerList();
    }
  }
}());
