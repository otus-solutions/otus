(function() {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantMessagesService', Service);

  Service.$inject = [
    '$mdDialog',
    '$mdToast'
  ];

  function Service($mdDialog, $mdToast) {
    var self = this;

    var _exitDialog;
    var _saveDialog;
    self.showClearDialog = showClearDialog;
    self.showSaveDialog = showSaveDialog;
    self.showNotSave = showNotSave;
    self.showToast = showToast;

    function showClearDialog() {
      return $mdDialog.show($mdDialog.confirm()
        .title('Descartar Alterações?')
        .textContent('Todos os campos disponíveis serão apagados! Deseja realmente realizar este procedimento?')
        .ariaLabel('Confirmação de cancelamento')
        .ok('Continuar')
        .cancel('Cancelar'));
    }

    function showSaveDialog() {
      return $mdDialog.show($mdDialog.confirm()
        .title('Confirmar novo Participante')
        .textContent('Deseja salvar as alterações?')
        .ariaLabel('Confirmação de finalização')
        .ok('Ok')
        .cancel('Voltar'));
    }

    function showNotSave(errorMessage) {
      var rn = errorMessage.match(/\d+/g);
      var msg = 'Ocorreu um problema na inserção de participante.'
      if (rn[0]) {
        msg = 'Número de recrutamento ' + rn[0] + ' já existente.'
      }
      return $mdDialog.show($mdDialog.confirm()
        .title('Não foi possível salvar')
        .textContent(msg)
        .ariaLabel('Confirmação de finalização')
        .ok('Ok')
        .cancel('Voltar'));
    }

    function showToast(msg, delay) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position("right bottom")
        .hideDelay(delay)
      );
    }

  }

}());
