(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusUserAccessRecoveryCtrl', Controller);

  Controller.$inject = [
    '$stateParams',
    '$scope',
    '$mdDialog',
    'otusjs.user.access.service.UserAccessRecoveryService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($stateParams, $scope, $mdDialog, UserAccessRecoveryService, LoadingScreenService, ApplicationStateService) {
    var self = this;
    self.token;

    /* Public methods */
    self.$onInit = onInit;
    self.updatePassword = updatePassword;
    self.goBack = goBack;
    self.enable = enable;

    function onInit() {
      self.password = '';
      self.passwordConfirmation = '';
      UserAccessRecoveryService.validateToken($stateParams.token)
        .then(function (result) {
          self.token = $stateParams.token;
        }).catch(function (result) {
          self.error = true;
        });
    }

    function updatePassword() {
      var data = {};
      data.token = self.token;
      data.password = self.password;
      UserAccessRecoveryService.updatePassword(data)
        .then(function (result) {
          _successMessage();
        }).catch(function (result) {
          _errorMessage();
        });
    }

    function goBack() {
      ApplicationStateService.activateLogin();
    }

    function enable() {
      if (self.password && self.passwordConfirmation) {
        if (self.password !== self.passwordConfirmation) {
          $scope.passwordResetForm.passwordConfirmation.$setValidity('invalidPassword', false);
          return true;
        } else {
          $scope.passwordResetForm.passwordConfirmation.$setValidity('invalidPassword', true);
          return false;
        }
      } else {
        return true;
      }
    }

    function _successMessage() {
      $mdDialog.show($mdDialog.alert()
        .title('Recuperação de acesso')
        .textContent('Sucesso! Sua senha foi atualizada')
        .ariaLabel('Sucesso! Sua senha foi atualizada')
        .ok('Ok')
      ).then(function () {
        goBack();
      });
    }

    function _errorMessage() {
      $mdDialog.show($mdDialog.alert()
        .title('Recuperação de acesso')
        .textContent('Não foi possivel solicitar a troca a senha, tente novamente mais tarde')
        .ariaLabel('Não foi possivel solicitar a troca a senha, tente novamente mais tarde')
        .ok('Ok')
      ).then(function () {
        goBack();
      });
    }
  }
}());