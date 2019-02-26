(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.OtusApiService', Service);

  Service.$inject = [
    'otusjs.deploy.user.AuthenticationRestService',
    'otusjs.deploy.InstallerRestService',
    'otusjs.deploy.ActivityRestService',
    'otusjs.deploy.SurveyRestService',
    'otusjs.deploy.ActivityConfigurationRestService',
    'otusjs.deploy.ConfigurationRestService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.deploy.ParticipantRestService',
    'otusjs.deploy.user.UserRestService',
    'otusjs.deploy.LaboratoryRestService',
    'otusjs.deploy.SampleTransportRestService',
    'otusjs.deploy.ExamsRestService',
    'otusjs.deploy.ParticipantReportRestService',
    'otusjs.deploy.MonitoringRestService',
    'otusjs.deploy.user.UserAccessRecoveryRestService',
    'otusjs.deploy.monitoring.LaboratoryMonitoringRestService'
  ];

  function Service(
    AuthenticationRestService,
    InstallerRestService,
    ActivityRestService,
    SurveyRestService,
    ActivityConfigurationRestService,
    ConfigurationRestService,
    FieldCenterRestService,
    ParticipantRestService,
    UserRestService,
    LaboratoryRestService,
    SampleTransportRestService,
    ExamsRestService,
    ParticipantReportRestService,
    MonitoringRestService,
    UserAccessRecoveryRestService,
    LaboratoryMonitoringRestService
  ) {
    var self = this;

    /* Public methods */
    self.initializeOpenResources = initializeOpenResources;
    self.initializeConfigurationResources = initializeConfigurationResources;
    self.initializeRestrictResources = initializeRestrictResources;

    function initializeOpenResources() {
      AuthenticationRestService.initialize();
      InstallerRestService.initialize();
      UserAccessRecoveryRestService.initialize();
    }

    function initializeConfigurationResources() {
      ConfigurationRestService.initialize();
    }

    function initializeRestrictResources() {
      ActivityRestService.initialize();
      SurveyRestService.initialize();
      ActivityConfigurationRestService.initialize();
      ParticipantRestService.initialize();
      FieldCenterRestService.initialize();
      UserRestService.initialize();
      LaboratoryRestService.initialize();
      SampleTransportRestService.initialize();
      ExamsRestService.initialize();
      ParticipantReportRestService.initialize();
      MonitoringRestService.initialize();
      LaboratoryMonitoringRestService.initialize();
    }
  }
}());
