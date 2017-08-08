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
    'otusjs.application.state.ApplicationStateService',
    '$mdDialog'
  ];

  function Controller($stateParams, ApplicationStateService, $mdDialog) {
    var self = this;
    var confirmCancel;

    self.$onInit = onInit;

    self.returnToSampleTransportationDashboard = returnToSampleTransportationDashboard;

    function onInit() {
      _buildDialogs()
      self.selectedLot = $stateParams.selectedLot;
    }

    function returnToSampleTransportationDashboard() {
      $mdDialog.show(confirmCancel).then(function() {
        ApplicationStateService.activateSampleTransportationManagerList();
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

  }
}());
