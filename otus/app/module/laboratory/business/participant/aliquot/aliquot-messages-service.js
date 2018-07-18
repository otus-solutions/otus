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

    self.showExitDialog = showExitDialog;
    self.showSaveDialog = showSaveDialog;
    self.showDeleteDialog = showDeleteDialog;
    self.showToast = showToast;
    self.showNotRemovedDialog = showNotRemovedDialog;

    function showExitDialog(msg) {
      var message = msg || 'Alíquotas alteradas serão descartadas.';
      return $mdDialog.show($mdDialog.confirm()
        .title('Descartar Alterações?')
        .textContent(message)
        .ariaLabel('Confirmação de cancelamento')
        .ok('Continuar')
        .cancel('Cancelar'));
    }

    function showSaveDialog(msg) {
      var message = msg || 'Deseja salvar as alterações?';
      return $mdDialog.show($mdDialog.confirm()
        .title('Confirmar Aliquotagem')
        .textContent(message)
        .ariaLabel('Confirmação de finalização')
        .ok('Ok')
        .cancel('Voltar'));
    }

    function showDeleteDialog(msg) {
      var message = msg || "A exclusão desta alíquota será um procedimento irreversível! Deseja realmente excluir?";
      return $mdDialog.show($mdDialog.confirm()
        .title('ATENÇÃO')
        .textContent(message)
        .ariaLabel('Confirmação de exclusão')
        .ok('Ok')
        .cancel('Voltar'));
    }

    function showNotRemovedDialog(msg) {
      return $mdDialog.show($mdDialog.confirm()
        .title('ALÍQUOTA NÃO REMOVIDA')
        .htmlContent(_buildMessage(msg))
        .ariaLabel('Confirmação de leitura')
        .ok('Ok'));
    }

    function _buildMessage(msg) {
      var message = "<br>A alíquota se encontra em: <br><br><ul>";
      if(msg.transportationLot){
        message = message + "<li>Lote de Transporte (" + msg.transportationLot + ")</li>";
      }

      if(msg.examLot){
        message = message + "<li>Lote de Exames (" + msg.examLot + ")</li>";
      }

      if(msg.examResult){
        message = message + "<li>Existem Resultados com essa alíquota!</li>";
      }
      message = message + '</ul>';

      return message;
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
