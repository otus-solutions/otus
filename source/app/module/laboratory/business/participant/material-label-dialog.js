(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant')
    .service('otusjs.laboratory.business.participant.MaterialLabelDialog', Service);

  Service.$inject = [
    '$mdDialog',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Service($mdDialog, DialogService) {

      var self = this

      self.$onInit = onInit;
      self.showConfirmCancelDialog = showConfirmCancelDialog

      function onInit() {
      }

      function showConfirmCancelDialog() {
        return DialogService.showDialog(self.confirmCancel);
      }

      self.buttons = [
        {
          message: 'Ok',
          action: function () {
            $mdDialog.hide()
          },
          class: 'md-raised md-primary'
        },
        {
          message: 'Voltar',
          action: function () {
            $mdDialog.cancel()
          },
          class: 'md-raised md-no-focus'
        }
      ];

    self.confirmCancel = {
      dialogToTitle: 'Cancelamento',
      titleToText: 'Confirmar cancelamento:',
      textDialog: 'Alterações não finalizadas serão descartadas.',
      ariaLabel: 'Confirmação de cancelamento',
      buttons: self.buttons
    };


  }
}())