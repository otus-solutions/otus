(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusjs.otus.uxComponent.LoginController', Controller);

  Controller.$inject = [
    'otusjs.user.access.service.LoginService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.access.service.UserAccessRecoveryService',
    'otusjs.application.verifyBrowser.VerifyBrowserService',
    '$mdToast'
  ];

  function Controller(LoginService, ApplicationStateService, UserAccessRecoveryService, VerifyBrowserService, $mdToast) {
    const LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';
    const SERVER_ERROR_MESSAGE = 'Erro interno do servidor.';
    var _errorMessage = $mdToast.simple().textContent(LOGIN_ERROR_MESSAGE);
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.authenticate = authenticate;
    self.goToSignupPage = goToSignupPage;
    self.recover = recover;

    function onInit() {
      VerifyBrowserService.verify();
    }

    function authenticate(userData) {
      LoginService
        .authenticate(userData)
        .then(_onLoginSuccess, _onLoginError);
    }

    function goToSignupPage() {
      ApplicationStateService.activateSignup();
    }

    function recover(userData) {
      self.recovery = true;
      console.log('opa');
      UserAccessRecoveryService.getRecovery(email).then(function (result) {
        //TODO:
      });
    }

    function _onLoginSuccess() {
      ApplicationStateService.activateDashboard()
    }

    function _onLoginError() {
      $mdToast.show(_errorMessage);
    }
  }
}());
