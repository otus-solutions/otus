(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .value('otusjs.otus.uxComponent.ActivitySharingDialogValues', {
      titles: {
        dialogToTitle: 'COMPARTILHAMENTO DE ATIVIDADE',
      },
      buttons: {
        closeSharingDialog: {
          icon: 'close',
          ariaLabel: 'Fechar',
          tooltip: 'Fechar'
        },
        deleteActivitySharing: {
          icon: 'delete',
          ariaLabel: 'Deletar',
          tooltip: 'Deletar'
        },
        renovateActivitySharing: {
          icon: 'autorenew',
          ariaLabel: 'Renovar Link',
          tooltip: 'Renovar link'
        }

      }
    })
}());