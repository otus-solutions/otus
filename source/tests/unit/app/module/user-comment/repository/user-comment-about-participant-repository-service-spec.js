describe('UserCommentAboutParticipantRepositoryService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.UserCommentAboutParticipantCollectionService = $injector.get('otusjs.user.comment.repository.UserCommentAboutParticipantCollectionService');

      service = $injector.get('otusjs.user.comment.repository.UserCommentAboutParticipantRepositoryService', Injections);

      mockInitialize();

    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.getNoteAboutParticipant).toBeDefined();
    expect(service.updateUserCommentAboutParticipant).toBeDefined();
    expect(service.deleteSelectedComment).toBeDefined();
    expect(service.showStarSelectedUserCommentAboutParticipant).toBeDefined();
    expect(service.saveUserCommentAboutParticipant).toBeDefined();
  });

  it('updateUserCommentAboutParticipantMethod should evoke the service collectionService', function () {
    spyOn(Injections.UserCommentAboutParticipantCollectionService, "updateUserCommentAboutParticipant").and.callThrough();

    service.updateUserCommentAboutParticipant(Mock.items[1]);

    expect(Injections.UserCommentAboutParticipantCollectionService.updateUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
  });

  it('deleteSelectedCommentMethod should evoke the service collectionService', function () {
    spyOn(Injections.UserCommentAboutParticipantCollectionService, "deleteSelectedComment").and.callThrough();

    service.deleteSelectedComment(Mock.items[0]._id);

    expect(Injections.UserCommentAboutParticipantCollectionService.deleteSelectedComment).toHaveBeenCalledTimes(1);
    expect(Injections.UserCommentAboutParticipantCollectionService.deleteSelectedComment).toHaveBeenCalledWith(Mock.items[0]._id);
  });

  it('showStarSelectedUserCommentAboutParticipantMethod should evoke the service collectionService', function () {
    spyOn(Injections.UserCommentAboutParticipantCollectionService, 'showStarSelectedUserCommentAboutParticipant').and.callThrough();

    service.showStarSelectedUserCommentAboutParticipant(Mock.items[0]._id, Mock.starred);

    expect(Injections.UserCommentAboutParticipantCollectionService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.UserCommentAboutParticipantCollectionService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledWith(Mock.items[0]._id, Mock.starred);
  });


  it('getNoteAboutParticipantMethod should evoke the service collectionService', function () {
    spyOn(Injections.UserCommentAboutParticipantCollectionService, 'getAllUsersComments').and.callThrough();

    service.getNoteAboutParticipant({});

    expect(Injections.UserCommentAboutParticipantCollectionService.getAllUsersComments).toHaveBeenCalledTimes(1);
  });

  it('saveUserCommentAboutParticipantMethod should evoke the service collectionService', function () {
    let userComment = {
      comment: Mock.items[0].comment,
      recruitmentNumber: Mock.participant.recruitmentNumber
    }

    spyOn(Injections.UserCommentAboutParticipantCollectionService, 'saveUserCommentAboutParticipant').and.callThrough();

    service.saveUserCommentAboutParticipant(userComment);

    expect(Injections.UserCommentAboutParticipantCollectionService.saveUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.UserCommentAboutParticipantCollectionService.saveUserCommentAboutParticipant).toHaveBeenCalledWith(userComment);
  });


  function mockInitialize() {
    Mock.participant = { recruitmentNumber: '02' };
    Mock.starred = false;
    Mock.items = [
      {
        _id: '113234',
        recruitmentNumber: '132324',
        userName: 'Fulano',
        creationDate: '2020-12-18T16:59:41.188',
        edited: true,
        comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
        isCreate: true,
        starred: true
      },
      {
        _id: '113235',
        recruitmentNumber: '132324',
        userName: 'Fulano',
        creationDate: '2020-12-18T16:59:41.188',
        edited: true,
        comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd'
      },
      {
        _id: '113236',
        recruitmentNumber: '132324',
        userName: 'Fulano',
        creationDate: '2020-12-18T16:59:41.188',
        edited: true,
        comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd'
      },
      {
        _id: '113237',
        recruitmentNumber: '132324',
        userName: 'Fulano',
        creationDate: '2020-12-18T16:59:41.188',
        edited: true,
        comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdf',
        isCreate: true
      },
      {
        _id: '113238',
        recruitmentNumber: '132324',
        userName: 'Fulano',
        creationDate: '2020-12-18T16:59:41.188',
        edited: true,
        comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd'
      }
    ];

  }

});
