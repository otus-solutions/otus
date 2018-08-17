(function () {
  'use strict';

  angular
    .module('otusjs.user.access.service')
    .service('otusjs.user.access.service.UserAccessRecoveryService', Service);

  Service.$inject = [
    'otusjs.deploy.UserAccessRecoveryRestService'
  ];

  function Service(UserAccessRecoveryRestService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.validateToken = validateToken;
    self.recovery = recovery;
    self.updatePassword = updatePassword;

    function onInit() {
      UserAccessRecoveryRestService.initialize();
    }

    function validateToken(token) {
      return UserAccessRecoveryRestService.ValidateToken(token).then(function (response) {
        request.resolve(response);
      });
    }

    function recovery(email, url) {
      return UserAccessRecoveryRestService.getRecovery(email, url).then(function (response) {
        request.resolve(response);
      });
    }

    function updatePassword(token, password) {
      return UserAccessRecoveryRestService.updatePassword(token, password).then(function (response) {
        request.resolve(token);
      });
    }
  }
}());
