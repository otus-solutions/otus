(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('USER_COMMENT_MANAGER_LABELS', {
      ATTRIBUTES_MESSAGE: {
        confirmFillSelected: {
          dialogToTitle: 'Confirmação de seleção:',
          titleToText: 'O comentário será trocado por outro selecionado.',
          textDialog: 'Gostaria de trocar?',
          ariaLabel: 'Confirmação de troca',
          buttons: { typeDialogTrueAndFalse: true }
        },
        deleteUserComment: {
          dialogToTitle: 'Confirmação de deleção:',
          titleToText: 'O comentário será removido.',
          textDialog: 'Gostaria de remover?',
          ariaLabel: 'Confirmação de deleção',
          buttons: { typeDialogTrueAndFalse: true }
        }
      }
    })
}());