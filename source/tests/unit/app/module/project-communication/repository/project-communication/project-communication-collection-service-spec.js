describe('ProjectCommunicationCollectionService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};
  let ID = "15646187487";
  let LIMIT = "12";

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q, $rootScope) => {
      Injections.$q = $injector.get('$q');
      Injections.ModuleService = $injector.get('otusjs.project.communication.core.ModuleService');

      /*mandatory prep(bootstrap simulation)*/
      _mockInitialize($injector, $rootScope);

      service = $injector.get('otusjs.project.communication.repository.ProjectCommunicationCollectionService', Injections);
    });
  });

  function _mockInitialize($injector, $rootScope) {
    /* preparation for rotating the angular cycle (promise resolution with $ digest) */
    Mock.scope = $rootScope.$new();

    /*memory position association (pointer) for Spy*/
    Mock._remoteStorage = Injections.ModuleService.getProjectCommunicationRemoteStorage();

    /*representation of the ProjectCommunicationRestService prepared by the bootstrap
    that accesses the client (ProjectCommunicationResourceFactory)
    result by resolvedPromise in _remoteStorage.whenReady */
    Mock.remoteStorage = {
      initialize: jasmine.anything(),
      createMessage: jasmine.anything(),
      createIssue: jasmine.anything(),
      getProjectCommunicationById: jasmine.anything(),
      getProjectCommunicationByIdLimit: jasmine.anything(),
      updateReopen: jasmine.anything(),
      updateClose: jasmine.anything(),
      listIssue: jasmine.anything()
    };

    /*Injection of a restServiceMock in context(boostrap action simulation)*/
    Injections.ModuleService.configureRemoteStorage(Mock.remoteStorage);

    /*treatment to simulate the resolution of the promise(external) of _remoteStorage.whenReady*/
    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

  }

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.createMessage).toBeDefined();
    expect(service.createIssue).toBeDefined();
    expect(service.getProjectCommunicationById).toBeDefined();
    expect(service.getProjectCommunicationByIdLimit).toBeDefined();
    expect(service.updateReopen).toBeDefined();
    expect(service.updateClose).toBeDefined();
    expect(service.listIssue).toBeDefined();
  });

  it('createMessageMethod_should_positiveAnswer_on_successfulPersistence', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "createMessage").and.returnValue(Mock.deferredInternal.promise);

    service.createMessage(ID, Mock).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('createMessageMethod_should_handle_error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "createMessage").and.returnValue(Mock.deferredInternal.promise);

    service.createMessage(ID, Mock).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('createIssueMethod_should_positiveAnswer_on_successfulPersistence', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "createIssue").and.returnValue(Mock.deferredInternal.promise);

    service.createIssue(Mock).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('createIssueMethod_should_handle_error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "createIssue").and.returnValue(Mock.deferredInternal.promise);

    service.createIssue(Mock).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('getProjectCommunicationByIdMethod_should_positiveAnswer_on_successfulPersistence', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "getProjectCommunicationById").and.returnValue(Mock.deferredInternal.promise);

    service.getProjectCommunicationById(ID).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('getProjectCommunicationByIdMethod_should_handle_error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "getProjectCommunicationById").and.returnValue(Mock.deferredInternal.promise);

    service.getProjectCommunicationById(ID).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('getProjectCommunicationByIdLimitMethod_should_positiveAnswer_on_successfulPersistence', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "getProjectCommunicationByIdLimit").and.returnValue(Mock.deferredInternal.promise);

    service.getProjectCommunicationByIdLimit(ID, LIMIT).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('getProjectCommunicationByIdLimitMethod_should_handle_error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "getProjectCommunicationByIdLimit").and.returnValue(Mock.deferredInternal.promise);

    service.getProjectCommunicationByIdLimit(ID, LIMIT).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('updateReopenMethod_should_positiveAnswer_on_successfulPersistence', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "updateReopen").and.returnValue(Mock.deferredInternal.promise);

    service.updateReopen(ID, LIMIT).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('updateReopenMethod_should_handle_error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "getProjectCommunicationByIdLimit").and.returnValue(Mock.deferredInternal.promise);

    service.getProjectCommunicationByIdLimit(ID, LIMIT).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('listIssueMethod_should_positiveAnswer_on_successfulPersistence', () => {
    let response = {data: true};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, "listIssue").and.returnValue(Mock.deferredInternal.promise);

    service.listIssue().then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('listIssueMethod_should_handle_error_coming_by_exception', () => {
    let response = {error: false};

    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, "listIssue").and.returnValue(Mock.deferredInternal.promise);

    service.listIssue(ID, LIMIT).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

});
