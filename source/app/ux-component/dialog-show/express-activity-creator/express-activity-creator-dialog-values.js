(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .value('otusjs.otus.uxComponent.ExpressActivityCreatorDialogValues', {
        titles: {
        dialogToTitle: 'CRIADOR DE ATIVIDADES',
        ativitity: 'Atividade',
        participant: 'Participante',
      },
      buttons: {
        closeDialog: {
          icon: 'close',
          ariaLabel: 'Fechar',
          tooltip: 'Fechar'
        },
        deleteActivity: {
          icon: 'delete',
          ariaLabel: 'Deletar',
          tooltip: 'Deletar'
        },
        renovateActivity: {
          icon: 'autorenew',
          ariaLabel: 'Renovar Link',
          tooltip: 'Renovar link'
        },
        copyLink: {
          icon: "content_copy",
          ariaLabel: 'Copiar Link',
          tooltip: 'Copiar Link'
        },
        createActivity: {
          title: "CRIAR",
          arialLabel: "criar atividade"
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