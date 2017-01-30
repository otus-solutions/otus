(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.OtusApiService', Service);

  Service.$inject = [
    'otusjs.deploy.AuthenticationRestService',
    'otusjs.deploy.InstallerRestService',
    'otusjs.deploy.ActivityRestService',
    'otusjs.deploy.ProjectConfigurationRestService',
    'otusjs.deploy.ParticipantRestService',
    'otusjs.deploy.UserRestService'
  ];

  function Service(
    AuthenticationRestService,
    InstallerRestService,
    ActivityRestService,
    ProjectConfigurationRestService,
    ParticipantRestService,
    UserRestService
  ) {
    var self = this;

    /* Public methods */
    self.initializeOpenResources = initializeOpenResources;
    self.initializeRestrictResources = initializeRestrictResources;

    function initializeOpenResources() {
      AuthenticationRestService.initialize();
      InstallerRestService.initialize();
    }

    function initializeRestrictResources() {
      ActivityRestService.initialize();
      ProjectConfigurationRestService.initialize();
      ParticipantRestService.initialize();
      UserRestService.initialize();
    }
  }
}());
