(function() {
  'use strict';

  angular
    .module('otusjs.user.business')
    .service('otusjs.user.business.UserAuthenticationService', Service);

  Service.$inject = [
    'otusjs.user.core.ModuleService'
  ];

  function Service(ModuleService) {
    var self = this;

    /* Public methods */
    self.authenticateUserData = authenticateUserData;

    function authenticateUserData(userData) {
      return ModuleService.Proxy.LoginProxy.authenticate(userData);
    }
  }
}());
