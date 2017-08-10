(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/manager-toolbar/sample-transportation-manager-toolbar-template.html',
      bindings: {
        onViewInfo: '&',
        onDelete: '&',
        onChangeLot: '&',
        selectedLots: '<'
      }
    });

  Controller.$inject = [
    '$mdDialog'
  ];

  function Controller($mdDialog) {
    var self = this;
    var confirmDeleteSelectedLots;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.details = details;
    self.deleteSelectedLots = deleteSelectedLots;
    self.changeSelectedLot = changeSelectedLot;

    function onInit() {
      _buildDialogs()
    }

    function details() {
      self.onViewInfo();
    }

    function deleteSelectedLots() {
      $mdDialog.show(confirmDeleteSelectedLots).then(function() {
        self.onDelete();
      });
    }

    function changeSelectedLot() {
      self.onChangeLot();
    }

    function _buildDialogs() {
      confirmDeleteSelectedLots = $mdDialog.confirm()
        .title('Confirmar exclusão de Lote(s):')
        .textContent('O(s) lote(s) será(ão) excluido(s)')
        .ariaLabel('Confirmação de exclusão')
        .ok('Ok')
        .cancel('Voltar');
    }
  }
}());
