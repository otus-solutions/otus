describe('ParticipantContactService_UnitTest_Suite', () => {

  const UNINITIALIZED_FACTORY_ERROR_MESSAGE =  'Model factory is not initialized.';
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.inject($injector => {
      Injections.$http = $injector.get('$http');
      Injections.ParticipantContactFactory = $injector.get('otusjs.model.participantContact.ParticipantContactFactory');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.ParticipantContactValues = $injector.get('ParticipantContactValues');
      Injections.$mdDialog = $injector.get('$mdDialog');
      service = $injector.get('otusjs.participantManager.contact.ParticipantContactService', Injections);

      service.vm = {};

      spyOn(Injections.ParticipantManagerService, 'createParticipantContact').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'getParticipantContact').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'getParticipantContactByRecruitmentNumber').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'addNonMainEmail').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'addNonMainAddress').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'addNonMainPhoneNumber').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'updateEmail').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'updateAddress').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'updatePhoneNumber').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'swapMainContact').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'deleteParticipantContact').and.callThrough();
      spyOn(Injections.ParticipantManagerService, 'deleteNonMainContact').and.callThrough();
      spyOn(Injections.ParticipantContactFactory, 'create').and.callThrough();
      spyOn(Injections.ParticipantContactFactory, 'fromJson').and.callThrough();
      spyOn(Injections.DialogShowService, 'showDialog').and.callThrough();

      Mock.ParticipantContactFactory = $injector.get('otusjs.model.participantContact.ParticipantContactFactory');
      Mock.ParticipantContactDocument = Test.utils.data.participantContact;
      Mock.id = Mock.ParticipantContactDocument._id;
      Mock.rn = Mock.ParticipantContactDocument.recruitmentNumber;
      Mock.participantContact = Mock.ParticipantContactFactory.fromJson(JSON.stringify(Mock.ParticipantContactDocument));

      mock();
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.createParticipantContact).toBeDefined();
    expect(service.getParticipantContact).toBeDefined();
    expect(service.getParticipantContactByRecruitmentNumber).toBeDefined();
    expect(service.swapMainContact).toBeDefined();
    expect(service.deleteParticipantContact).toBeDefined();
    expect(service.deleteNonMainContact).toBeDefined();
    expect(service.participantContactFactoryJson).toBeDefined();
    expect(service.participantContactFactoryCreate).toBeDefined();
    expect(service.getAddressByCep).toBeDefined();
    expect(service.createContactDto).toBeDefined();
    expect(service.dinamicUpdateContact).toBeDefined();
    expect(service.dinamicNewContactCreate).toBeDefined();
    expect(service.showDeleteDialog).toBeDefined();
    expect(service.isLastContact).toBeDefined();
  });

  it('createParticipantContactMethod_should_call_createParticipantContact_by_ParticipantManagerService', () => {
    service.createParticipantContact(Mock.ParticipantContactDocument);
    expect(Injections.ParticipantManagerService.createParticipantContact).toHaveBeenCalledTimes(1);
  });

  it('getParticipantContactMethod_should__call_getParticipantContact_by_ParticipantManagerService', () => {
    service.getParticipantContact(Mock.id);
    expect(Injections.ParticipantManagerService.getParticipantContact).toHaveBeenCalledTimes(1);
  });

  it('getParticipantContactByRecruitmentNumberMethod_should_call_getParticipantContactByRecruitmentNumber_by_ParticipantManagerService', () => {
    service.getParticipantContactByRecruitmentNumber(Mock.rn);
    expect(Injections.ParticipantManagerService.getParticipantContactByRecruitmentNumber).toHaveBeenCalledTimes(1);
  });

  it('swapMainContactMethod_should_call_swapMainContact_by_ParticipantManagerService', () => {
    service.swapMainContact(Mock.participantContact);
    expect(Injections.ParticipantManagerService.swapMainContact).toHaveBeenCalledTimes(1);
  });

  it('deleteParticipantContactMethod_should_call_deleteParticipantContact_by_ParticipantManagerService', () => {
    service.deleteParticipantContact(Mock.id);
    expect(Injections.ParticipantManagerService.deleteParticipantContact).toHaveBeenCalledTimes(1);
  });

  it('deleteNonMainContactMethod_should_call_deleteNonMainContact_by_ParticipantManagerService', () => {
    service.deleteNonMainContact(Mock.participantContact);
    expect(Injections.ParticipantManagerService.deleteNonMainContact).toHaveBeenCalledTimes(1)
  });

  it('participantContactFactoryCreateMethod_should_call_create_by_ParticipantContactFactory', () => {
    service.participantContactFactoryCreate(Mock.participantContact);
    expect(Injections.ParticipantContactFactory.create).toHaveBeenCalledTimes(1)
  });

  it('participantContactFactoryCreateMethod_should_throw_error_if_ParticipantContactFactory_is_not_initialized', () => {
    expect(service.participantContactFactoryCreate).toThrowError(UNINITIALIZED_FACTORY_ERROR_MESSAGE);
  });

  it('participantContactFactoryJsonMethod_should_call_fromJson_by_ParticipantContactFactory', () => {
    service.participantContactFactoryJson(Mock.participantContact);
    expect(Injections.ParticipantContactFactory.fromJson).toHaveBeenCalledTimes(2)
  });

  it('participantContactFactoryJsonMethod_should_throw_error_if_ParticipantContactFactory_is_not_initialized', () => {
    expect(service.participantContactFactoryJson).toThrowError(UNINITIALIZED_FACTORY_ERROR_MESSAGE);
  });

  it('getAddressByCepMethod_should_call_viaCepUrl_by_serviceWebCep', () => {
    expect(service.getAddressByCep(Mock.cep)).toBePromise();
  });

  it('createContactDtoMethod_should_return_a_object', () => {
    expect(service.createContactDto(Mock.id, Mock.position, "")).toEqual({ _id:'5e833fdfc24cae6884d69194', position: 'main', contactItem: '' });
  });

  it('dinamicUpdateContactMethod_should_return_a_type_object', () => {
    expect(service.dinamicUpdateContact(Mock.participantContact, Mock.typePhoneNumber)).toBePromise();
    expect(service.dinamicUpdateContact(Mock.participantContact, Mock.typeEmail)).toBePromise();
    expect(service.dinamicUpdateContact(Mock.participantContact, Mock.typeAddress)).toBePromise();
  });

  it('dinamicNewContactCreateMethod_should_return_a_type_object', () => {
    expect(service.dinamicNewContactCreate(Mock.participantContact, Mock.typePhoneNumber)).toBePromise();
    expect(service.dinamicNewContactCreate(Mock.participantContact, Mock.typeEmail)).toBePromise();
    expect(service.dinamicNewContactCreate(Mock.participantContact, Mock.typeAddress)).toBePromise();
  });

  it('createPositionContactDtoMethod_should_return_a_object', () => {
    expect(service.createPositionContactDto(Mock.id, Mock.typePhoneNumber, Mock.position)).toEqual({ _id:'5e833fdfc24cae6884d69194', type: 'phoneNumber',position: 'main' });
  });

  it('showDeleteDialogMethod_should_call_DialogShowService_and_ParticipantContactValues', () => {
    expect(service.showDeleteDialog()).toBePromise();
    expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
  });

  it('isLastContactMethod_should_execute_switch_case', () => {
    service.vm.type = Mock.typePhoneNumber;
    service.vm.addContactMode = {"phoneNumber":{}}
    service.isLastContact(service.vm, Mock.position, Mock.solicitationCreateNewContact);
    expect(service.vm.addContactMode[Mock.typePhoneNumber]).toBeTruthy();

    service.vm.contact = {};
    service.isLastContact(service.vm, Mock.position, Mock.solicitationUpdateContact);
    expect(service.vm.addContactMode[Mock.typePhoneNumber]).toBeTruthy();

    service.vm.contact = {fifth:{}};
    service.isLastContact(service.vm, Mock.position, Mock.solicitationUpdateContact);
    expect(service.vm.addContactMode[Mock.typePhoneNumber]).toBeFalsy();
  });

  function mock() {
    Mock.cep = "94853470";
    Mock.position = "main";
    Mock.typePhoneNumber = "phoneNumber";
    Mock.typeEmail = "email";
    Mock.typeAddress = "address";
    Mock.solicitationUpdateContact = "updateContact";
    Mock.solicitationCreateNewContact = "createNewContact";
  }

});