(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.OtusApiService', Service);

  Service.$inject = [
    'otusjs.deploy.AuthenticationRestService',
    'otusjs.deploy.InstallerRestService',
    'otusjs.deploy.ActivityRestService',
    'otusjs.deploy.ActivityConfigurationRestService',
    'otusjs.deploy.ProjectConfigurationRestService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.deploy.ParticipantRestService',
    'otusjs.deploy.UserRestService',
    'otusjs.deploy.LaboratoryRestService',
    'otusjs.deploy.SampleTransportRestService',
    'otusjs.deploy.ExamsLotsRestService'
  ];

  function Service(
    AuthenticationRestService,
    InstallerRestService,
    ActivityRestService,
    ActivityConfigurationRestService,
    ProjectConfigurationRestService,
    FieldCenterRestService,
    ParticipantRestService,
    UserRestService,
    LaboratoryRestService,
    SampleTransportRestService,
    ExamsLotsRestService
  ) {
    var self = this;

    /* Public methods */
    self.initializeOpenResources = initializeOpenResources;
    self.initializeConfigurationResources = initializeConfigurationResources;
    self.initializeRestrictResources = initializeRestrictResources;

    function initializeOpenResources() {
      AuthenticationRestService.initialize();
      InstallerRestService.initialize();
    }

    function initializeConfigurationResources() {
      ProjectConfigurationRestService.initialize();
    }

    function initializeRestrictResources() {
      ActivityRestService.initialize();
      ActivityConfigurationRestService.initialize();
      ParticipantRestService.initialize();
      FieldCenterRestService.initialize();
      UserRestService.initialize();
      LaboratoryRestService.initialize();
      SampleTransportRestService.initialize();
      ExamsLotsRestService.initialize();
    }
  }
}());
