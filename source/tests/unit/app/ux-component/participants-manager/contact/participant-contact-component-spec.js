describe('ParticipantComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller, $q, $rootScope) => {
      mockInitialize($q, $rootScope);
      Injections.$element = Mock.element;
      Injections.$scope = Mock.scope;
      Injections.ParticipantContactService = $injector.get('otusjs.participantManager.contact.ParticipantContactService');
      Injections.ParticipantMessagesService = $injector.get('otusjs.participant.business.ParticipantMessagesService');
      Injections.ParticipantContactValues = $injector.get('ParticipantContactValues');

      ctrl = $controller('participantContactCtrl', Injections);
      ctrl.participant = {recruitmentNumber: Mock.contacts.recruitmentNumber};

      spyOn(Injections.ParticipantContactService, "participantContactFactoryJson").and.callThrough();
      spyOn(Injections.ParticipantContactService, "participantContactFactoryCreate").and.callThrough();
      spyOn(Injections.ParticipantMessagesService, "showToast").and.callThrough();
      spyOn(Injections.ParticipantContactService, "showDeleteDialog").and.returnValue(Mock.deferred.promise);
    });
  });

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.saveParticipant).toBeDefined();
    expect(ctrl.dashboardParticipant).toBeDefined();
    expect(ctrl.onFilter).toBeDefined();
    expect(ctrl.loadParticipantContact).toBeDefined();
    expect(ctrl.createParticipantContact).toBeDefined();
    expect(ctrl.deleteParticipantContact).toBeDefined();
  });

  it('loadParticipantContactMethod_should_return_participantContactParsed_by_modelFactory', () => {
    spyOn(Injections.ParticipantContactService, "getParticipantContactByRecruitmentNumber").and.returnValue(Mock.deferred.promise);
    expect(ctrl.contact).toBeUndefined();
    ctrl.loadParticipantContact();
    Mock.scope.$digest();
    expect(Injections.ParticipantContactService.participantContactFactoryJson).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.getParticipantContactByRecruitmentNumber).toHaveBeenCalledTimes(1);
    expect(ctrl.contact.objectType).toBe("ParticipantContact");
  });

  it('loadParticipantContactMethod_should_handle_rejectionPromise', () => {
    spyOn(Injections.ParticipantContactService, "getParticipantContactByRecruitmentNumber").and.returnValue(Mock.deferredFail.promise);
    expect(ctrl.contact).toBeUndefined();
    ctrl.loadParticipantContact();
    Mock.scope.$digest();
    expect(ctrl.contact).toBe('');
  });


  it('createParticipantContactMethod_should_evoke_functions_in_pipeline', () => {
    spyOn(Injections.ParticipantContactService, "createParticipantContact").and.returnValue(Mock.deferred.promise);
    expect(ctrl.contact).toBeUndefined();
    ctrl.createParticipantContact();
    Mock.scope.$digest();
    expect(Injections.ParticipantContactService.participantContactFactoryCreate).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantContactService.createParticipantContact).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledWith(Injections.ParticipantContactValues.msg.contactFound);
  });

  it('createParticipantContactMethod_should_handle_rejectionPromise', () => {
    spyOn(Injections.ParticipantContactService, "createParticipantContact").and.returnValue(Mock.deferredFail.promise);
    ctrl.createParticipantContact();
    Mock.scope.$digest();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledWith(Injections.ParticipantContactValues.msg.contactFail);
  });

  it('deleteParticipantContactMethod_should_evoke_functions_in_pipeline', () => {
    ctrl.contact = Mock.contacts;
    spyOn(Injections.ParticipantContactService, "deleteParticipantContact").and.returnValue(Mock.deferred.promise);
    ctrl.deleteParticipantContact();
    Mock.scope.$digest();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledWith(Injections.ParticipantContactValues.msg.contactDelete);
  });

  it('deleteParticipantContactMethod_should_handle_rejectionPromise', () => {
    ctrl.contact = Mock.contacts;
    spyOn(Injections.ParticipantContactService, "deleteParticipantContact").and.returnValue(Mock.deferredFail.promise);
    ctrl.deleteParticipantContact();
    Mock.scope.$digest();
    expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledWith(Injections.ParticipantContactValues.msg.contactFail);
  });

  function mockInitialize($q, $rootScope) {
    Mock.contacts = Test.utils.data.participantContact;
    Mock.deferred = $q.defer();
    Mock.deferred.resolve(Mock.contacts);
    Mock.deferredFail = $q.defer();
    Mock.deferredFail.reject();
    Mock.scope = $rootScope.$new();
    Mock.element = angular.element('<div></div>');
  }
});

