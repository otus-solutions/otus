(function() {
    'use strict';

    angular
        .module('otus.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = [
        'DashboardStateService',
        'OtusRestResourceService',
        '$mdToast'
    ];

    function LoginController(DashboardStateService, OtusRestResourceService, $mdToast) {
        var self = this;

        var LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';
        var SERVER_ERROR_MESSAGE = 'Erro interno do servidor.';

        /* Public methods */
        self.authenticate = authenticate;
        self.signup = signup;

        _init();

        function authenticate(user) {
            var authenticatorResource = OtusRestResourceService.getOtusAuthenticatorResource();

            authenticatorResource.authenticate(user, function success(response) {
                OtusRestResourceService.setSecurityToken(response.data);

                if (!response.hasErrors) {
                    DashboardStateService.goToHome();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(LOGIN_ERROR_MESSAGE)
                    );
                }
            }, function err() {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(SERVER_ERROR_MESSAGE)
                );

            });
        }

        function signup() {
            DashboardStateService.goToSignup();
        }

        function _init() {
            _verifyInstalation();
        }

        function _verifyInstalation() {
            var installerResource = OtusRestResourceService.getOtusInstallerResource();
            installerResource.ready(function(response) {
                if (response.data) {
                    DashboardStateService.goToLogin();
                } else {
                    DashboardStateService.goToInstaller();
                }
            });
        }
    }

}());
