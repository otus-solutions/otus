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

    function onInit() {
      PasswordRecoveryRestService.initialize();
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
