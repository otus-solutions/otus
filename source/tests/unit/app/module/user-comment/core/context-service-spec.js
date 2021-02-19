fdescribe('ContextService_UnitTest_Suite', () => {
  let service;
  let Mock = {};

  const UNINITIALIZED_REST_ERROR_MESSAGE_CONTEXT = 'Internal context is not initialized.';
  const UNINITIALIZED_REST_ERROR_MESSAGE_STORAGE = 'Internal storage is not initialized.';

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      service = $injector.get('otusjs.user.comment.core.ContextService');

      Mock.contextFactory = $injector.get('otusjs.application.context.ContextFactory');
      Mock.StorageService = $injector.get('otusjs.application.storage.StorageService');

      spyOn(Mock.contextFactory, 'create').and.callThrough();
      spyOn(Mock.StorageService.session, 'setItem').and.callThrough();
      spyOn(Mock.StorageService.session, 'getItem').and.callThrough();

    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.begin).toBeDefined();
    expect(service.save).toBeDefined();
    expect(service.end).toBeDefined();
    expect(service.configureContext).toBeDefined();
    expect(service.configureStorage).toBeDefined();
  });

  it('beginMethod_and_configureContext_and_configureStorage_should_evoke_save_factory_session', () => {
    service.configureContext(Mock.contextFactory);
    service.configureStorage(Mock.StorageService.session);

    service.begin();

    expect(Mock.contextFactory.create).toHaveBeenCalledTimes(1);
    expect(Mock.StorageService.session.setItem).toHaveBeenCalledTimes(1);
  });

  it('saveMethod_should_e_throw_new_Error_the_context', () => {
    expect(service.save).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE_CONTEXT);
  });

  it('saveMethod_should_e_throw_new_Error_the_storage', () => {
    service.configureContext(Mock.contextFactory);
    expect(service.save).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE_STORAGE);
  });

  it('endMethod_should_e_throw_new_Error_the_context', () => {
    expect(service.end).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE_CONTEXT);
  });

  it('endMethod_should_e_throw_new_Error_the_storage', () => {
    service.configureContext(Mock.contextFactory);
    expect(service.end).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE_STORAGE);
  });
});
