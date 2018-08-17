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
    self.recovery = recovery;
    self.updatePassword = updatePassword;
    self.validateToken =  validateToken;

    function onInit() {
      PasswordRecoveryRestService.initialize();
    }

    function validateToken(token) {
      self.token = token;
      return true;
      // TODO
      // return PasswordRecoveryRestService.ValidateToken(self.token).then(function (result) {
      //   request.resolve(result);
      // });
    }

    function recovery(email, url) {
      return PasswordRecoveryRestService.getRecovery(email, url).then(function (token) {
        request.resolve(token);
      });
    }

    function updatePassword(token, password) {
      //TODO:
    }
  }
}());
