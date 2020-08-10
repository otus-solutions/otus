describe('ContextService ApplicationSession test', function () {
  var Mock= {};
  var service;
  var Injections = [];
  var UNINITIALIZED_REST_ERROR_MESSAGE_CONTEXT = "Internal context is not initialized.";
  var UNINITIALIZED_REST_ERROR_MESSAGE_STORAGE = "Internal storage is not initialized.";
  var UNINITIALIZED_REST_ERROR_MESSAGE_HAS_CONTEXT = "There is no active session context.";

  beforeEach(function () {

    angular.mock.module('otusjs.application.session.core');
    angular.mock.module('otusjs.application.context');
    angular.mock.module('otusjs.application.core');
    angular.mock.module('otusjs.application.storage');
    angular.mock.module('otusjs.application.dialog')

    angular.mock.module(function ($provide) {
      $provide.value('$mdDialog', Mock.mdDialog);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
    });

    angular.mock.inject(function (_$injector_) {
      mockData(_$injector_);
      Injections.$q = _$injector_.get('$q');
      Injections.$window = _$injector_.get('$window');
      Injections.EventService = _$injector_.get('otusjs.application.session.core.EventService');
      Injections.LoadingScreenService = _$injector_.get('otusjs.deploy.LoadingScreenService');
      Injections.DialogShowService = _$injector_.get('otusjs.application.dialog.DialogShowService');

      service =  _$injector_.get('otusjs.application.session.core.ContextService', Injections);

    });

    spyOn(Mock.storageService,'setItem').and.returnValue(Promise.resolve());
    spyOn(Mock.storageService,'removeItem').and.returnValue("");

    spyOn(Injections.$window.sessionStorage, 'setItem').and.callThrough();
    spyOn(Injections.$window.sessionStorage, 'removeItem').and.callThrough();
    spyOn(Injections.$q, 'defer').and.callThrough();
    spyOn(Injections.EventService, 'fireLogin').and.callThrough();
  });

  it('serviceExistence_check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', function () {
    expect(service.begin).toBeDefined();
    expect(service.restore).toBeDefined();
    expect(service.end).toBeDefined();
    expect(service.isValid).toBeDefined();
    expect(service.hasContextActive).toBeDefined();
    expect(service.save).toBeDefined();
    expect(service.configureContext).toBeDefined();
    expect(service.configureStorage).toBeDefined();
    expect(service.getLoggedUser).toBeDefined();
    expect(service.getData).toBeDefined();
    expect(service.setData).toBeDefined();
    expect(service.removeData).toBeDefined();
    expect(service.getToken).toBeDefined();
  });

  it('begin_method_should_evoke_internalMethods', function () {
    service.configureContext(Mock.contextFactory);
    service.configureStorage(Mock.storageService);
    service.begin(Mock.sessionData);
    expect(Injections.$window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
    expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
  });

  it('restore_method_should_evoke_internalMethods', function () {
    service.configureContext(Mock.contextFactory);
    service.configureStorage(Mock.storageService);
    spyOn(Mock.storageService,'getItem').and.returnValue("{}");
    service.restore();
    expect(Injections.EventService.fireLogin).toHaveBeenCalledTimes(1);
  });

  it('end_method_should_evoke_internalMethods', function () {
    service.configureContext(Mock.contextFactory);
    service.configureStorage(Mock.storageService);
    service.end();
    expect(Injections.$window.sessionStorage.removeItem).toHaveBeenCalledTimes(1);
  });

  it('isValid_method_should_throw_error_with_message_if_context_is_not_initialized', function () {
    expect(service.isValid).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE_CONTEXT);
  });

  it('isValid_method_should_throw_error_with_message_if_storage_is_not_initialized', function () {
    service.configureContext(Mock.contextFactory);
    expect(service.isValid).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE_STORAGE);
  });

  it('removeData_method_should_execute', function () {
    spyOn(service,'removeData').and.callThrough();
    service.configureContext(Mock.contextFactory);
    service.configureStorage(Mock.storageService);
    service.removeData();
    expect(service.removeData).toHaveBeenCalledTimes(1);
  });

  it('getLoggedUser_method_should_return_promise', function () {
    expect(service.getLoggedUser()).toBePromise();
  });

  it('getToken_method_should_return', function () {
    expect(service.getToken()).toEqual(null);
  });

  function mockData(_$injector_) {
    Mock.sessionData = {
      token: "eyJhbGciOiJIUzI1NiJ8."
    };
    Mock.contextFactory = _$injector_.get('otusjs.application.context.ContextFactory');
    Mock.storageService = _$injector_.get('otusjs.application.storage.SessionStorageService');
  }
});