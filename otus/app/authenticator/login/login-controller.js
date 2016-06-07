(function() {
    'use strict';

    angular
        .module('otus.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService', 'OtusRestResourceService'];

    function LoginController($scope, DashboardStateService, OtusRestResourceService) {
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
    }

}());
