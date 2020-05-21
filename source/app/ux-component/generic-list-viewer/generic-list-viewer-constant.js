(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('GENERIC_LIST_VIEWER_LABELS', {
      'RN': 'Recrutamento',
      'REQUESTER':'Solicitante',
      'RECEIVER': 'Responsável',
      'ACRONYM': 'Formulário',
      'EXTERNAL_ID': 'ID',
      'DUE_DATE': 'Vencimento',
      'CREATION_DATE': 'Criação',
      'REMAINING_DAYS': 'Dias Restantes',
      'NO_NEW_ITEMS': 'Nenhum Item Novo',
      'INVALID_CRITERION': 'Critério Inválido',
      'CONTEXT_INVALID_CRITERION': 'O número informado ultrapassou limite do paginador.',
      'BOTTON_RESTORE_PAGINATOR': 'Restaurar',
      'TO_DO_VIEWER':'Visualizador de Pendências',
      'CONTROL_PANEL':'Painel de Controle',
      'HIDDEN_FILTERS':'Filtros Ocultos',
      'ENABLED_FILTERS':'Filtros Habilitados',
      'ASCENDING_SORTING':'Crescente',
      'ORDERING':'Ordenação',
      'DESCENDING_SORTING':'Decrescente',
      'LIST_BUTTON': 'Listar',
      'FILTERS': 'FILTROS',
      'RESET_FILTERS': 'Reinicializar Filtros',
      'SORTING_CRITERIA':'Critérios de ordernação',
      'REORDERING_ITEMS':'Reordenar Itens',
      'CANCEL_BUTTON':'cancelar',

      'ALL_STATE':'Todas',
      'ALL_STATE_STATE':'Finalizadas',
      'OPENED_STATE':'Em Aberto',

      'STANDARD_DATE_FORMAT':'DD/MM/AAAA',
      'EMPTY_PENDENCY_INFO':'Nenhuma Pendência Encontrada'
    });
}());