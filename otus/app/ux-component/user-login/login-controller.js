(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusjs.otus.uxComponent.LoginController', Controller);

  Controller.$inject = [
    'otusjs.user.access.service.LoginService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.verifyBrowser.verifyBrowserService',
    '$mdToast'
  ];

  function Controller(LoginService, ApplicationStateService, verifyBrowserService, $mdToast) {
    var self = this;
    var LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';
    var SERVER_ERROR_MESSAGE = 'Erro interno do servidor.';
    var _errorMessage = $mdToast.simple().textContent(LOGIN_ERROR_MESSAGE);

    /* Public methods */
    self.authenticate = authenticate;
    self.goToSignupPage = goToSignupPage;
    self.$onInit = onInit;

    function onInit() {
      verifyBrowserService.verify();
    }

    function authenticate(userData) {
      LoginService
        .authenticate(userData)
        .then(_onLoginSuccess, _onLoginError);
    }

    function goToSignupPage() {
      ApplicationStateService.activateSignup();
    }

    function _onLoginSuccess() {
      ApplicationStateService.activateDashboard()
    }

    function _onLoginError() {
      $mdToast.show(_errorMessage);
    }
  }
}());
