(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/manager-toolbar/lot-info-manager-toolbar-template.html',
      bindings: {
        onAddLot: '&',
        onSaveLot: '&',
        onCancel: '&'
      }
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    '$mdDialog'
  ];

  function Controller(ApplicationStateService, $mdDialog) {
    var self = this;
    var confirmCancel;

    self.$onInit = onInit;

    self.returnToSampleTransportationDashboard = returnToSampleTransportationDashboard;

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

  }
}());
