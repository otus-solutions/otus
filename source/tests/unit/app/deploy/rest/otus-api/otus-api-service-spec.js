describe('OtusApiService_UnitTest_Suite', () => {
  let service;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.ActivityRestService = $injector.get('otusjs.deploy.ActivityRestService');
      Injections.UserActivityPendencyRestService = $injector.get('otusjs.deploy.UserActivityPendencyRestService');
      Injections.ParticipantContactRestService = $injector.get('otusjs.deploy.ParticipantContactRestService');
      Injections.ProjectCommunicationRestService = $injector.get('otusjs.deploy.ProjectCommunicationRestService');
      Injections.ActivitySharingRestService = $injector.get('otusjs.deploy.ActivitySharingRestService');
      Injections.StageRestService = $injector.get('otusjs.deploy.StageRestService');

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
