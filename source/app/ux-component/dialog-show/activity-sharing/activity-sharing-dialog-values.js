(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .value('otusjs.otus.uxComponent.ActivitySharingDialogValues', {
      titles: {
        dialogToTitle: 'COMPARTILHAMENTO DE ATIVIDADE',
        ativitity: 'Atividade',
        participant: 'Participante',
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
          arialLabel: "copiar mensagem com link"
        }
      },
      toaster: {
        successDelete: 'Link Removido com sucesso',
        failMsgDelete: 'Erro: Não foi possível deletar link',
        failMsgGetLink: 'Erro: Não foi possível requisitar link',
        failMsgRenovate: 'Erro: Não foi renovar link',
        copyLink: 'Link copiado!',
        copyMsg: 'Mensagem copiada!'
      }
    })
}());