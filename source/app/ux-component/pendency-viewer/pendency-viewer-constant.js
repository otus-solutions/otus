(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('PENDENCY_VIEWER_LABELS', {
      PAGE_TITLE:'Visualizador de Pendências',

      RN: 'Recrutamento',
      REQUESTER:'Solicitante',
      RECEIVER: 'Responsável',
      ACRONYM: 'Formulário',
      EXTERNAL_ID: 'ID',
      DUE_DATE: 'Vencimento',
      CREATION_DATE: 'Criação',
      REMAINING_DAYS: 'Dias Restantes',

      FILTER_STATUS: {
        ALL:'Todas',
        FINALIZED:'Finalizadas',
        NOT_FINALIZED:'Em Aberto'
      }
    });
}());