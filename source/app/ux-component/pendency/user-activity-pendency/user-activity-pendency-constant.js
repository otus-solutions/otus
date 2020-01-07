(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .constant('otusjs.otus.uxComponent.UserActivityPendencyConstant', {

      PENDING_MANAGEMENT_TITLE:'Gerenciador de Pendência',
      PENDING_MANAGEMENT_ICON_TITLE: 'assignment_ind',

      TEMPLATE_CREATE_USER_ACTIVITY_PENDENCY : 'app/ux-component/pendency/user-activity-pendency/user-activity-pendency-dialog-template.html',
      EVENT_CREATE_TITLE : 'Criar Evento',

      TEMPLATE_UPDATE_USER_ACTIVITY_PENDENCY : 'app/ux-component/pendency/user-activity-pendency/update-user-activity-pendency-dialog-template.html',
      EVENT_UPDATE_TITLE : 'Atualização do Evento',

      TOOLBAR_ACTIVITY_PENDENCY_DIALOG_TITLE : 'Pendência de Atividade',
      FIELD_FILLER_TITLE : "Informe <b>vencimento</b> e o <b>responsável pelo monitoramento</b>",
      DATE_FORMAT_TITLE : "DD/MM/AAAA",
      AUTOCOMPLETE_CHECKER_TITLE : "Responsável (a)",

      CREATE_TITLE: 'criar',
      MSG_CREATE_SUCCESS : 'Pendência CRIADA com sucesso.',
      MSG_CREATE_FAIL : 'FALHA na criação da Pendência.',

      UPDATE_TITLE: 'atualizar',
      MSG_UPDATE_SUCCESS : 'Pendência ATUALIZADA com sucesso.',
      MSG_UPDATE_FAIL : 'FALHA na atualização da Pendência.',

      DELETE_TITLE: 'excluir',
      MSG_DELETE_SUCESS : 'Pendência EXCLUÍDA com sucesso.',
      MSG_DELETE_FAIL: 'FALHA na exclusão da pendência.',

      CANCEL_TITLE: 'cancelar',

      CLOSE_TITLE: 'Fechar',
      CLOSE_ICON_TITLE: 'close'
    })
}());