(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusjs.otus.uxComponent.LoginController', Controller);

  Controller.$inject = [
    '$scope',
    '$mdDialog',
    '$mdToast',
    'otusjs.user.access.service.LoginService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.access.service.UserAccessRecoveryService',
    'otusjs.application.verifyBrowser.VerifyBrowserService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($scope, $mdDialog, $mdToast, LoginService, ApplicationStateService, UserAccessRecoveryService, VerifyBrowserService, DialogService) {
    const LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';
    const SERVER_ERROR_MESSAGE = 'Erro interno do servidor.';
    const PATH = '/access-recovery'
    var _errorMessage = $mdToast.simple().textContent(LOGIN_ERROR_MESSAGE);
    var self = this;
    var successMessage;

    /* Public methods */
    self.$onInit = onInit;
    self.authenticate = authenticate;
    self.sendRecovery = sendRecovery;
    self.goToSignupPage = goToSignupPage;
    self.goToRecovery = goToRecovery;
    self.resetValidation = resetValidation;
    self.goBack = goBack;

    function onInit() {
      VerifyBrowserService.verify();
    }

    function authenticate(userData) {
      LoginService
        .authenticate(userData)
        .then(_onLoginSuccess, _onLoginError);
    }

    function sendRecovery(input) {
      var data = {};
      data.userEmail = input.email;
      data.redirectUrl = _getUrl();
      UserAccessRecoveryService.sendPasswordReset(data)
        .then(function (result) {
          _successMessage();
        }).catch(function (result) {
          $scope.accessRecoveryForm.userEmail.$setValidity('invalid', false);
        });
    }

    function resetValidation() {
      $scope.accessRecoveryForm.userEmail.$setValidity('invalid', true);
    }

    function goToSignupPage() {
      ApplicationStateService.activateSignup();
    }

    function goToRecovery() {
      self.recovery = true;
    }

    function goBack() {
      self.recovery = false;
    }

    function _successMessage() {

      successMessage = {
        dialogToTitle:'Troca de senha',
        titleToText:'Solicitação de troca de senha',
        textDialog:'Enviamos um e-mail com as instruções para você trocar sua senha',
        ariaLabel:'Enviamos um e-mail com as instruções para você trocar sua senha',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          }
        ]
      };

      DialogService.showDialog(successMessage).then(function () {
        self.recovery = false;
      });

    }

    function _getUrl() {
      var newUrl = window.location.href.replace('/login', '');
      return newUrl + PATH;
    }

    function _onLoginSuccess() {
      ApplicationStateService.activateDashboard()
    }

    function _onLoginError() {
      $mdToast.show(_errorMessage);
    }
  }
}());
