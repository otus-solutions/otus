(function() {
  'use strict';

  angular
    .module('otusjs.otus.access')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    'otusjs.otus.configuration.state.ApplicationStateService',
    'OtusRestResourceService',
    '$mdToast',
    '$http'
  ];

  function LoginController(ApplicationStateService, OtusRestResourceService, $mdToast, $http) {
    var self = this;

    var LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';
    var SERVER_ERROR_MESSAGE = 'Erro interno do servidor.';

    /* Public methods */
    self.authenticate = authenticate;
    self.signup = signup;

    function authenticate(user) {
      var authenticatorResource = OtusRestResourceService.getOtusAuthenticatorResource();

      authenticatorResource.authenticate(user).$promise.then(function success(response) {
        if (response.data) {
          OtusRestResourceService.setSecurityToken(response.data.token);
          ApplicationStateService.activateDashboard();
        } else {
          $mdToast.show(
            $mdToast.simple()
            .textContent(LOGIN_ERROR_MESSAGE)
          );
        }
      });
    }

    function signup() {
      ApplicationStateService.activateSignup();
    }
  }

}());
