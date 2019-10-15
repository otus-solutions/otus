describe("ParticipantReportRestService_UnitTest_Suite", () =>{
  const ERROR_REST_MSG = 'REST resource is not initialized.';
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.ParticipantReportRestService', Injections);
      Mock.rn = '987654'
      Mock.id = '123466789';
      spyOn(Injections.OtusRestResourceService, "getReportResourceFactory").and.callThrough();
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodExistence_check', () => {
    expect(service.initialize).toBeDefined();
    expect(service.list).toBeDefined();
    expect(service.getReport).toBeDefined();
    expect(service.getActivityReport).toBeDefined();
  });

  it('initializeMethod_should_prepare_rest', () => {
    service.initialize();
    expect(Injections.OtusRestResourceService.getReportResourceFactory).toHaveBeenCalledTimes(1)
  });

  it('listMethod_should_return_promise_by_factory_of_reportResource', () => {
    service.initialize();
    expect(service.list(Mock.rn)).toBePromise();
  });

  it('listMethod_should_throw_exception_in_case_of_unpreparedRest', () => {
    expect(() => {
      service.list(Mock.rn)
    }).toThrow(new Error(ERROR_REST_MSG));
  });

  it('getReportMethod_should_return_promise_by_factory_of_reportResource', () => {
    service.initialize();
    expect(service.getReport(Mock.rn, Mock.id)).toBePromise();
  });

  it('getReportMethod_should_throw_exception_in_case_of_unpreparedRest', () => {
    expect(() => {
      service.getReport(Mock.rn, Mock.id);
    }).toThrow(new Error(ERROR_REST_MSG));
  });

  it('getActivityReportMethod_should_return_promise_by_factory_of_reportResource', () => {
    service.initialize();
    expect(service.getActivityReport(Mock.id)).toBePromise();
  });

  it('getActivityReportMethod_should_throw_exception_in_case_of_unpreparedRest', () => {
    expect(() => {
      service.getActivityReport(Mock.id)
    }).toThrow(new Error(ERROR_REST_MSG));
  });
});