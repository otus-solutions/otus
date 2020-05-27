describe('OtusApiService_UnitTest_Suite', () => {
  let service;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.UserActivityPendencyRestService = $injector.get('otusjs.deploy.UserActivityPendencyRestService');
      Injections.ParticipantContactRestService = $injector.get('otusjs.deploy.ParticipantContactRestService');
      Injections.ProjectCommunicationRestService = $injector.get('otusjs.deploy.ProjectCommunicationRestService');
      service = $injector.get('otusjs.deploy.OtusApiService', Injections);
      spyOn(Injections.UserActivityPendencyRestService, 'initialize');
      spyOn(Injections.ParticipantContactRestService, 'initialize');
      spyOn(Injections.ProjectCommunicationRestService, 'initialize');
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

});