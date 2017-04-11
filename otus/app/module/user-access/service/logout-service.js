(function() {
  'use strict';

  angular
    .module('otusjs.user.access.service')
    .service('otusjs.user.access.service.LogoutService', Service);

  Service.$inject = [
    '$mdDialog'
  ];

  function Service($mdDialog) {
    var self = this;

    /* Public methods */
    self.logout = logout;

    function logout() {
      _showModal();
    }

    function _showModal() {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/ux-component/user-logout/logout-dialog.html',
        clickOutsideToClose: true
      });
    }
  }

  DialogController.$inject = [
    '$scope',
    '$mdDialog',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.access.service.LogoutServiceService'
  ]

  function DialogController($scope, $mdDialog, ApplicationStateService, LogoutService) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function() {
      LogoutService
        .logout()
        .then(function() {
          $mdDialog.hide();
          ApplicationStateService.activateLogin();
        });
    };
  }

  // --------------------------------------------------------------------------

  angular
    .module('otusjs.user.access.service')
    .service('otusjs.user.access.service.LogoutServiceService', LogoutService);

  LogoutService.$inject = [
    'otusjs.deploy.AuthenticationRestService',
    'otusjs.user.access.core.EventService'
  ];

  function LogoutService(LogoutProxyService, EventService) {
    var self = this;

    /* Public methods */
    self.logout = logout;

    function logout() {
      return LogoutProxyService
        .invalidate()
        .then(function() {
          EventService.fireLogout();
        });
    }
  }
}());
