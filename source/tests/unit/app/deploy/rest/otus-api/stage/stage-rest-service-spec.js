describe('StageRestService_UnitTest_Suite', () => {

  const UNINITIALIZED_REST_ERROR_MESSAGE = 'StageRestService resource is not initialized.';

  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.inject($injector => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.StageRestService', Injections);

      Mock._rest = Injections.OtusRestResourceService.getStageResourceFactory();
      spyOn(Injections.OtusRestResourceService, 'getStageResourceFactory').and.returnValue(Mock._rest);
    });
  });

  it('service_existence_check', () => {
    expect(service).toBeDefined();
  });

  it('service_methods_existence_check', () => {
    expect(service.initialize).toBeDefined();
    expect(service.getAllStages).toBeDefined();
  });

  it('initializeMethod_should_evoke_getStageResourceFactory_from_OtusRestResourceService', () => {
    service.initialize();
    expect(Injections.OtusRestResourceService.getStageResourceFactory).toHaveBeenCalledTimes(1);
  });

  describe('getAllStages_method', () => {

    it('should_throw_error_in_case_rest_not_initialized', () => {
      expect(function () {
        service.getAllStages();
      }).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('should_return_promise_and_call_getAll_rest_method', () => {
      spyOn(Mock._rest, 'getAll').and.callThrough();
      service.initialize();
      expect(service.getAllStages()).toBePromise();
      expect(Mock._rest.getAll).toHaveBeenCalledTimes(1);
    });

  });

});