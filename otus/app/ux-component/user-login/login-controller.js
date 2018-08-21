(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusjs.otus.uxComponent.LoginController', Controller);

  Controller.$inject = [
    '$mdDialog',
    'otusjs.user.access.service.LoginService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.access.service.UserAccessRecoveryService',
    'otusjs.application.verifyBrowser.VerifyBrowserService',
    '$mdToast'
  ];

  function Controller($mdDialog, LoginService, ApplicationStateService, UserAccessRecoveryService, VerifyBrowserService, $mdToast) {
    const LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';
    const SERVER_ERROR_MESSAGE = 'Erro interno do servidor.';
    const PATH = '/access-recovery'
    var _errorMessage = $mdToast.simple().textContent(LOGIN_ERROR_MESSAGE);
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.authenticate = authenticate;
    self.sendRecovery = sendRecovery;
    self.goToSignupPage = goToSignupPage;
    self.goToRecovery = goToRecovery;
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
          _errorMessage();
        });
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
      $mdDialog.show($mdDialog.alert()
        .title('Solicitação de troca de senha')
        .textContent('Enviamos um e-mail com as instruções para você trocar sua senha')
        .ariaLabel('Enviamos um e-mail com as instruções para você trocar sua senha')
        .ok('Ok')
      ).then(function () {
        self.recovery = false;
      });
    }

    function _errorMessage() {
      $mdDialog.show($mdDialog.alert()
        .title('Recuperação de acesso')
        .textContent('Não foi possivel solicitar a troca a senha, tente novamente mais tarde')
        .ariaLabel('Não foi possivel solicitar a troca a senha, tente novamente mais tarde')
        .ok('Ok')
      ).then(function () {
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
