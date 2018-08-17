(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusUserAccessRecoveryCtrl', Controller);

  Controller.$inject = [
    '$stateParams',
    '$scope',
    'otusjs.user.access.service.UserAccessRecoveryService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($stateParams, $scope, UserAccessRecoveryService, LoadingScreenService, ApplicationStateService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.accessRecovery = accessRecovery;
    self.goBack = goBack;
    self.enable = enable;

    function onInit() {
      self.password = '';
      self.passwordConfirmation = '';
      //TODO
      // if (UserAccessRecoveryService.validateToken($stateParams.token)) {
      //   ApplicationStateService.activateError();
      // }
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
      if (self.password && self.passwordConfirmation) {
        if (self.password !== self.passwordConfirmation) {
          $scope.loginForm.userPasswordConfirmation.$setValidity('invalidPassword', false);
          return true;
        } else {
          $scope.loginForm.userPasswordConfirmation.$setValidity('invalidPassword', true);
          return false;
        }
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