(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.OtusApiService', Service);

  Service.$inject = [
    'otusjs.deploy.AuthenticationRestService',
    'otusjs.deploy.InstallerRestService'
  ];

  function Service(AuthenticationRestService, InstallerRestService) {
    var self = this;

    /* Public methods */
    self.initializeResources = initializeResources;

    function initializeResources() {
      AuthenticationRestService.initialize();
      InstallerRestService.initialize();
      // ActivityRestService.initialize();
      // ProjectConfigurationRestService.initialize();
      // ParticipantRestService.initialize();
      // UserRestService.initialize();
    }
  }
}());
