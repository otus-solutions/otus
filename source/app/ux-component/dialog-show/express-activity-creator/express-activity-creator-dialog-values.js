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
        createActivity: {
          title: "CRIAR",
          arialLabel: "criar atividade"
        }
      }
    })

}());