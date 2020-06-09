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

      FILTER_STATUS: {
        CLOSED:'Fechados',
        FINALIZED:'Finalizados',
        OPEN:'Abertos'
      },

      STATUS_COLOR: {
        CLOSED: {
          'background-color': 'red',
          'color': 'white'
        },
        FINALIZED: {
          'background-color': 'green',
          'color': 'white'
        },
        OPEN: {
          'background-color': 'blue',
          'color': 'white'
        }
      }

    });
}());