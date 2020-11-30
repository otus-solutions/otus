xdescribe('StageRestService_UnitTest_Suite', () => {

  const UNINITIALIZED_REST_ERROR_MESSAGE = 'StageRestService resource is not initialized.';

  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.inject($injector => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.StageRestService', Injections);

      // spyOn(Injections.OtusRestResourceService.getStageResourceFactory, 'getAll').and.returnValue(Promise.resolve([]));
    });
  });

  it('service_existence_check', () => {
    expect(service).toBeDefined();
  });

  xit('service_methods_existence_check', () => {
    expect(service.initialize).toBeDefined();
    expect(service.getAllStages).toBeDefined();
  });

  xit('initializeMethod_should_evoke_getStageResourceFactory_from_OtusRestResourceService', () => {
    service.initialize();
    expect(Injections.OtusRestResourceService.getStageResourceFactory).toHaveBeenCalledTimes(1);
  });

});