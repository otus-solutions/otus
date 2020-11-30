describe('OtusApiService_UnitTest_Suite', () => {
  let service;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.AuthenticationRestService = $injector.get('otusjs.deploy.user.AuthenticationRestService');
      Injections.InstallerRestService = $injector.get('otusjs.deploy.InstallerRestService');
      Injections.ActivityRestService = $injector.get('otusjs.deploy.ActivityRestService');
      Injections.OfflineActivityCollectionRestService = $injector.get('otusjs.deploy.OfflineActivityCollectionRestService');
      Injections.ActivityImportRestService = $injector.get('otusjs.deploy.ActivityImportRestService');
      Injections.SurveyRestService = $injector.get('otusjs.deploy.SurveyRestService');
      Injections.SurveyGroupRestService = $injector.get('otusjs.deploy.SurveyGroupRestService');
      Injections.ActivityConfigurationRestService = $injector.get('otusjs.deploy.ActivityConfigurationRestService');
      Injections.ConfigurationRestService = $injector.get('otusjs.deploy.ConfigurationRestService');
      Injections.FieldCenterRestService = $injector.get('otusjs.deploy.FieldCenterRestService');
      Injections.ParticipantRestService = $injector.get('otusjs.deploy.ParticipantRestService');
      Injections.UserRestService = $injector.get('otusjs.deploy.user.UserRestService');
      Injections.LaboratoryRestService = $injector.get('otusjs.deploy.LaboratoryRestService');
      Injections.SampleTransportRestService = $injector.get('otusjs.deploy.SampleTransportRestService');
      Injections.ExamsRestService = $injector.get('otusjs.deploy.ExamsRestService');
      Injections.ParticipantReportRestService = $injector.get('otusjs.deploy.ParticipantReportRestService');
      Injections.MonitoringRestService = $injector.get('otusjs.deploy.monitoring.MonitoringRestService');
      Injections.UserAccessRecoveryRestService = $injector.get('otusjs.deploy.user.UserAccessRecoveryRestService');
      Injections.LaboratoryMonitoringRestService = $injector.get('otusjs.deploy.monitoring.LaboratoryMonitoringRestService');

      Injections.UserActivityPendencyRestService = $injector.get('otusjs.deploy.UserActivityPendencyRestService');
      Injections.ParticipantContactRestService = $injector.get('otusjs.deploy.ParticipantContactRestService');
      Injections.ProjectCommunicationRestService = $injector.get('otusjs.deploy.ProjectCommunicationRestService');
      Injections.ActivitySharingRestService = $injector.get('otusjs.deploy.ActivitySharingRestService');
      // Injections.StageRestService = $injector.get('otusjs.deploy.StageRestService');

      service = $injector.get('otusjs.deploy.OtusApiService', Injections);
      spyOn(Injections.ActivityRestService, 'initialize');
      spyOn(Injections.UserActivityPendencyRestService, 'initialize');
      spyOn(Injections.ParticipantContactRestService, 'initialize');
      spyOn(Injections.ProjectCommunicationRestService, 'initialize');
      spyOn(Injections.ActivitySharingRestService, 'initialize');
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.initializeOpenResources).toBeDefined();
    expect(service.initializeConfigurationResources).toBeDefined();
    expect(service.initializeRestrictResources).toBeDefined();
  });

  it('initializeRestrictResourcesMethod_should_evoke_initialize_by_ActivityRestService', () => {
    service.initializeRestrictResources();
    expect(Injections.ActivityRestService.initialize).toHaveBeenCalledTimes(1);
  });

  it('initializeRestrictResourcesMethod_should_evoke_initialize_by_UserActivityPendencyRestService', () => {
    service.initializeRestrictResources();
    expect(Injections.UserActivityPendencyRestService.initialize).toHaveBeenCalledTimes(1);
  });

  it('initializeRestrictResourcesMethod_should_evoke_initialize_by_ParticipantContactRestService', () => {
    service.initializeRestrictResources();
    expect(Injections.ParticipantContactRestService.initialize).toHaveBeenCalledTimes(1);
  });

  it('initializeRestrictResourcesMethod_should_evoke_initialize_by_ProjectCommunicationRestService', () => {
    service.initializeRestrictResources();
    expect(Injections.ProjectCommunicationRestService.initialize).toHaveBeenCalledTimes(1);
  });

  it('initializeRestrictResourcesMethod_should_evoke_initialize_by_ActivitySharingRestService', () => {
    service.initializeRestrictResources();
    expect(Injections.ActivitySharingRestService.initialize).toHaveBeenCalledTimes(1);
  });

});
