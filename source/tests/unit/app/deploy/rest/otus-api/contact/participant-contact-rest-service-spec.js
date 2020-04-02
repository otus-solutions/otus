describe('ParticipantContactRestService_UnitTest_Suite', () => {

  const UNINITIALIZED_REST_ERROR_MESSAGE = 'Error: REST resource is not initialized.';
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.inject($injector => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.ParticipantContactRestService', Injections);

      Mock._rest = Injections.OtusRestResourceService.getParticipantContactResource();
      spyOn(Injections.OtusRestResourceService, 'getParticipantContactResource').and.returnValue(Mock._rest);
      spyOn(Mock._rest, 'create').and.callThrough();
      spyOn(Mock._rest, 'get').and.callThrough();
      spyOn(Mock._rest, 'getByRecruitmentNumber').and.callThrough();
      spyOn(Mock._rest, 'addNonMainEmail').and.callThrough();
      spyOn(Mock._rest, 'addNonMainAddress').and.callThrough();
      spyOn(Mock._rest, 'addNonMainPhoneNumber').and.callThrough();
      spyOn(Mock._rest, 'updateEmail').and.callThrough();
      spyOn(Mock._rest, 'updateAddress').and.callThrough();
      spyOn(Mock._rest, 'updatePhoneNumber').and.callThrough();
      spyOn(Mock._rest, 'swapMainContact').and.callThrough();
      spyOn(Mock._rest, 'delete').and.callThrough();
      spyOn(Mock._rest, 'deleteNonMainContact').and.callThrough();

      Mock.ParticipantContactFactory = $injector.get('otusjs.model.participantContact.ParticipantContactFactory');
      Mock.ParticipantContactDocument = JSON.stringify(Test.utils.data.participantContact);
      Mock.id = Mock.ParticipantContactDocument._id;
      Mock.rn = Mock.ParticipantContactDocument.recruitmentNumber;
      Mock.participantContact = Mock.ParticipantContactFactory.fromJson(Mock.ParticipantContactDocument);

      mock();
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.initialize).toBeDefined();
    expect(service.createParticipantContact).toBeDefined();
    expect(service.getParticipantContact).toBeDefined();
    expect(service.getParticipantContactByRecruitmentNumber).toBeDefined();
    expect(service.addNonMainEmail).toBeDefined();
    expect(service.addNonMainAddress).toBeDefined();
    expect(service.addNonMainPhoneNumber).toBeDefined();
    expect(service.updateEmail).toBeDefined();
    expect(service.updateAddress).toBeDefined();
    expect(service.updatePhoneNumber).toBeDefined();
    expect(service.swapMainContact).toBeDefined();
    expect(service.deleteParticipantContact).toBeDefined();
    expect(service.deleteNonMainContact).toBeDefined();
  });

  it('initializeMethod_should_evoke_getParticipantContactResource_by_OtusRestResourceService', () => {
    service.initialize();
    expect(Injections.OtusRestResourceService.getParticipantContactResource).toHaveBeenCalledTimes(1);
  });

  it('createParticipantContactMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.createParticipantContact(Mock.ParticipantContactDocument) }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('createParticipantContactMethod_should_evoke_create_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.createParticipantContact(Mock.ParticipantContactDocument)).toBePromise();
    expect(Mock._rest.create).toHaveBeenCalledTimes(1);
  });

  it('getParticipantContactMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.getParticipantContact(Mock.id)}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('getParticipantContactMethod_should_evoke_get_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.getParticipantContact(Mock.id)).toBePromise();
    expect(Mock._rest.get).toHaveBeenCalledTimes(1);
  });

  it('getParticipantContactByRecruitmentNumberMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.getParticipantContactByRecruitmentNumber(Mock.rn)}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('getParticipantContactByRecruitmentNumberMethod_should_evoke_getByRecruitmentNumber_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.getParticipantContactByRecruitmentNumber(Mock.rn)).toBePromise();
    expect(Mock._rest.getByRecruitmentNumber).toHaveBeenCalledTimes(1);
  });

  it('addNonMainEmailMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.addNonMainEmail()}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('addNonMainEmailMethod_should_evoke_addNonMainEmail_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.addNonMainEmail(Mock.email)).toBePromise();
    expect(Mock._rest.addNonMainEmail).toHaveBeenCalledTimes(1);
  });

  it('addNonMainAddressMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.addNonMainAddress()}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('addNonMainAddressMethod_should_evoke_addNonMainAddress_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.addNonMainAddress(Mock.address)).toBePromise();
    expect(Mock._rest.addNonMainAddress).toHaveBeenCalledTimes(1);
  });

  it('addNonMainPhoneNumberMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.addNonMainPhoneNumber()}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('addNonMainPhoneNumberMethod_should_evoke_addNonMainPhoneNumber_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.addNonMainPhoneNumber(Mock.address)).toBePromise();
    expect(Mock._rest.addNonMainPhoneNumber).toHaveBeenCalledTimes(1);
  });

  it('updateEmailMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.updateEmail()}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('updateEmailMethod_should_evoke_updateEmail_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.updateEmail(Mock.email)).toBePromise();
    expect(Mock._rest.updateEmail).toHaveBeenCalledTimes(1);
  });

  it('updateAddressMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.updateAddress()}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('updateAddressMethod_should_evoke_updateAddress_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.updateAddress(Mock.address)).toBePromise();
    expect(Mock._rest.updateAddress).toHaveBeenCalledTimes(1);
  });

  it('updatePhoneNumberMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.updatePhoneNumber()}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('updatePhoneNumberMethod_should_evoke_updatePhoneNumber_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.updatePhoneNumber(Mock.address)).toBePromise();
    expect(Mock._rest.updatePhoneNumber).toHaveBeenCalledTimes(1);
  });

  it('swapMainContactMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.swapMainContact()}
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('swapMainContactMethod_should_evoke_swapMainContact_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.swapMainContact(Mock.participantContact)).toBePromise();
    expect(Mock._rest.swapMainContact).toHaveBeenCalledTimes(1);
  });

  it('deleteParticipantContactMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.deleteParticipantContact() }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('deleteParticipantContactMethod_should_evoke_deleteParticipantContact_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.deleteParticipantContact(Mock.id)).toBePromise();
    expect(Mock._rest.delete).toHaveBeenCalledTimes(1)
  });

  it('deleteNonMainContactMethod_should_throw_error_if_resource_is_not_initialized', () => {
    try{ service.deleteNonMainContact() }
    catch(e) { expect(e.toString()).toBe(UNINITIALIZED_REST_ERROR_MESSAGE)}
  });

  it('deleteNonMainContactMethod_should_evoke_deleteNonMainContact_by_resource_and_return_promise', () => {
    service.initialize();
    expect(service.deleteNonMainContact(Mock.participantContact)).toBePromise();
    expect(Mock._rest.deleteNonMainContact).toHaveBeenCalledTimes(1)
  });

  function mock() {
    Mock.email = {
      "main" : {
        "value" : {
          "content" : "fulano@gmail.com"
        },
        "observation" : "casa"
      }
    };

    Mock.phone = {
      "main" : {
        "value" : {
          "content" : "5199999999"
        },
        "observation" : "casa"
      }
    };

    Mock.address = {
      "main" : {
        "value" : {
          "postalCode" : "94333-000",
          "street" : "Rua General Vitorino",
          "streetNumber" : 750,
          "complements" : "casa",
          "neighbourhood" : "Centro",
          "city" : "Porto Alegre",
          "state" : "RS",
          "country" : "Brasil"
        },
        "observation" : "eerer"
      }
    }
  }

});