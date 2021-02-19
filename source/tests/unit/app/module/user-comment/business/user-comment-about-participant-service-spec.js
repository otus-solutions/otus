describe('UserCommentAboutParticipantService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.UserCommentAboutParticipantRepositoryService = $injector.get('otusjs.user.comment.repository.UserCommentAboutParticipantRepositoryService');
      Injections.UserCommentAboutParticipantValues = $injector.get('otusjs.user.comment.business.UserCommentAboutParticipantValues');

      service = $injector.get('otusjs.user.comment.business.UserCommentAboutParticipantService', Injections);

      mockInitialize();

    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.showMsg).toBeDefined();
    expect(service.getNoteAboutParticipant).toBeDefined();
    expect(service.updateUserCommentAboutParticipant).toBeDefined();
    expect(service.deleteSelectedComment).toBeDefined();
    expect(service.showStarSelectedUserCommentAboutParticipant).toBeDefined();
    expect(service.saveUserCommentAboutParticipant).toBeDefined();
    expect(service.getFormattedDate).toBeDefined();
  });

  it('updateUserCommentAboutParticipantMethod should evoke the service repositoryService', function () {
    spyOn(Injections.UserCommentAboutParticipantRepositoryService, "updateUserCommentAboutParticipant").and.callThrough();

    service.updateUserCommentAboutParticipant(Mock.items[1]);

    expect(Injections.UserCommentAboutParticipantRepositoryService.updateUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
  });

  it('deleteSelectedCommentMethod should evoke the service repositoryService', function () {
    spyOn(Injections.UserCommentAboutParticipantRepositoryService, "deleteSelectedComment").and.callThrough();

    service.deleteSelectedComment(Mock.items[0]._id);

    expect(Injections.UserCommentAboutParticipantRepositoryService.deleteSelectedComment).toHaveBeenCalledTimes(1);
    expect(Injections.UserCommentAboutParticipantRepositoryService.deleteSelectedComment).toHaveBeenCalledWith(Mock.items[0]._id);
  });

  it('showStarSelectedUserCommentAboutParticipantMethod should evoke the service repositoryService', function () {
    spyOn(Injections.UserCommentAboutParticipantRepositoryService, 'showStarSelectedUserCommentAboutParticipant').and.callThrough();

    service.showStarSelectedUserCommentAboutParticipant(Mock.items[0]._id, Mock.starred);

    expect(Injections.UserCommentAboutParticipantRepositoryService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.UserCommentAboutParticipantRepositoryService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledWith(Mock.items[0]._id, Mock.starred);
  });


  it('getNoteAboutParticipantMethod should evoke the service repositoryService', function () {
    spyOn(Injections.UserCommentAboutParticipantRepositoryService, 'getNoteAboutParticipant');

    service.getNoteAboutParticipant({});

    expect(Injections.UserCommentAboutParticipantRepositoryService.getNoteAboutParticipant).toHaveBeenCalledTimes(1);
  });

  it('saveUserCommentAboutParticipantMethod should evoke the service repositoryService', function () {
    let userComment = {
      comment: Mock.items[0].comment,
      recruitmentNumber: Mock.participant.recruitmentNumber
    }

    spyOn(Injections.UserCommentAboutParticipantRepositoryService, 'saveUserCommentAboutParticipant').and.callThrough();

    service.saveUserCommentAboutParticipant(userComment);

    expect(Injections.UserCommentAboutParticipantRepositoryService.saveUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.UserCommentAboutParticipantRepositoryService.saveUserCommentAboutParticipant).toHaveBeenCalledWith(userComment);
  });

  it('getFormattedDateMethod should evoke the service repositoryService', function () {
    expect(service.getFormattedDate(Mock.items[0].creationDate)).toEqual('18/12/2020');
  });

  it('showMsgMethod should evoke the service', function () {
    spyOn(Injections.$mdToast, 'show').and.callThrough();

    service.showMsg(Injections.UserCommentAboutParticipantValues.toast[0]);
    expect(Injections.$mdToast.show).toHaveBeenCalledTimes(1);
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
