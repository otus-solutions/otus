(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.OtusApiService', Service);

  Service.$inject = [
    'otusjs.deploy.user.AuthenticationRestService',
    'otusjs.deploy.InstallerRestService',
    'otusjs.deploy.ActivityRestService',
    'otusjs.deploy.OfflineActivityCollectionRestService',
    'otusjs.deploy.ActivityImportRestService',
    'otusjs.deploy.SurveyRestService',
    'otusjs.deploy.SurveyGroupRestService',
    'otusjs.deploy.ActivityConfigurationRestService',
    'otusjs.deploy.ConfigurationRestService',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.deploy.ParticipantRestService',
    'otusjs.deploy.user.UserRestService',
    'otusjs.deploy.LaboratoryRestService',
    'otusjs.deploy.SampleTransportRestService',
    'otusjs.deploy.ExamsRestService',
    'otusjs.deploy.ParticipantReportRestService',
    'otusjs.deploy.monitoring.MonitoringRestService',
    'otusjs.deploy.user.UserAccessRecoveryRestService',
    'otusjs.deploy.monitoring.LaboratoryMonitoringRestService',
    'otusjs.deploy.UserActivityPendencyRestService',
    'otusjs.deploy.ParticipantContactRestService',
    'otusjs.deploy.LocationPointRestService',
    'otusjs.deploy.ProjectCommunicationRestService',
    'otusjs.deploy.ActivitySharingRestService',
    'otusjs.deploy.StageRestService'
  ];

  function Service(
    AuthenticationRestService,
    InstallerRestService,
    ActivityRestService,
    OfflineActivityCollectionRestService,
    ActivityImportRestService,
    SurveyRestService,
    SurveyGroupRestService,
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
    LaboratoryMonitoringRestService,
    UserActivityPendencyRestService,
    ParticipantContactRestService,
    LocationPointRestService,
    ProjectCommunicationRestService,
    ActivitySharingRestService,
    StageRestService
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
      OfflineActivityCollectionRestService.initialize();
      ActivityRestService.initialize();
      ActivityImportRestService.initialize();
      SurveyRestService.initialize();
      SurveyGroupRestService.initialize();
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
      UserActivityPendencyRestService.initialize();
      ParticipantContactRestService.initialize();
      LocationPointRestService.initialize();
      ProjectCommunicationRestService.initialize();
      ActivitySharingRestService.initialize();
      StageRestService.initialize();
    }
  }
}());
