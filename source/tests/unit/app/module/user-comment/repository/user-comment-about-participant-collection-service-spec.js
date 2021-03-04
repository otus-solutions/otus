describe('UserCommentAboutParticipantCollectionService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $rootScope) => {
      Injections.$q = $injector.get('$q');
      Injections.ModuleService = $injector.get('otusjs.user.comment.core.ModuleService');

      service = $injector.get('otusjs.user.comment.repository.UserCommentAboutParticipantCollectionService', Injections);

      _mockInitialize($rootScope);

    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.getAllUsersComments).toBeDefined();
    expect(service.updateUserCommentAboutParticipant).toBeDefined();
    expect(service.deleteSelectedComment).toBeDefined();
    expect(service.showStarSelectedUserCommentAboutParticipant).toBeDefined();
    expect(service.saveUserCommentAboutParticipant).toBeDefined();
  });

  it('updateUserCommentAboutParticipantMethod should evoke the service ModuleService for successful', function () {
    _prepareRemoteStorageSuccess("updateUserCommentAboutParticipant");
    service.updateUserCommentAboutParticipant(Mock.userCommentsAboutParticipant[1]).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('updateUserCommentAboutParticipantMethod should handle error coming by exception', () => {
    _prepareRemoteStorageError("updateUserCommentAboutParticipant");
    service.updateUserCommentAboutParticipant(Mock.userCommentsAboutParticipant[1]).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('deleteSelectedCommentMethod should evoke the service ModuleService for successful', function () {
    _prepareRemoteStorageSuccess("deleteSelectedComment");
    service.deleteSelectedComment(Mock.userCommentsAboutParticipant[0]._id).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('deleteSelectedCommentMethod should handle error coming by exception', () => {
    _prepareRemoteStorageError("deleteSelectedComment");
    service.deleteSelectedComment(Mock.userCommentsAboutParticipant[1]).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('showStarSelectedUserCommentAboutParticipantMethod should evoke the service ModuleService', function () {
    _prepareRemoteStorageSuccess("showStarSelectedUserCommentAboutParticipant");
    service.showStarSelectedUserCommentAboutParticipant(Mock.userCommentsAboutParticipant[0]._id, Mock.starred).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('showStarSelectedUserCommentAboutParticipantMethod should handle error coming by exception', () => {
    _prepareRemoteStorageError("showStarSelectedUserCommentAboutParticipant");
    service.showStarSelectedUserCommentAboutParticipant(Mock.userCommentsAboutParticipant[1]).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('getAllUsersCommentsMethod should evoke the service ModuleService', function () {
    _prepareRemoteStorageSuccess("getAllUsersComments");
    service.getAllUsersComments({}).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('getAllUsersCommentsMethod should handle error coming by exception', () => {
    _prepareRemoteStorageError("getAllUsersComments");
    service.getAllUsersComments({}).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  it('saveUserCommentAboutParticipantMethod should evoke the service ModuleService', function () {
    let userComment = {
      comment: Mock.userCommentsAboutParticipant[0].comment,
      recruitmentNumber: Mock.participant.recruitmentNumber
    }
    _prepareRemoteStorageSuccess("saveUserCommentAboutParticipant");
    service.saveUserCommentAboutParticipant(userComment).then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });

  it('saveUserCommentAboutParticipantMethod should handle error coming by exception', () => {
    _prepareRemoteStorageError("saveUserCommentAboutParticipant");
    service.saveUserCommentAboutParticipant({}).catch(e => expect(e.error).toBeFalsy());
    Mock.scope.$digest();
  });

  function _mockInitialize($rootScope) {
    /* preparation for rotating the angular cycle (promise resolution with $ digest) */
    Mock.scope = $rootScope.$new();

    /*memory position association (pointer) for Spy*/
    Mock._remoteStorage = Injections.ModuleService.getUserCommentAboutParticipantRemoteStorage();

    /*representation of the ProjectCommunicationRestService prepared by the bootstrap
    that accesses the client (ProjectCommunicationResourceFactory)
    result by resolvedPromise in _remoteStorage.whenReady */
    Mock.remoteStorage = {
      initialize: jasmine.anything(),
      getAllUsersComments: jasmine.anything(),
      showStarSelectedUserCommentAboutParticipant: jasmine.anything(),
      deleteSelectedComment: jasmine.anything(),
      saveUserCommentAboutParticipant: jasmine.anything(),
      updateUserCommentAboutParticipant: jasmine.anything()
    };

    Mock.participant = { recruitmentNumber: '02' };
    Mock.starred = false;
    Mock.userCommentsAboutParticipant = Test.utils.data.userCommentsAboutParticipant;

    /*Injection of a restServiceMock in context(boostrap action simulation)*/
    Injections.ModuleService.configureRemoteStorage(Mock.remoteStorage);

    /*treatment to simulate the resolution of the promise(external) of _remoteStorage.whenReady*/
    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);
  }

  function _prepareRemoteStorageSuccess(methodName) {
    let response = { data: true };
    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(response);
    spyOn(Mock.remoteStorage, methodName).and.returnValue(Mock.deferredInternal.promise);
  }

  function _prepareRemoteStorageError(methodName) {
    let response = { error: false };
    //treatment to simulate the resolution of the promise(internal) of remoteStorage
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject(response);
    spyOn(Mock.remoteStorage, methodName).and.returnValue(Mock.deferredInternal.promise);
  }

});
