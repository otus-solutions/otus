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
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService',
    'THEME_CONSTANTS'
  ];

  function Controller($stateParams, $scope, $mdDialog,
                      UserAccessRecoveryService, LoadingScreenService, ApplicationStateService, DialogService,
                      THEME_CONSTANTS) {
    const self = this;
    var successMessage;
    var errorMessage;
    self.token;

    /* Public methods */
    self.$onInit = onInit;
    self.updatePassword = updatePassword;
    self.goBack = goBack;
    self.enable = enable;

    function onInit() {
      self.bannerImage = THEME_CONSTANTS.imageURLs.banner;
      self.crashImage = THEME_CONSTANTS.imageURLs.crash;

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

      successMessage = {
        dialogToTitle:'Nova senha',
        titleToText:'Recuperação de acesso',
        textDialog:'Sucesso! Sua senha foi atualizada.',
        ariaLabel:'Sucesso! Sua senha foi atualizada.',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          }
        ]
      };

      DialogService.showDialog(successMessage).then(function () {
        goBack();
      });

    }

    function _errorMessage() {

      errorMessage = {
        dialogToTitle:'Nova senha',
        titleToText:'Recuperação de acesso',
        textDialog:'Não foi possível processar a sua solicitação. Tente novamente mais tarde.',
        ariaLabel:'Não foi possível processar a sua solicitação. Tente novamente mais tarde.',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          }
        ]
      };

      DialogService.showDialog(errorMessage).then(function () {
        goBack();
      });

    }
  }
}());