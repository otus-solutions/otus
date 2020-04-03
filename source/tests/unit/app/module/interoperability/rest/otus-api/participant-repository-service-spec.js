describe('ParticipantRepositoryService_UnitTest_Suite', function() {
  let Mock = {};
  let Injections = [];
  let service = {};

  beforeEach(function(){
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q, $rootScope) => {
      Injections.$q = $injector.get('$q');
      Injections.ModuleService = $injector.get('otusjs.participant.core.ModuleService');
      _mockInitialize($injector, $q, $rootScope);
      service = $injector.get('otusjs.participant.repository.ParticipantRepositoryService', Injections);
    });
  });

  function _mockInitialize($injector, $q, $rootScope) {
    /* preparation for rotating the angular cycle (promise resolution with $ digest) */
    Mock.scope = $rootScope.$new();

    /*memory position association (pointer) for Spy*/
    Mock._remoteStorage = Injections.ModuleService.getParticipantContactRemoteStorage();

    /*representation of the ParticipantRepositoryService prepared by the bootstrap
    that accesses the client (ParticipantRepositoryServiceFactory)
    result by resolvedPromise in _remoteStorage.whenReady */
    Mock.remoteStorage = {
      createParticipantContact: jasmine.anything(),
      getParticipantContact: jasmine.anything(),
      getParticipantContactByRecruitmentNumber: jasmine.anything(),
      addNonMainEmail: jasmine.anything(),
      addNonMainAddress: jasmine.anything(),
      addNonMainPhoneNumber: jasmine.anything(),
      updateEmail: jasmine.anything(),
      updateAddress: jasmine.anything(),
      updatePhoneNumber: jasmine.anything(),
      swapMainContact: jasmine.anything(),
      deleteParticipantContact: jasmine.anything(),
      deleteNonMainContact: jasmine.anything(),
    };

    /*Injection of a restServiceMock in context(boostrap action simulation)*/
    Injections.ModuleService.configureRemoteStorage(Mock.remoteStorage);

    /*treatment to simulate the resolution of the promise(external) of _remoteStorage.whenReady*/
    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.participantContactFactory = $injector.get('otusjs.model.participantContact.ParticipantContactFactory');
    Mock.participantContactDocument = JSON.stringify(Test.utils.data.participantContact);
    Mock.participantContact = Mock.participantContactFactory.fromJson(Mock.participantContactDocument);
  }

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.listIdexers).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.getAllowNewParticipants).toBeDefined();
    expect(service.getFollowUps).toBeDefined();
    expect(service.activateFollowUpEvent).toBeDefined();
    expect(service.deactivateFollowUpEvent).toBeDefined();
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

  it('createParticipantContact_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("createParticipantContact", service.createParticipantContact(Mock.participantContact));
  });

  it('createParticipantContact_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("createParticipantContact", service.createParticipantContact(Mock.participantContact));
  });

  it('getParticipantContact_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("getParticipantContact", service.getParticipantContact(Mock.participantContact));
  });

  it('getParticipantContact_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("getParticipantContact", service.getParticipantContact(Mock.participantContact));
  });

  it('getParticipantContactByRecruitmentNumber_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("getParticipantContactByRecruitmentNumber", service.getParticipantContactByRecruitmentNumber(Mock.participantContact));
  });

  it('getParticipantContactByRecruitmentNumber_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("getParticipantContactByRecruitmentNumber", service.getParticipantContactByRecruitmentNumber(Mock.participantContact));
  });

  it('addNonMainEmail_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("addNonMainEmail", service.addNonMainEmail(Mock.participantContact));
  });

  it('addNonMainEmail_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("addNonMainEmail", service.addNonMainEmail(Mock.participantContact));
  });

  it('addNonMainAddress_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("addNonMainAddress", service.addNonMainAddress(Mock.participantContact));
  });

  it('addNonMainAddress_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("addNonMainAddress", service.addNonMainAddress(Mock.participantContact));
  });

  it('addNonMainPhoneNumber_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("addNonMainPhoneNumber", service.addNonMainPhoneNumber(Mock.participantContact));
  });

  it('addNonMainPhoneNumber_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("addNonMainPhoneNumber", service.addNonMainPhoneNumber(Mock.participantContact));
  });

  it('updateEmail_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("updateEmail", service.updateEmail(Mock.participantContact));
  });

  it('updateEmail_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("updateEmail", service.updateEmail(Mock.participantContact));
  });

  it('updateAddress_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("updateAddress", service.updateAddress(Mock.participantContact));
  });

  it('updateAddress_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("updateAddress", service.updateAddress(Mock.participantContact));
  });

  it('updatePhoneNumber_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("updatePhoneNumber", service.updatePhoneNumber(Mock.participantContact));
  });

  it('updatePhoneNumber_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("updatePhoneNumber", service.updatePhoneNumber(Mock.participantContact));
  });

  it('swapMainContact_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("swapMainContact", service.swapMainContact(Mock.participantContact));
  });

  it('swapMainContact_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("swapMainContact", service.swapMainContact(Mock.participantContact));
  });

  it('deleteParticipantContact_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("deleteParticipantContact", service.deleteParticipantContact(Mock.participantContact));
  });

  it('deleteParticipantContact_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("deleteParticipantContact", service.deleteParticipantContact(Mock.participantContact));
  });

  it('deleteNonMainContact_method_should_positiveAnswer_on_successfulPersistence', () => {
    _checkSuccess("deleteNonMainContact", service.deleteNonMainContact(Mock.participantContact));
  });

  it('deleteNonMainContact_method_should_handle_error_coming_by_exception', () => {
    _checkHandleError("deleteNonMainContact", service.deleteNonMainContact(Mock.participantContact));
  });

  function _checkSuccess(methodName, methodPromise){
    const response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, methodName).and.returnValue(Mock.deferredInternal.promise);

    methodPromise.then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  }

  function _checkHandleError(methodName, methodPromise){
    const response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, methodName).and.returnValue(Mock.deferredInternal.promise);

    methodPromise.catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  }
});
