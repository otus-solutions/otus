(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusUserAccessRecoveryCtrl', Controller);

  Controller.$inject = [
    'otusjs.user.access.service.UserAccessRecoveryService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(UserAccessRecoveryService, LoadingScreenService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.accessRecovery = accessRecovery;
    self.goBack = goBack;

    function onInit() { }

    function accessRecovery(user) {
      UserAccessRecoveryService.updatePassword(token, password).then(function (result) {
        _successMessage();
      });
    }

    function goBack() {
      // TODO: retornar usuário para a tela de login
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