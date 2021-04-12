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
        confirmEditSelected: {
          dialogToTitle: 'Confirmação de seleção:',
          titleToText: 'O comentário poderá ser editado.',
          textDialog: 'Gostaria de editar?',
          ariaLabel: 'Confirmação de edição',
          buttons: { typeDialogTrueAndFalse: true }
        },
        deleteUserCommentAboutParticipant: {
          dialogToTitle: 'Confirmação de deleção:',
          titleToText: 'O comentário será removido.',
          textDialog: 'Gostaria de remover?',
          ariaLabel: 'Confirmação de deleção',
          buttons: { typeDialogTrueAndFalse: true }
        },
        viewComment: {
          dialogToTitle: 'Visualizar comentário',
          titleToText: 'O comentário poderá ser visualizar.',
          textDialog: 'Gostaria de visualizar?',
          ariaLabel: 'Visualização de comentário',
          buttons: { typeDialogTrueAndFalse: true }
        },
        editComment: {
          dialogToTitle: 'Editar comentário',
          titleToText: 'O comentário poderá ser editado.',
          textDialog: 'Gostaria de editar?',
          ariaLabel: 'Edição de comentário',
          buttons: { typeDialogTrueAndFalse: true }
        },
        createComment: {
          dialogToTitle: 'Criar comentário',
          titleToText: 'O comentário poderá ser criado.',
          textDialog: 'Gostaria de criar?',
          ariaLabel: 'Criação de comentário',
          buttons: { typeDialogTrueAndFalse: true }
        },
      },
      VISIBILITY_ICON: {
        'true': {
          icon: 'visibility',
          tooltip: 'Ocultar Detalhes'
        },
        'false': {
          icon: 'visibility_off',
          tooltip: 'Mostrar Detalhes'
        }
      }
    })
}());
