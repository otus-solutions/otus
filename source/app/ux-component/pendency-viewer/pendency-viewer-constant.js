(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('PENDENCY_VIEWER_TITLES', {
      'RN': 'Recrutamento',
      'REQUESTER':'Solicitante',
      'RECEIVER': 'Responsável',
      'ACRONYM': 'Formulário',
      'EXTERNAL_ID': 'ID',
      'DUE_DATE': 'Vencimento',
      'CREATION_DATE': 'Criação',
      'REMAINING_DAYS': 'Dias restantes '
    });

}());