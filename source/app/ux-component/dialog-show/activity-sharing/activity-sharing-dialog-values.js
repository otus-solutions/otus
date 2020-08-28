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
        },
        copyLink: {
          icon: "content_copy",
          ariaLabel: 'Copiar Link',
          tooltip: 'Copiar Link'
        },
        copyMessageWithLink: {
          titleActivity: "copiar informações de compartilhamento",
          titleInactivity: "Link expirado",
        }
      },
      toaster: {
        delete: 'Link Removido com sucesso',
        fail: 'Ocorreu um erro:'


      }
    })
}());