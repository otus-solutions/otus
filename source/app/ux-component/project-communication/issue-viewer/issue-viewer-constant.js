(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('ISSUE_VIEWER_LABELS', {
      PAGE_TITLE:'Visualizador de Chamados',

      ISSUE_ATTRIBUTES: {
        RN: {
          TITLE: 'rn',
          TRANSLATED_TITLE: 'Recrutamento',
          ICON: 'account_circle'
        },
        SENDER: {
          TITLE: 'name',
          TRANSLATED_TITLE: 'Nome',
          ICON: 'person'
        },
        CENTER: {
          TITLE: 'center',
          TRANSLATED_TITLE: 'Centro',
          ICON: 'location_on'
        },
        CREATION_DATE: {
          TITLE: 'creationDate',
          TRANSLATED_TITLE: 'Criação',
          ICON: 'schedule'
        },
        TITLE: {
          TITLE: 'title',
          TRANSLATED_TITLE: 'Título',
          ICON: 'insert_comment'
        },
        STATUS: {
          TITLE: 'status',
          ICON: 'assignment_ind'
        }
      },

      STATUS:{
        CLOSED:{
          value: 'CLOSED',
          filterLabel: 'Fechados',
          actionLabel: 'Fechar',
          color: {
            'background-color': '#dedede',
            'color': 'white'
          }
        },
        FINALIZED: {
          value: 'FINALIZED',
          filterLabel: 'Finalizados',
          actionLabel: 'Finalizar',
          color: {
            'background-color': '#006600',
            'color': 'white'
          }
        },
        OPEN:{
          value: 'OPEN',
          filterLabel: 'Abertos',
          actionLabel: 'Reabrir',
          color: {
            'background-color': '#3a51af',
            'color': 'white'
          }
        }
      }

    });
}());