describe('ParticipantUpdateContactComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller) => {
      Injections.ParticipantContactService = $injector.get('otusjs.participantManager.contact.ParticipantContactService');
      Injections.ParticipantMessagesService = $injector.get('otusjs.participant.business.ParticipantMessagesService');
      ctrl = $controller('participantUpdateContactCtrl', Injections);
      ctrl.$onInit();
      mockInitialize();
      ctrl.contact = Mock.contact;
      ctrl.type = Mock.type;
      ctrl.loadParticipantContact = Mock.loadParticipantContact;
      spyOn(Injections.ParticipantContactService,"createContactDto").and.callThrough();
      spyOn(Injections.ParticipantContactService,"dinamicUpdateContact").and.callThrough();
      spyOn(Injections.ParticipantMessagesService, "showToast").and.callThrough();
      spyOn(Injections.ParticipantContactService, "isLastContact").and.callThrough();
      //spyOn(Injections.ParticipantActivityService,"saveActivities").and.callThrough();
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
    expect(ctrl.confirmedDisabled).toBeDefined();
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
    ctrl.enableEditMode('main');
    expect(ctrl.backupContact.main.observation).toBe("Whats");
    expect(ctrl.addContactMode[ctrl.type]).toBeFalsy();
    expect(ctrl.editMode.main).toBeTruthy();
  });

  it('restoreContactMethod_should_restore_originalData_and_disable_editMode_for_a_contactPosition', () => {
    ctrl.backupContact.main = "backupData";
    ctrl.restoreContact('main');
    expect(ctrl.contact.main).toBe("backupData");
    expect(ctrl.addContactMode[ctrl.type]).toBeTruthy();
    expect(ctrl.editMode.main).toBeFalsy();
  });

  it('updateContactMethod_should_make_pipelineOrderedCalls_after_promiseResolution', () => {
    ctrl.updateContact(Mock.updatedContactItem, "main", ctrl.type);
    expect(Injections.ParticipantContactService.createContactDto).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.dinamicUpdateContact).toHaveBeenCalledTimes(1);
    expect(ctrl.editMode['main']).toBeFalsy();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.isLastContact).toHaveBeenCalledTimes(1);
    expect(ctrl.loadParticipantContact).toHaveBeenCalledTimes(1);
  });


  // it('should ', () => {
  //   //expect(ctrl).toBe('')
  // });
  //
  //
  // it('should ', () => {
  //   //expect(ctrl).toBe('')
  // });
  //
  // it('should ', () => {
  //   //expect(ctrl).toBe('')
  // });
  //
  // it('should ', () => {
  //   //expect(ctrl).toBe('')
  // });


  function mockInitialize() {
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
    }

    Mock.loadParticipantContact = jasmine.createSpy();


  }




});

