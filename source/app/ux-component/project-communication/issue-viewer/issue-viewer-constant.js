(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('ISSUE_VIEWER_LABELS', {
      PAGE_TITLE:'Visualizador de Issues',

      FILTER: {
        RN: 'Recrutamento',
        CREATION_DATE: 'Criação',
        CENTER: 'Centro',
        STATUS: {
          OPENED:'Abertos',
          CLOSED:'Fechados',
          FINALIZED:'Finalizados'
        }
      }

    });
}());