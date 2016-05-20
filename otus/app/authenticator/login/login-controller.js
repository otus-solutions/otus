(function() {
    'use strict';

    angular
        .module('otus.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService','RestResourceService'];

    function LoginController($scope, DashboardStateService, RestResourceService) {
        init();

        function init() {
            verifyInstalation();
        }

        function verifyInstalation() {
            var installerResource = RestResourceService.getInstallerResource();
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
