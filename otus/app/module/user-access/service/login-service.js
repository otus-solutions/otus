(function() {
  'use strict';

  angular
    .module('otusjs.user.access.service')
    .service('otusjs.user.access.service.LoginService', Service);

  Service.$inject = [
    'otusjs.user.access.core.EventService',
    'otusjs.user.access.core.ModuleService'
  ];

  function Service(EventService ,ModuleService) {
    var self = this;

    /* Public methods */
    self.authenticate = authenticate;

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
