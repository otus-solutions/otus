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
      'REMAINING_DAYS': 'Dias restantes',
      'NO_NEW_ITEMS': 'Nenhum Item Novo',
      'INVALID_CRITERION': 'Critério Inválido',
      'CONTEXT_INVALID_CRITERION': 'O número informado ultrapassou limite do paginador.',
      'BOTTON_RESTORE_PAGINATOR': 'Restaurar'
    });

}());