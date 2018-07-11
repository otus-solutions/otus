(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant.aliquot')
    .service('otusjs.laboratory.business.participant.aliquot.AliquotMessagesService', Service);

  Service.$inject = [
    '$mdDialog',
    '$mdToast'
  ];

  function Service($mdDialog, $mdToast) {
    var self = this;

    var _exitDialog;
    var _saveDialog;
    var _deleteDialog;

    self.showExitDialog = showExitDialog;
    self.showSaveDialog = showSaveDialog;
    self.showDeleteDialog = showDeleteDialog;
    self.showToast = showToast;


    _init();

    function _init() {
      _exitDialog = $mdDialog.confirm()
        .title('Descartar Alterações?')
        .textContent('Alíquotas alteradas serão descartadas.')
        .ariaLabel('Confirmação de cancelamento')
        .ok('Continuar')
        .cancel('Cancelar');

      _saveDialog = $mdDialog.confirm()
                .title('Confirmar Aliquotagem')
                .textContent('Deseja salvar as alterações?')
                .ariaLabel('Confirmação de finalização')
                .ok('Ok')
                .cancel('Voltar');

      _deleteDialog = $mdDialog.confirm()
        .title('Confirmar exclusão de alíquota')
        .textContent('Deseja salvar as alterações?')
        .ariaLabel('Confirmação de finalização')
        .ok('Ok')
        .cancel('Voltar');
    }

    function showExitDialog() {
      return $mdDialog.show(_exitDialog);
    }

    function showSaveDialog() {
      return $mdDialog.show(_saveDialog);
    }
    function showDeleteDialog() {
      return $mdDialog.show(_deleteDialog);
    }

    function showToast(msg, delay) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(delay)
      );
    }


  }

}());
