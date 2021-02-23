describe('UserCommentAboutParticipantModuleBootstrap_UnitTest_Suite', () => {
  let service;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.ModuleService = $injector.get('otusjs.user.comment.core.ModuleService');
      Injections.ContextFactory = $injector.get('otusjs.application.context.ContextFactory');
      Injections.StorageService = $injector.get('otusjs.application.storage.StorageService');
      Injections.UserCommentAboutParticipantRestService = $injector.get('otusjs.deploy.UserCommentAboutParticipantRestService');
      service = $injector.get('otusjs.deploy.UserCommentAboutParticipantModuleBootstrap', Injections);

      spyOn(Injections.ModuleService, 'configureRemoteStorage');
      spyOn(Injections.ModuleService, 'configureContext');
      spyOn(Injections.ModuleService, 'configureStorage');
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.bootstrap).toBeDefined();
    expect(service.configureContext).toBeDefined();
    expect(service.configureStorage).toBeDefined();
  });

  it('bootstrapMethod_should_evoke_methods_of_ModuleService', () => {
    service.bootstrap();
    expect(Injections.ModuleService.configureRemoteStorage).toHaveBeenCalledTimes(1);
    expect(Injections.ModuleService.configureContext).toHaveBeenCalledTimes(1);
    expect(Injections.ModuleService.configureStorage).toHaveBeenCalledTimes(1);
  });

  it('configureContextMethod_should_evoke_configureContext_by_ModuleService', () => {
    service.configureContext(Injections.ContextFactory);
    expect(Injections.ModuleService.configureContext).toHaveBeenCalledTimes(1);
  });

  it('configureStorageMethod_should_evoke_configureStorage_by_ModuleService', () => {
    service.configureStorage(Injections.StorageService);
    expect(Injections.ModuleService.configureStorage).toHaveBeenCalledTimes(1);
  });

});
