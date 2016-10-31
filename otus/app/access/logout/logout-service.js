(function() {
  'use strict';

  angular
    .module('otusjs.otus.access')
    .service('LogoutService', LogoutService);

  LogoutService.$inject = ['$mdDialog', 'OtusRestResourceService', 'otusjs.otus.configuration.state.ApplicationStateService'];

  function LogoutService($mdDialog, OtusRestResourceService, ApplicationStateService) {
    var self = this;
    self.logout = logout;

    function logout() {
      showModal();
    }

    function showModal() {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/access/logout/dialog/logout-dialog.html',
        clickOutsideToClose: true
      });
    }

    function invalidateSession() {
      var authenticatorResource = OtusRestResourceService.getOtusAuthenticatorResource();
      authenticatorResource.invalidate(function(response) {
        OtusRestResourceService.removeSecurityToken();
        ApplicationStateService.activateLogin();
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
