(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .constant('otusjs.otus.uxComponent.UserActivityPendencyConstant', {
      CREATE_PENDENCY_BUTTON: "criar",
      CANCEL_PENDENCY_BUTTON: "cancelar",
      TEMPLATE_UPDATE_USER_ACTIVITY_PENDENCY : 'app/ux-component/pendency/user-activity-pendency/update-user-activity-pendency-dialog-template.html',
      TEMPLATE_CREATE_USER_ACTIVITY_PENDENCY : 'app/ux-component/pendency/user-activity-pendency/user-activity-pendency-dialog-template.html'


    })
}());