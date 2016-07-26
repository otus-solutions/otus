(function() {
    'use strict';

    angular
        .module('otus.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService', 'OtusRestResourceService', '$mdToast'];

    function LoginController($scope, DashboardStateService, OtusRestResourceService, $mdToast) {
        var LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';
        var SERVER_ERROR_MESSAGE = 'Erro interno do servidor.';

        $scope.authenticate = function(user) {
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
            }, function err(){
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(SERVER_ERROR_MESSAGE)
                    );

            });
        };
    }

}());
