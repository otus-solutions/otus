describe('ParticipantLoginEmailComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller) => {
      Injections.ParticipantContactValues = $injector.get('ParticipantContactValues');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');
      Injections.ParticipantMessagesService = $injector.get('otusjs.participant.business.ParticipantMessagesService');
      ctrl = $controller('participantLoginEmailCtrl', Injections);
      mockInitialize();
    });
  });

  function mockInitialize() {
  }

  it('serviceExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(ctrl.enableEditMode).toBeDefined();
    expect(ctrl.loginEmailConfirmation).toBeDefined();
    expect(ctrl.resetLoginEmailForm).toBeDefined();
    expect(ctrl.selectedItemChange).toBeDefined();
    expect(ctrl.getEmailCandidates).toBeDefined();
  });

  it('enableEditMode_method_should_return_truthy', () => {
    ctrl.enableEditMode()
    expect(ctrl.editMode).toBeTruthy()
  });

  // it('loginEmailConfirmation_method_should_ ', () => {
  //   ctrl.loginEmailConfirmation('update');
  //
  // });


  xit('should ', () => {});
  xit('should ', () => {});
  xit('should ', () => {});
  xit('should ', () => {});


});
