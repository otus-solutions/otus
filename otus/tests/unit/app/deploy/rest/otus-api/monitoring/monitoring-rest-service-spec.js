fdescribe('MonitoringRestService', function () {
  var service;
  var Injections = [];

  const ACRONYM = 'ACTA';
  const CENTER = 'RS';
  const RECRUITMENT_NUMBER = '123456'
  const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';
  const DATA = {};

  beforeEach(function () {
    angular.mock.module('otusjs.deploy.monitoring');
    angular.mock.module('otus.client');

    angular.mock.inject(function (_$injector_) {
      Injections.OtusRestResourceService = _$injector_.get('OtusRestResourceService');
      service = _$injector_.get('otusjs.deploy.monitoring.MonitoringRestService', Injections);

      spyOn(Injections.OtusRestResourceService, "getOtusMonitoringResource").and.callThrough();
    });
  });

  it('serviceExistence_check ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', function () {
    expect(service.initialize).toBeDefined();
    expect(service.list).toBeDefined();
    expect(service.find).toBeDefined();
    expect(service.listAcronyms).toBeDefined();
    expect(service.listCenters).toBeDefined();
    expect(service.getActivitiesProgressReport).toBeDefined();
    expect(service.getStatusOfActivities).toBeDefined();
    expect(service.defineActivityWithDoesNotApplies).toBeDefined();
    expect(service.deleteNotAppliesOfActivity).toBeDefined();
    expect(service.getStatusOfExams).toBeDefined();
    expect(service.defineExamWithDoesNotApplies).toBeDefined();
    expect(service.deleteNotAppliesOfExam).toBeDefined();
    expect(service.getExamsName).toBeDefined();
    expect(service.getExamsProgressReport).toBeDefined();
  });

  it('initialiaze_method_should_evoke_getOtusMonitoringResource_of_OtusRestResourceService ', function () {
    service.initialize();
    expect(Injections.OtusRestResourceService.getOtusMonitoringResource).toHaveBeenCalledTimes(1);
  });

  it('list_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.list).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('list_method_should_return_promise', function () {
    console.log(service);
    service.initialize();
    expect(service.list()).toBePromise();
  });

  it('find_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.find).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('find_method_should_return_promise', function () {
    service.initialize();
    expect(service.find(ACRONYM)).toBePromise();
  });

  it('listAcronyms_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.listAcronyms).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('listAcronyms_method_should_return_promise', function () {
    service.initialize();
    expect(service.listAcronyms()).toBePromise();
  });

  it('listCenters_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.listCenters).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('listCenters_method_should_return_promise', function () {
    service.initialize();
    expect(service.listCenters()).toBePromise();
  });

  it('getActivitiesProgressReport_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.getActivitiesProgressReport).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('getActivitiesProgressReport_method_should_return_promise', function () {
    service.initialize();
    expect(service.getActivitiesProgressReport(CENTER)).toBePromise();
  });

  it('getStatusOfActivities_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.getStatusOfActivities).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('getStatusOfActivities_method_should_return_promise', function () {
    service.initialize();
    expect(service.getStatusOfActivities(RECRUITMENT_NUMBER)).toBePromise();
  });

  it('defineActivityWithDoesNotApplies_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.defineActivityWithDoesNotApplies).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('defineActivityWithDoesNotApplies_method_should_return_promise', function () {
    service.initialize();
    expect(service.defineActivityWithDoesNotApplies(DATA)).toBePromise();
  });

  it('deleteNotAppliesOfActivity_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.deleteNotAppliesOfActivity).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('deleteNotAppliesOfActivity_method_should_return_promise', function () {
    service.initialize();
    expect(service.deleteNotAppliesOfActivity(RECRUITMENT_NUMBER, ACRONYM)).toBePromise();
  });

  it('getStatusOfExams_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.getStatusOfExams).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('getStatusOfExams_method_should_return_promise', function () {
    service.initialize();
    expect(service.getStatusOfExams(RECRUITMENT_NUMBER)).toBePromise();
  });

  it('defineExamWithDoesNotApplies_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.defineExamWithDoesNotApplies).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('defineExamWithDoesNotApplies_method_should_return_promise', function () {
    service.initialize();
    expect(service.defineExamWithDoesNotApplies(DATA)).toBePromise();
  });

  it('deleteNotAppliesOfExam_method_should_throw_error_with_message_if_monitoringResource_is_not_initialized', function () {
    expect(service.deleteNotAppliesOfExam).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('deleteNotAppliesOfExam_method_should_return_promise', function () {
    service.initialize();
    expect(service.deleteNotAppliesOfExam(DATA)).toBePromise();
  });

  it('getExamsName_method_should_return_promise', function () {
    service.initialize();
    expect(service.getExamsName(CENTER)).toBePromise();
  });

  it('getExamsProgressReport_method_should_return_promise', function () {
    service.initialize();
    expect(service.getExamsProgressReport(CENTER)).toBePromise();
  });
});
