(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('ISSUE_VIEWER_LABELS', {
      PAGE_TITLE:'Visualizador de Issues',

      ISSUE_ATTRIBUTES: {
        RN: {
          TITLE: 'rn',
          TRANSLATED_TITLE: 'Recrutamento',
          ICON: 'account_circle'
        },
        SENDER_NAME: {
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
          ICON: 'assignment_ind',
          OPENED: {
            TRANSLATED_TITLE: 'Abertos',
            VALUE: 'OPENED'
          },
          CLOSED: {
            TRANSLATED_TITLE: 'Fechados',
            VALUE: 'CLOSED'
          },
          FINALIZED: {
            TRANSLATED_TITLE: 'Finalizados',
            VALUE: 'FINALIZED'
          }
        }
      },

      FILTER: {
        RN: 'Recrutamento',
        NAME: 'Nome',
        CREATION_DATE: 'Criação',
        TITLE: 'Título',
        CENTER: 'Centro',
        STATUS: {
          OPENED:'Abertos',
          CLOSED:'Fechados',
          FINALIZED:'Finalizados'
        }
      }

    });
}());