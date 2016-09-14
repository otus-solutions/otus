(function() {
    'use strict';

    angular
        .module('otus.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = [
        'DashboardStateService',
        'OtusRestResourceService',
        '$mdToast',
        '$http'
    ];

    function LoginController(DashboardStateService, OtusRestResourceService, $mdToast, $http) {
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
                    DashboardStateService.goToHome();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(LOGIN_ERROR_MESSAGE)
                    );
                }
            });
        }

        function signup() {
            DashboardStateService.goToSignup();
        }
    }

}());
