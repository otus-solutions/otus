(function () {
  'use strict';

  angular
    .module('otusjs.user.access.service')
    .service('otusjs.user.access.service.UserAccessRecoveryService', Service);

  Service.$inject = [
    'otusjs.deploy.PasswordRecoveryRestService'
  ];

  function Service(PasswordRecoveryRestService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.getRecovery = getRecovery;
    self.updatePassword = updatePassword;

    function onInit() {
      PasswordRecoveryRestService.initialize();
    }

    function getRecovery(email) {
      return PasswordRecoveryRestService.getRecovery(email).then(function (token) {
        request.resolve(token);
      });
    }

    function updatePassword() {
      //TODO:
    }

    function authenticate(userData) {
      return ModuleService.Service.Authentication
        .authenticateUserData(userData)
        .then(function _handleAuthenticationResponse(response) {
          if (!response.hasErrors) {
            EventService.fireLogin(response.data);
          }
        });
    }
  }
}());
