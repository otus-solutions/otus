(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('GENERIC_LIST_VIEWER_LABELS', {
      NO_NEW_ITEMS: 'Nenhum Item',
      EMPTY_ITEM_INFO: 'Nenhum Item Encontrado',
      INVALID_CRITERION: 'Critério Inválido',
      STANDARD_DATE_FORMAT:'DD/MM/AAAA',
      CONTROL_PANEL: {
        TITLE:'Painel de Controle',
        HIDDEN_FILTERS:'Filtros Ocultos',
        ENABLED_FILTERS:'Filtros Habilitados',
        FILTERS: 'FILTROS',
        RESET_FILTERS: 'Reinicializar Filtros',
        SORTING_CRITERIA:'Critérios de ordernação',
        ASCENDING_SORTING:'Crescente',
        ORDERING:'Ordenação',
        DESCENDING_SORTING:'Decrescente',
        REORDERING_ITEMS:'Reordenar Itens',
        CANCEL_BUTTON:'cancelar',
        LIST_BUTTON: 'Listar',
      },
      INPUT_VIEW_STATE_NAMES:{
        SORTING_CRITERIA: 'sortingCriteria',
      },
      PAGINATOR: {
        PREVIOUS_PAGE_BUTTON:'Página Anterior',
        CUSTOM_PAGE_BUTTON:'Nova Consulta',
        NEXT_PAGE_BUTTON:'Próxima Página',
        RESTORE_CONTEXT_INVALID_CRITERION: 'O paginador foi restaurado.',
        RESTORE_BUTTON: 'Restaurar'
      },
      DIALOG: {
        confirmRestore: {
          dialogToTitle: 'Confirmação de restauração:',
          titleToText: 'O número informado ultrapassou limite do paginador e \<br/\> poderá ser restaurado.',
          textDialog: 'Gostaria de restaurar?',
          ariaLabel: 'Confirmação de restaurar',
          buttons: { typeDialogTrueAndFalse: true }
        }
      }
    });
}());
