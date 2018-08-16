(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusUserAccessRecoveryCtrl', Controller);

  Controller.$inject = [
    'otusjs.user.access.service.UserAccessRecoveryService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(UserAccessRecoveryService, LoadingScreenService, ApplicationStateService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.accessRecovery = accessRecovery;
    self.goBack = goBack;
    self.enable = enable;

    function onInit() {
      self.password = '';
      self.passwordConfirmation = '';
    }

    function accessRecovery(user) {
      UserAccessRecoveryService.updatePassword(token, password).then(function (result) {
        _successMessage();
      });
    }

    function goBack() {
      ApplicationStateService.activateLogin();
    }

    function enable() {
      if(self.password && self.passwordConfirmation){
        return !(self.password === self.passwordConfirmation);
      } else {
        return true;
      }
    }

    function _successMessage() {
      $mdDialog.show($mdDialog.alert()
        .title('Recuperação de acesso')
        .textContent('A senha foi atualizada')
        .ariaLabel('A senha foi atualizada')
        .ok('Ok')
      );
    }
  }
}());