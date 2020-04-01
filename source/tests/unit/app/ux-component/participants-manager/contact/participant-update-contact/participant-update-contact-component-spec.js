describe('ParticipantUpdateContactComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller) => {
      ctrl = $controller('participantUpdateContactCtrl', Injections);
      ctrl.$onInit();
      mockInitialize();
      ctrl.contact = Mock.contact;
      ctrl.type = Mock.type;
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


  // it('should ', () => {
  //   //expect(ctrl).toBe('')
  // });
  //
  // it('should ', () => {
  //   //expect(ctrl).toBe('')
  // });
  //
  //
  // it('should ', () => {
  //   //expect(ctrl).toBe('')
  // });
  //
  //
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
          content: "51998578574"
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
  }




});

