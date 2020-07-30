describe("ParticipantRestService_UnitTest_Suite", () => {
  const UNINITIALIZED_REST_ERROR_MESSAGE = 'Error: REST resource is not initialized.';
  let service;
  let Injections = [];
  let Mock = {};
  let ID = "5ebffb13ebd7a536225224e8";
  let MAIL = "mail@mail.com";

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.ParticipantRestService', Injections);

      spyOn(Injections.OtusRestResourceService, "getParticipantResource").and.callThrough();
    });

  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodExistence_check', () => {
    expect(service.initialize).toBeDefined();
    expect(service.list).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.getByRecruitmentNumber).toBeDefined();
    expect(service.getFollowUps).toBeDefined();
    expect(service.requestPasswordReset).toBeDefined();
    expect(service.requestPasswordResetLink).toBeDefined();
    expect(service.activateFollowUpEvent).toBeDefined();
    expect(service.deactivateFollowUpEvent).toBeDefined();
    expect(service.updateLoginEmail).toBeDefined();
    expect(service.getEmailByParticipantId).toBeDefined();
    expect(service.removeEmailByParticipantId).toBeDefined();
  });

  it('updateLoginEmailMethod_should_evoke_defer_by_editEmail_and_return_promise', () => {
    service.initialize();
    expect(service.updateLoginEmail(ID, MAIL)).toBePromise();
  });

  it('createUserActivityPendencyMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try { service.updateLoginEmail() }
    catch (e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE) }
  });

  it('getEmailByParticipantIdMethod_should_evoke_defer_by_getEmailByParticipantId_and_return_promise', () => {
    service.initialize();
    expect(service.getEmailByParticipantId(ID)).toBePromise();
  });

  it('getEmailByParticipantIdMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try { service.getEmailByParticipantId() }
    catch (e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE) }
  });

  it('removeEmailByParticipantIdMethod_should_evoke_defer_by_removeEmailByParticipantId_and_return_promise', () => {
    service.initialize();
    expect(service.removeEmailByParticipantId(ID)).toBePromise();
  });

  it('removeEmailByParticipantIdMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try { service.removeEmailByParticipantId() }
    catch (e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE) }
  });
})
