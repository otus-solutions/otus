describe('UserActivityPendencyRestService_UnitTest_Suite', () => {

  const UNINITIALIZED_REST_ERROR_MESSAGE = 'Error: REST resource is not initialized.';
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.inject($injector => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.UserActivityPendencyRestService', Injections);

      Mock._rest = Injections.OtusRestResourceService.getUserActivityPendencyResource();
      spyOn(Injections.OtusRestResourceService, 'getUserActivityPendencyResource').and.returnValue(Mock._rest);
      spyOn(Mock._rest, 'create').and.callThrough();
      spyOn(Mock._rest, 'getByActivityId').and.callThrough();
      spyOn(Mock._rest, 'update').and.callThrough();
      spyOn(Mock._rest, 'delete').and.callThrough();

      Mock.userActivityPendencyFactory = $injector.get('otusjs.model.pendency.UserActivityPendencyFactory');
      Mock.UserActivityPendencyDocument = JSON.stringify(Test.utils.data.userActivityPendency);
      Mock.userActivityPendency = Mock.userActivityPendencyFactory.fromJsonObject(Mock.UserActivityPendencyDocument);
      Mock._id = Mock.userActivityPendency.getID();
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.initialize).toBeDefined();
    expect(service.createUserActivityPendency).toBeDefined();
    expect(service.getPendencyByActivityId).toBeDefined();
    expect(service.updateUserActivityPendency).toBeDefined();
    expect(service.deleteUserActivityPendency).toBeDefined();
  });

  it('initializeMethod_should_evoke_getUserActivityPendencyResource_by_OtusRestResourceService', () => {
    service.initialize();
    expect(Injections.OtusRestResourceService.getUserActivityPendencyResource).toHaveBeenCalledTimes(1);
  });

  it('createUserActivityPendencyMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.createUserActivityPendency(Mock.UserActivityPendencyDocument) }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('createUserActivityPendencyMethod_should_evoke_create_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.createUserActivityPendency(Mock.UserActivityPendencyDocument)).toBePromise();
    expect(Mock._rest.create).toHaveBeenCalledTimes(1)
  });

  it('getPendencyByActivityIdMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.getPendencyByActivityId(Mock._id)}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}

  });

  it('getPendencyByActivityIdMethod_should_evoke_create_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.getPendencyByActivityId(Mock._id)).toBePromise();
    expect(Mock._rest.getByActivityId).toHaveBeenCalledTimes(1)
  });

  it('updateUserActivityPendencyMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.updateUserActivityPendency(Mock._id, Mock.UserActivityPendencyDocument)}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('updateUserActivityPendencyMethod_should_evoke_create_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.updateUserActivityPendency(Mock._id, Mock.UserActivityPendencyDocument)).toBePromise();
    expect(Mock._rest.update).toHaveBeenCalledTimes(1)
  });

  it('deleteUserActivityPendencyMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.deleteUserActivityPendency(Mock._id) }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('deleteUserActivityPendencyMethod_should_evoke_create_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.deleteUserActivityPendency(Mock._id)).toBePromise();
    expect(Mock._rest.delete).toHaveBeenCalledTimes(1)
  });

});