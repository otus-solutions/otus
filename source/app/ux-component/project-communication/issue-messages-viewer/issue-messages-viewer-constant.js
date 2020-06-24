(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('ISSUE_MESSAGES_VIEWER_CONSTANTS', {
      PAGE_TITLE:'Visualizador de Mensagens',

      ATTRIBUTES: {
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
        TEXT: {
          TITLE: 'title',
          TRANSLATED_TITLE: 'Título',
          ICON: 'insert_comment'
        }
      },

      STATUS_ACTIONS:{
        CLOSED:{
          value: 'CLOSED',
          label: 'Fechar'
        },
        FINALIZED: {
          value: 'FINALIZED',
          label: 'Finalizar'
        },
        OPEN:{
          value: 'OPEN',
          label: 'Reabrir'
        }
      }

    });
}());