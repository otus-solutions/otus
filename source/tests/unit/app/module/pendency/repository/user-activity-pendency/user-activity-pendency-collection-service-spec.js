describe('UserActivityPendencyCollectionService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q, $rootScope) => {
      Injections.$q = $injector.get('$q');
      Injections.ModuleService = $injector.get('otusjs.pendency.core.ModuleService');

      /*mandatory prep(bootstrap simulation)*/
      _mockInitialize($injector, $rootScope);

      service = $injector.get('otusjs.pendency.repository.UserActivityPendencyCollectionService', Injections);
    });
  });

  function _mockInitialize($injector, $rootScope) {
    /* preparation for rotating the angular cycle (promise resolution with $ digest) */
    Mock.scope = $rootScope.$new();

    /*memory position association (pointer) for Spy*/
    Mock._remoteStorage = Injections.ModuleService.getUserActivityPendencyRemoteStorage();

    /*representation of the UserActivityPendencyRestService prepared by the bootstrap
    that accesses the client (UserActivityPendencyResourceFactory)
    result by resolvedPromise in _remoteStorage.whenReady */
    Mock.remoteStorage = {
      initialize: jasmine.anything(),
      createUserActivityPendency: jasmine.anything(),
      getPendencyByActivityId: jasmine.anything(),
      updateUserActivityPendency: jasmine.anything(),
      deleteUserActivityPendency: jasmine.anything(),
      getAllUserActivityPendenciesToReceiver: jasmine.anything(),
      getOpenedUserActivityPendenciesToReceiver: jasmine.anything(),
      getDoneUserActivityPendenciesToReceiver: jasmine.anything(),
      getAllPendencies: jasmine.anything(),
    };

    /*Injection of a restServiceMock in context(boostrap action simulation)*/
    Injections.ModuleService.configureRemoteStorage(Mock.remoteStorage);

    /*treatment to simulate the resolution of the promise(external) of _remoteStorage.whenReady*/
    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    /*Build artifacts from MockDocument*/
    Mock.userActivityPendencyFactory = $injector.get('otusjs.model.pendency.UserActivityPendencyFactory');
    Mock.UserActivityPendencyDocument = JSON.stringify(Test.utils.data.userActivityPendency);
    Mock.userActivityPendency = Mock.userActivityPendencyFactory.fromJsonObject(Mock.UserActivityPendencyDocument);
    Mock._id = Mock.userActivityPendency.getID();

    mock();
  }

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.createUserActivityPendency).toBeDefined();
    expect(service.getPendencyByActivityId).toBeDefined();
    expect(service.updateUserActivityPendency).toBeDefined();
    expect(service.deleteUserActivityPendency).toBeDefined();
    expect(service.getAllUserActivityPendenciesToReceiver).toBeDefined();
    expect(service.getOpenedUserActivityPendenciesToReceiver).toBeDefined();
    expect(service.getDoneUserActivityPendenciesToReceiver).toBeDefined();
    expect(service.getAllPendencies).toBeDefined();
  });

  it('createUserActivityPendencyMethod_should_positiveAnswer_on_successfulPersistence', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "createUserActivityPendency").and.returnValue(Mock.deferredInternal.promise);

    service.createUserActivityPendency(Mock.userActivityPendency).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('createUserActivityPendencyMethod_should_handle_ error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "createUserActivityPendency").and.returnValue(Mock.deferredInternal.promise);

    service.createUserActivityPendency(Mock.userActivityPendency).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('getPendencyByActivityIdMethod_should_document_on_successfulFind', () => {
    let response = {data: Mock.UserActivityPendencyDocument};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "getPendencyByActivityId").and.returnValue(Mock.deferredInternal.promise);

    service.getPendencyByActivityId(Mock._id).then(data => expect(data).toBe(Mock.UserActivityPendencyDocument));
    Mock.scope.$digest();
  });


  it('getPendencyByActivityIdMethod_should_handle_ error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "getPendencyByActivityId").and.returnValue(Mock.deferredInternal.promise);

    service.getPendencyByActivityId(Mock._id).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('updateUserActivityPendencyMethod_should_positiveAnswer_on_successfulUpdate', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "updateUserActivityPendency").and.returnValue(Mock.deferredInternal.promise);

    service.updateUserActivityPendency(Mock._id, Mock.userActivityPendency).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('updateUserActivityPendencyMethod_should_handle_ error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "updateUserActivityPendency").and.returnValue(Mock.deferredInternal.promise);

    service.updateUserActivityPendency(Mock._id, Mock.userActivityPendency).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('deleteUserActivityPendencyMethod_should_positiveAnswer_on_successfulUpdate', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "deleteUserActivityPendency").and.returnValue(Mock.deferredInternal.promise);

    service.deleteUserActivityPendency(Mock._id).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('deleteUserActivityPendencyMethod_should_handle_ error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "deleteUserActivityPendency").and.returnValue(Mock.deferredInternal.promise);

    service.deleteUserActivityPendency(Mock._id).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

   it('getAllUserActivityPendenciesToReceiverMethod_should_document_on_successfulFind', () => {
    let response = {data: true};
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "getAllUserActivityPendenciesToReceiver").and.returnValue(Mock.deferredInternal.promise);

    service.getAllUserActivityPendenciesToReceiver().then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

   it('getAllUserActivityPendenciesToReceiverMethod_should_handle_ error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "getAllUserActivityPendenciesToReceiver").and.returnValue(Mock.deferredInternal.promise);

    service.getAllUserActivityPendenciesToReceiver().catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

    it('getOpenedUserActivityPendenciesToReceiverMethod_should_document_on_successfulFind', () => {
    let response = {data: true};
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "getOpenedUserActivityPendenciesToReceiver").and.returnValue(Mock.deferredInternal.promise);

    service.getOpenedUserActivityPendenciesToReceiver().then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

   it('getOpenedUserActivityPendenciesToReceiverMethod_should_handle_ error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "getOpenedUserActivityPendenciesToReceiver").and.returnValue(Mock.deferredInternal.promise);

    service.getOpenedUserActivityPendenciesToReceiver().catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('getDoneUserActivityPendenciesToReceiverMethod_should_document_on_successfulFind', () => {
    let response = {data: true};
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "getDoneUserActivityPendenciesToReceiver").and.returnValue(Mock.deferredInternal.promise);

    service.getDoneUserActivityPendenciesToReceiver().then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('getDoneUserActivityPendenciesToReceiverMethod_should_handle_ error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "getDoneUserActivityPendenciesToReceiver").and.returnValue(Mock.deferredInternal.promise);

    service.getDoneUserActivityPendenciesToReceiver().catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('getAllPendenciesMethod_should_document_on_successfullFind', () => {
    let response = {data: Mock.UserActivityPendencyDocument};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "getAllPendencies").and.returnValue(Mock.deferredInternal.promise);

    service.getAllPendencies(Mock.searchSettings).then(data => expect(data).toBe(Mock.UserActivityPendencyDocument));
    Mock.scope.$digest();
  });


  it('getAllPendenciesMethod_should_handle_ error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "getAllPendencies").and.returnValue(Mock.deferredInternal.promise);

    service.getAllPendencies(Mock.searchSettings).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  function mock() {
    Mock.searchSettings = {
      "currentQuantity": 0,
      "quantityToGet": 10,
      "order": {
        "fields": ["dueDate"],
        "mode": 1
      },
      "filter": {
        "status": "NOT_FINALIZED"
      }
    }
  }
});
