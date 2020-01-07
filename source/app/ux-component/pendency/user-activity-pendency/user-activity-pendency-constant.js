(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .constant('otusjs.otus.uxComponent.UserActivityPendencyConstant', {

      CREATE_PENDENCY_BUTTON: 'criar',
      MSG_CREATE_SUCCESS : 'Pendência CRIADA com sucesso.',
      MSG_CREATE_FAIL : 'FALHA na criação da Pendência.',

      UPDATE_PENDENCY_BUTTON: 'atualizar',
      MSG_UPDATE_SUCCESS : 'Pendência ATUALIZADA com sucesso.',
      MSG_UPDATE_FAIL : 'FALHA na atualização da Pendência.',

      CANCEL_PENDENCY_BUTTON: 'cancelar',

      DELETE_PENDENCY_BUTTON: 'deletar',
      MSG_DELETE_SUCESS : 'Pendência EXCLUÍDA com sucesso.',
      MSG_DELETE_FAIL: 'FALHA na exclusão da pendência.',

      TEMPLATE_UPDATE_USER_ACTIVITY_PENDENCY : 'app/ux-component/pendency/user-activity-pendency/update-user-activity-pendency-dialog-template.html',
      TEMPLATE_CREATE_USER_ACTIVITY_PENDENCY : 'app/ux-component/pendency/user-activity-pendency/user-activity-pendency-dialog-template.html',

      TITLE_TOOLBAR_ACTIVITY_PENDENCY_DIALOG : 'Pendência de Atividade',
      TITLE_CLOSE: 'Fechar',
      TITLE_CLOSE_ICON: 'close'

    })
}());