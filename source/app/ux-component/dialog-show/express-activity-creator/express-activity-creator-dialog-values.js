(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .value('otusjs.otus.uxComponent.ExpressActivityCreatorDialogValues', {
      titles: {
        dialogToTitle: 'CRIADOR DE ATIVIDADES',
        ativitity: 'Atividade',
        participant: 'Participante',
        externalIDNotRequired: 'ID Externo não requerido',
        checker: 'Aferidor(a)',
        realizationDate: 'Data de Realização'
      },
      buttons: {
        closeDialog: {
          icon: 'close',
          ariaLabel: 'Fechar',
          tooltip: 'Fechar'
        },
        createActivity: {
          title: 'CRIAR',
          arialLabel: 'criar atividade'
        }
      },
      inputLabel: {
        type: 'Tipo',
        category: 'Categoria',
        externalID: 'ID Externo'
      },
      ariaLabel: {
        activityType: 'Tipo de Atividades'
      },
      validator: {
        required: 'Campo obrigatório'
      },
      placeholder: {
        checker: 'Selecione Aferidor(a)'
      }
    })

}());