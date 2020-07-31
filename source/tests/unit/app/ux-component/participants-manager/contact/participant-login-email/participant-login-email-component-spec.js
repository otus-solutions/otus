describe('ParticipantLoginEmailComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller, $rootScope, $q) => {
      Injections.ParticipantContactValues = $injector.get('ParticipantContactValues');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');
      Injections.ParticipantMessagesService = $injector.get('otusjs.participant.business.ParticipantMessagesService');
      Mock.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');

      mockInitialize($rootScope,$q);
      ctrl = $controller('participantLoginEmailCtrl', Injections);
      ctrl.loginEmailForm =  Mock.loginEmailForm;
      ctrl.participant = Mock.participant;
      ctrl.updatedLoginEmail = Mock.updatedLoginEmail;
      ctrl.$onInit();

      spyOn(Injections.ParticipantMessagesService,"showLoginEmailDialog").and.callFake(() => Mock.deferred.promise);
      spyOn(Injections.ParticipantMessagesService, "showToast").and.callThrough();
      // spyOn(Mock.DialogShowService, "showDialog");
    });
  });

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

  it('OnInit_method_should_prepare_initial_artefacts', () => {
    expect(ctrl.ParticipantContactValues).toBe(Injections.ParticipantContactValues);
    expect(ctrl.updatedLoginEmail).toBe(Mock.participant.email);
    expect(ctrl.editMode).toBeFalsy();
  });

  it('enableEditMode_method_should_return_truthy', () => {
    ctrl.enableEditMode()
    expect(ctrl.editMode).toBeTruthy()
  });

  it('loginEmailConfirmation_method_with_formInvalid_not_should_evoke_LoginEmailDialog', () => {
    ctrl.loginEmailForm.$invalid = true;
    ctrl.loginEmailConfirmation('update');
    expect(Injections.ParticipantMessagesService.showLoginEmailDialog).toHaveBeenCalledTimes(0);
  });

  it('loginEmailConfirmation_method_with_updateSchenarioAttribute_should_resolve_3_promises', () => {
    spyOn(Injections.ParticipantManagerService,"updateLoginEmail").and.callFake(() => Mock.deferred.promise);
    spyOn(Injections.ParticipantManagerService,"updateEmailParticipantSessionStorage").and.callFake(() => Mock.deferred.promise);
    ctrl.loginEmailForm.$invalid = false;
    ctrl.loginEmailConfirmation('update');
    Mock.scope.$digest();
    expect(ctrl.editMode).toBeFalsy();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledWith('Login alterado com sucesso!');
  });


  xit('should ', () => {});
  xit('should ', () => {});
  xit('should ', () => {});
  xit('should ', () => {});

  function mockInitialize( $rootScope, $q) {
    Mock.scope = $rootScope.$new();
    Mock.deferred = $q.defer();
    Mock.deferred.resolve();
    Mock.loginEmailForm =  {
      $setDirty:  () => {}
    }
    //Mock.updatedLoginEmail = "mockemail@otus.com";
    Mock.participant = {
      _id: "123456abcdf",
      email: "emailmock@otus.com"
    }
    // Mock.element = angular.element('<div></div>');
  }

});
