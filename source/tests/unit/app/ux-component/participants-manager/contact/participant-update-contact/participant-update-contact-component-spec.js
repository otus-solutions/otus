describe('ParticipantUpdateContactComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller, $q, $rootScope) => {
      Injections.ParticipantContactValues = $injector.get('ParticipantContactValues');
      Injections.ParticipantContactService = $injector.get('otusjs.participantManager.contact.ParticipantContactService');
      Injections.ParticipantMessagesService = $injector.get('otusjs.participant.business.ParticipantMessagesService');
      mockInitialize($q, $rootScope);
      ctrl = $controller('participantUpdateContactCtrl', Injections);
      ctrl.$onInit();

      ctrl.contact = angular.copy(Mock.contact);
      ctrl.type = Mock.type;
      ctrl.loadParticipantContact = Mock.loadParticipantContact;
      ctrl.contactId = Mock.contacts._id;
      ctrl.form = Mock.form;

      spyOn(Injections.ParticipantContactService,"createContactDto").and.callThrough();
      spyOn(Injections.ParticipantMessagesService, "showToast").and.callThrough();
      spyOn(Injections.ParticipantContactService, "isLastContact").and.callThrough();
      spyOn(Injections.ParticipantContactService, "createPositionContactDto").and.callThrough();
      spyOn(Injections.ParticipantContactService,"dinamicNewContactCreate").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ParticipantContactService, "showDeleteDialog").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ParticipantContactService, "deleteNonMainContact").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ParticipantContactService, "dinamicUpdateContact").and.returnValue(Mock.deferred.promise);
    });
  });

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.addContactInput).toBeDefined();
    expect(ctrl.enableEditMode).toBeDefined();
    expect(ctrl.updateContact).toBeDefined();
    expect(ctrl.restoreContact).toBeDefined();
    expect(ctrl.findAddressByCep).toBeDefined();
    expect(ctrl.createNewContact).toBeDefined();
    expect(ctrl.deleteNonMainContact).toBeDefined();
    expect(ctrl.enableSwapMainContactMode).toBeDefined();
    expect(ctrl.swapMainContact).toBeDefined();
    expect(ctrl.confirmedDisabledButtomPostalCode).toBeDefined();
  });

  it('addContactInputMethod_should_setUp_newContact_and_prepare_states_if_there_is_vacantPosition', () => {
    expect(ctrl.contact.third).toBeUndefined();
    ctrl.addContactInput();
    expect(ctrl.editMode.third).toBeTruthy();
    expect(ctrl.newContactMode.third).toBeTruthy();
    expect(ctrl.contact.third).toBeDefined();
    expect(ctrl.addContactMode[ctrl.type]).toBeFalsy();
  });

  it('enableEditModeMethod_should_build valueBackup_and_enable_editMode_of_a_position', () => {
    ctrl.enableEditMode(Mock.position);
    expect(ctrl.backupContact.main.observation).toBe("Whats");
    expect(ctrl.addContactMode[ctrl.type]).toBeFalsy();
    expect(ctrl.editMode.main).toBeTruthy();
  });

  it('restoreContactMethod_should_restore_originalData_and_disable_editMode_for_a_contactPosition', () => {
    ctrl.backupContact.main = "backupData";
    ctrl.restoreContact(Mock.position);
    expect(ctrl.contact.main).toBe("backupData");
    expect(ctrl.addContactMode[ctrl.type]).toBeTruthy();
    expect(ctrl.editMode.main).toBeFalsy();
  });

  it('updateContactMethod_should_make_pipelineOrderedCalls_after_promiseResolution', () => {
    ctrl.updateContact(Mock.updatedContactItem, "main", ctrl.type);
    Mock.scope.$digest();
    expect(Injections.ParticipantContactService.createContactDto).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.dinamicUpdateContact).toHaveBeenCalledTimes(1);
    expect(ctrl.editMode[Mock.position]).toBeFalsy();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.isLastContact).toHaveBeenCalledTimes(1);
    expect(ctrl.loadParticipantContact).toHaveBeenCalledTimes(1);
  });

  it('findAddressByCepMethod_should_fit_data_coming_from_postOfficeApi_into_model_injected_by_parameter', () => {
    spyOn(Injections.ParticipantContactService, "getAddressByCep").and.returnValue(Mock.deferred.promise);
    let addressContact = {value: {postalCode:"91787-140", city: undefined}};
    ctrl.findAddressByCep(addressContact);
    Mock.scope.$digest();
    expect(addressContact.value.city).toBe('Porto Alegre')
  });

  it('findAddressByCepMethod_with_invalidPostalCode_should_invoke_fail_message', () => {
    spyOn(Injections.ParticipantContactService, "getAddressByCep").and.returnValue(Mock.deferredPostaCodeFail.promise);
    let addressContact = {value: {postalCode:"88888-888"}}
    ctrl.findAddressByCep(addressContact);
    Mock.scope.$digest();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
  });

  it('createNewContactMethod_should_make_pipelineOrderedCalls_after_promiseResolution', () => {
    ctrl.createNewContact( Mock.updatedContactItem, Mock.position, Mock.type);
     Mock.scope.$digest();
    expect(Injections.ParticipantContactService.createContactDto).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.dinamicNewContactCreate).toHaveBeenCalledTimes(1);
    expect(ctrl.editMode[Mock.position]).toBeFalsy();
    expect(ctrl.newContactMode[Mock.position]).toBeFalsy();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.isLastContact).toHaveBeenCalledTimes(1);
    expect(ctrl.loadParticipantContact).toHaveBeenCalledTimes(1);
  });

  it('deleteNonMainContactMethod_should_make_pipelineOrderedCalls_after_promiseResolution', () => {
    ctrl.deleteNonMainContact(Mock.type, "second");
    Mock.scope.$digest();
    expect(Injections.ParticipantContactService.createPositionContactDto).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.showDeleteDialog).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.deleteNonMainContact).toHaveBeenCalledTimes(1);
    expect(ctrl.addContactMode[ctrl.type]).toBeTruthy();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
    expect(ctrl.loadParticipantContact).toHaveBeenCalledTimes(1);
  });

  it('enableSwapMainContactMode_should_enable_mainContactSwapMode', () => {
    expect(ctrl.swapMainContactMode[ctrl.type]).toBeUndefined();
    ctrl.enableSwapMainContactMode(ctrl.type);
    expect(ctrl.swapMainContactMode[ctrl.type]).toBeTruthy();
  });

  it('swapMainContactMethod_should_make_pipelineOrderedCalls_after_promiseResolution', () => {
    spyOn(Injections.ParticipantContactService, "swapMainContact").and.returnValue(Mock.deferred.promise);
    ctrl.swapMainContact(Mock.type, "second");
    Mock.scope.$digest();
    expect(ctrl.loadParticipantContact).toHaveBeenCalledTimes(1);
    expect(ctrl.swapMainContactMode[Mock.type]).toBeFalsy();
   expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
  });

  it('swapMainContactMethod_should_invoke_fail_message', () => {
    spyOn(Injections.ParticipantContactService, "swapMainContact").and.returnValue(Mock.deferredSwapFail.promise);
    ctrl.swapMainContact(Mock.type, "second");
    Mock.scope.$digest();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
  });

  it('confirmedDisabledButtomPostalCode_out_of_editMode_should_enable_buttonDisable', () => {
    expect(ctrl.editMode[Mock.position]).toBeUndefined();
    expect(ctrl.confirmedDisabledButtomPostalCode(Mock.position)).toBeTruthy();
  });

  it('confirmedDisabledButtomPostalCode_in_editMode_and_inputInvalid_should_enable_buttonDisable', () => {
   ctrl.editMode[Mock.position] = true;
    expect(ctrl.confirmedDisabledButtomPostalCode(Mock.position)).toBeTruthy();
  });

  it('confirmedDisabledButtomPostalCode_in_editMode_should_active_buttonPostaCode', () => {
    ctrl.editMode['second'] = true;
    expect(ctrl.confirmedDisabledButtomPostalCode('second')).toBeFalsy();
  });

  function mockInitialize($q, $rootScope) {
    Mock.contacts = Test.utils.data.participantContact;
    Mock.contact = {
      main: {
        value: {
          content: "51987456321"
        },
        observation: "Whats"
      },
      second: {
        value: {
          content: "5132649857"
        },
        observation: "Home"
      },
      third: undefined,
      fourth: "null",
      fifth: "null"
    };
    Mock.type = "phoneNumber";
    Mock.updatedContactItem = {
      "value": {
        "content": "51321654987"
      },
      "observation": "Work"
    };
    Mock.form = {
      address: {
        main: {
          postalCode: {
            $modelValue: undefined
          }
        },
        second: {
          postalCode: {
            $modelValue: true
          }
        }

      }
    };
    Mock.position = "main";
    Mock.loadParticipantContact = jasmine.createSpy();
    Mock.address = { data: { localidade: "Porto Alegre"}};
    Mock.addressInvalid = { data: { erro: true}};
    Mock.deferred = $q.defer();
    Mock.deferred.resolve(Mock.address);
    Mock.deferredPostaCodeFail = $q.defer();
    Mock.deferredPostaCodeFail.resolve(Mock.addressInvalid);
    Mock.deferredSwapFail = $q.defer();
    Mock.deferredSwapFail.reject();
    Mock.scope = $rootScope.$new();
  }
});

