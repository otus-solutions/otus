describe('ModuleService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.$q = $injector.get('$q');
      Injections.ContextService = $injector.get('otusjs.user.comment.core.ContextService');
      service = $injector.get('otusjs.user.comment.core.ModuleService', Injections);
      spyOn(Injections.ContextService, 'configureContext');
      spyOn(Injections.ContextService, 'configureStorage');
      spyOn(Injections.$q, 'defer').and.returnValue({resolve: function (data) {}});

    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.configureContext).toBeDefined();
    expect(service.configureStorage).toBeDefined();
    expect(service.configureRemoteStorage).toBeDefined();
    expect(service.getUserCommentAboutParticipantRemoteStorage).toBeDefined();
  });

  it('configureContextMethod_should_evoke_contextService_configureContext', () => {
    service.configureContext(Mock);
    expect(Injections.ContextService.configureContext).toHaveBeenCalledTimes(1)
  });

  it('configureStorageMethod_should_evoke_contextService_configureStorage', () => {
    service.configureStorage(Mock);
    expect(Injections.ContextService.configureStorage).toHaveBeenCalledTimes(1)
  });

  it('configureRemoteStorageMethod_and_getUserCommentAboutParticipantRemoteStorageMethod_should_resolve_promise', () => {
    service.configureRemoteStorage(true);
    service.getUserCommentAboutParticipantRemoteStorage();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(1)
  });

});
