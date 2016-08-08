(function() {
    'use strict';

    angular
        .module('otus.authenticator')
        .service('LogoutService', LogoutService);

    LogoutService.$inject = ['$mdDialog', 'OtusRestResourceService', 'DashboardStateService'];

    function LogoutService($mdDialog, OtusRestResourceService, DashboardStateService) {
        var self = this;
        self.logout = logout;

        function logout() {
            showModal();
        }

        function showModal() {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/authenticator/logout/dialog/logout-dialog.html',
                clickOutsideToClose: true
            });
        }

        function invalidateSession() {
            var authenticatorResource = OtusRestResourceService.getOtusAuthenticatorResource();
            authenticatorResource.invalidate(function(response) {
                OtusRestResourceService.removeSecurityToken();
                DashboardStateService.goToLogin();
            });
        }

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function() {
                invalidateSession();
                $mdDialog.hide();
            };
        }
    }

}());
