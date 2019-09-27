(function() {
  'use strict';

  angular
    .module('otusjs.user.core')
    .service('otusjs.user.core.ServiceLoader', Service);

  Service.$inject = [
    'otusjs.user.core.ModuleService',
    'otusjs.user.business.UserAuthenticationService'
  ];

  function Service(ModuleService, UserAuthenticationService) {
    var self = this;

    self.execute = execute;

    function execute() {
      ModuleService.Service = {};
      ModuleService.Service.UserAuthenticationService = {};
      ModuleService.Service.UserAuthenticationService.authenticateUserData = UserAuthenticationService.authenticateUserData;
    }
  }
}());
