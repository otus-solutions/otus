describe('ProjectCommunicationRestService_UnitTest_Suite', () => {

  const UNINITIALIZED_REST_ERROR_MESSAGE = 'Error: REST resource is not initialized.';
  let service;
  let Injections = [];
  let Mock = {};
  let ID = "5ebffb13ebd7a536225224e8";
  let LIMIT = "12";

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.inject($injector => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.ProjectCommunicationRestService', Injections);

      Mock._rest = Injections.OtusRestResourceService.getProjectCommunicationResourceFactory();
      spyOn(Injections.OtusRestResourceService, 'getProjectCommunicationResourceFactory').and.returnValue(Mock._rest);
      spyOn(Mock._rest, 'createMessage').and.callThrough();
      spyOn(Mock._rest, 'createIssue').and.callThrough();
      spyOn(Mock._rest, 'getMessageById').and.callThrough();
      spyOn(Mock._rest, 'getMessageByIdLimit').and.callThrough();
      spyOn(Mock._rest, 'updateReopen').and.callThrough();
      spyOn(Mock._rest, 'updateClose').and.callThrough();
      spyOn(Mock._rest, 'updateFinalize').and.callThrough();
      spyOn(Mock._rest, 'filter').and.callThrough();
      spyOn(Mock._rest, 'getSenderById').and.callThrough();
    });
  });

  it('serviceExistence_check', () => {

  });

  it('serviceMethodsExistence_check', () => {
    expect(service.initialize).toBeDefined();
    expect(service.createMessage).toBeDefined();
    expect(service.createIssue).toBeDefined();
    expect(service.getProjectCommunicationById).toBeDefined();
    expect(service.getProjectCommunicationByIdLimit).toBeDefined();
    expect(service.updateReopen).toBeDefined();
    expect(service.updateClose).toBeDefined();
    expect(service.updateFinalized).toBeDefined();
    expect(service.filter).toBeDefined();
    expect(service.getAllIssueMessages).toBeDefined();
    expect(service.getSenderById).toBeDefined();
  });

  it('initializeMethod_should_evoke_getProjectCommunicationResourceFactory_by_OtusRestResourceService', () => {
    service.initialize();
    expect(Injections.OtusRestResourceService.getProjectCommunicationResourceFactory).toHaveBeenCalledTimes(1);
  });

  it('createMessageMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.createMessage(ID, Mock) }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('createMessageMethod_should_evoke_create_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.createMessage(ID, Mock)).toBePromise();
    expect(Mock._rest.createMessage).toHaveBeenCalledTimes(1)
  });

  it('createIssueMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.createIssue(Mock) }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('createIssueMethod_should_evoke_createIssue_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.createIssue(Mock)).toBePromise();
    expect(Mock._rest.createIssue).toHaveBeenCalledTimes(1)
  });

  it('getProjectCommunicationByIdMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.getProjectCommunicationById(ID) }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('getProjectCommunicationByIdMethod_should_evoke_getMessageById_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.getProjectCommunicationById(ID)).toBePromise();
    expect(Mock._rest.getMessageById).toHaveBeenCalledTimes(1)
  });

  it('getProjectCommunicationByIdLimitMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.getProjectCommunicationByIdLimit(ID, LIMIT) }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('getProjectCommunicationByIdLimitMethod_should_evoke_getMessageByIdLimit_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.getProjectCommunicationByIdLimit(ID, LIMIT)).toBePromise();
    expect(Mock._rest.getMessageByIdLimit).toHaveBeenCalledTimes(1)
  });

  it('updateReopenMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.updateReopen(ID) }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('updateReopenMethod_should_evoke_updateReopen_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.updateReopen(ID)).toBePromise();
    expect(Mock._rest.updateReopen).toHaveBeenCalledTimes(1)
  });

  it('updateCloseMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.updateClose(ID) }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('updateCloseMethod_should_evoke_updateClose_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.updateClose(ID)).toBePromise();
    expect(Mock._rest.updateClose).toHaveBeenCalledTimes(1)
  });

  it('filterMethod_should_evoke_filter_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.filter(Mock)).toBePromise();
    expect(Mock._rest.filter).toHaveBeenCalledTimes(1)
  });

});