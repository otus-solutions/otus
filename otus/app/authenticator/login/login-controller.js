(function() {
    'use strict';

    angular
        .module('otus.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService', 'OtusRestResourceService', '$mdToast'];

    function LoginController($scope, DashboardStateService, OtusRestResourceService, $mdToast) {
        init();

        function init() {
            verifyInstalation();
        }

        function verifyInstalation() {
            var installerResource = OtusRestResourceService.getOtusInstallerResource();
            installerResource.ready(function(response) {
                if (response.data) {
                    DashboardStateService.goToLogin();
                } else {
                    DashboardStateService.goToInstaller();
                }
            });
        }

        $scope.authenticate = function(user) {
            var authenticatorResource = OtusRestResourceService.getOtusAuthenticatorResource();

            authenticatorResource.authenticate(user, function success(response) {
                OtusRestResourceService.setSecurityToken(response.data);

                if (!response.hasErrors) {
                    DashboardStateService.goToHome();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Login Inválido! Verifique os dados informados.')
                    );
                }
            }, function err(){
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Erro interno do servidor.')
                    );

            });
        };
    }

}());
