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

      //spyOn(Injections.ModuleService, "getParticipantContactRemoteStorage").and.callThrough();
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
      initialize: jasmine.anything(),
      listIdexers: jasmine.anything(),
      create: jasmine.anything(),
      update: jasmine.anything(),
      getAllowNewParticipants: jasmine.anything(),
      getFollowUps: jasmine.anything(),
      activateFollowUpEvent: jasmine.anything(),
      deactivateFollowUpEvent: jasmine.anything(),
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

    Mock.participantContact = Test.utils.data.participantContact;
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


  xit('createParticipantContact_method_should_positiveAnswer_on_successfulPersistence', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredCreate = Injections.$q.defer();
    Mock.deferredCreate.resolve(response);
    spyOn(Mock.remoteStorage, "createParticipantContact").and.returnValue(Mock.deferredCreate.promise);

    console.log(service.createParticipantContact(Mock.participantContact));
    service.createParticipantContact(Mock.participantContact).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  xit('createParticipantContact_method_should_handle_error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "createParticipantContact").and.returnValue(Mock.deferredInternal.promise);

    service.createParticipantContact(Mock.participantContact).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

});
