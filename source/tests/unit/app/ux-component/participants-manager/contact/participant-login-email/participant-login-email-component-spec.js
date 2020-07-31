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
      mockInitialize($rootScope, $q);

      ctrl = $controller('participantLoginEmailCtrl', Injections);
      ctrl.loginEmailForm = Mock.loginEmailForm;
      ctrl.participant = Mock.participant;
      ctrl.updatedLoginEmail = Mock.updatedLoginEmail;
      ctrl.$onInit();
      spyOn(Injections.ParticipantMessagesService, "showToast").and.callThrough();
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
    spyOn(Injections.ParticipantMessagesService, "showLoginEmailDialog").and.callFake(() => Mock.resolveDeferred.promise);
    ctrl.loginEmailForm.$invalid = true;
    ctrl.loginEmailConfirmation('update');
    expect(Injections.ParticipantMessagesService.showLoginEmailDialog).toHaveBeenCalledTimes(0);
  });

  it('loginEmailConfirmation_method_with_updateSchenarioAttribute_should_resolve_3_promises', () => {
    spyOn(Injections.ParticipantMessagesService, "showLoginEmailDialog").and.callFake(() => Mock.resolveDeferred.promise);
    spyOn(Injections.ParticipantManagerService, "updateLoginEmail").and.callFake(() => Mock.resolveDeferred.promise);
    spyOn(Injections.ParticipantManagerService, "updateEmailParticipantSessionStorage").and.callFake(() => Mock.resolveDeferred.promise);
    ctrl.loginEmailForm.$invalid = false;
    ctrl.loginEmailConfirmation('update');
    Mock.scope.$digest();
    expect(ctrl.editMode).toBeFalsy();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledWith('Login alterado com sucesso!');
  });


  it('loginEmailConfirmation_method_with_deleteSchenarioAttribute_should_resolve_3_promises', () => {
    spyOn(Injections.ParticipantMessagesService, "showLoginEmailDialog").and.callFake(() => Mock.resolveDeferred.promise);
    spyOn(Injections.ParticipantManagerService, "removeEmailByParticipantId").and.callFake(() => Mock.resolveDeferred.promise);
    spyOn(Injections.ParticipantManagerService, "updateEmailParticipantSessionStorage").and.callFake(() => Mock.resolveDeferred.promise);
    ctrl.loginEmailForm.$invalid = false;
    ctrl.loginEmailConfirmation('delete');
    Mock.scope.$digest();
    expect(ctrl.editMode).toBeFalsy();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledWith('Login removido com sucesso!');
  });

  it('loginEmailConfirmation_method_should_catch_promiseReject_by_loginEmailDialog(clearButton)', () => {
    spyOn(Injections.ParticipantMessagesService, "showLoginEmailDialog").and.callFake(() => Mock.rejectDeferred.promise);
    ctrl.loginEmailConfirmation('update');
    Mock.scope.$digest();
    expect(ctrl.editMode).toBeFalsy();
  });

  it('selectedItemChange_method_should_change_value_of_updatedLoginEmail', () => {
    expect(ctrl.updatedLoginEmail).toBe('emailmock@otus.com')
    ctrl.selectedItemChange(Mock.newLoginEmail);
    expect(ctrl.updatedLoginEmail).toBe('new@otus.com');
  });

  it('getEmailCandidates_should_return_emailList_throw_extractEmailValuesFromContacts_by_ParticipantManagerService', () => {
    expect(ctrl.getEmailCandidates(Test.utils.data.participantContact.email)[0]).toBe('otus@gmail.com')
    expect(ctrl.getEmailCandidates(Test.utils.data.participantContact.email)[1]).toBe('a@hotmal.com')
    expect(ctrl.getEmailCandidates(Test.utils.data.participantContact.email)[2]).toBe('jose.silva.albuquerque@bol.com.br')
  });

  function mockInitialize($rootScope, $q) {
    Mock.scope = $rootScope.$new();
    Mock.resolveDeferred = $q.defer();
    Mock.resolveDeferred.resolve();
    Mock.rejectDeferred = $q.defer();
    Mock.rejectDeferred.reject();
    Mock.loginEmailForm = {
      $error: {},
      input: {error: {}},
      $setDirty: () => {
      },
      $setPristine: () => {
      },
      $setUntouched: () => {
      },
    }
    Mock.participant = {
      _id: "123456abcdf",
      email: "emailmock@otus.com"
    }
    Mock.newLoginEmail = "new@otus.com"
  }
});
