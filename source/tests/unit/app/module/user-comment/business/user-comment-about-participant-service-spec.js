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
    expect(service.colorStar).toBeDefined();
    expect(service.iconStar).toBeDefined();
    expect(service.getFormattedDate).toBeDefined();
  });

  it('updateUserCommentAboutParticipantMethod should evoke the service repositoryService', function () {
    spyOn(Injections.UserCommentAboutParticipantRepositoryService, "updateUserCommentAboutParticipant").and.callThrough();

    service.updateUserCommentAboutParticipant(Mock.userCommentsAboutParticipant[1]);

    expect(Injections.UserCommentAboutParticipantRepositoryService.updateUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
  });

  it('deleteSelectedCommentMethod should evoke the service repositoryService', function () {
    spyOn(Injections.UserCommentAboutParticipantRepositoryService, "deleteSelectedComment").and.callThrough();

    service.deleteSelectedComment(Mock.userCommentsAboutParticipant[0]._id);

    expect(Injections.UserCommentAboutParticipantRepositoryService.deleteSelectedComment).toHaveBeenCalledTimes(1);
    expect(Injections.UserCommentAboutParticipantRepositoryService.deleteSelectedComment).toHaveBeenCalledWith(Mock.userCommentsAboutParticipant[0]._id);
  });

  it('showStarSelectedUserCommentAboutParticipantMethod should evoke the service repositoryService', function () {
    spyOn(Injections.UserCommentAboutParticipantRepositoryService, 'showStarSelectedUserCommentAboutParticipant').and.callThrough();

    service.showStarSelectedUserCommentAboutParticipant(Mock.userCommentsAboutParticipant[0]._id, Mock.starred);

    expect(Injections.UserCommentAboutParticipantRepositoryService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.UserCommentAboutParticipantRepositoryService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledWith(Mock.userCommentsAboutParticipant[0]._id, Mock.starred);
  });


  it('getNoteAboutParticipantMethod should evoke the service repositoryService', function () {
    spyOn(Injections.UserCommentAboutParticipantRepositoryService, 'getNoteAboutParticipant');

    service.getNoteAboutParticipant({});

    expect(Injections.UserCommentAboutParticipantRepositoryService.getNoteAboutParticipant).toHaveBeenCalledTimes(1);
  });

  it('saveUserCommentAboutParticipantMethod should evoke the service repositoryService', function () {
    let userComment = {
      comment: Mock.userCommentsAboutParticipant[0].comment,
      recruitmentNumber: Mock.participant.recruitmentNumber
    }

    spyOn(Injections.UserCommentAboutParticipantRepositoryService, 'saveUserCommentAboutParticipant').and.callThrough();

    service.saveUserCommentAboutParticipant(userComment);

    expect(Injections.UserCommentAboutParticipantRepositoryService.saveUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.UserCommentAboutParticipantRepositoryService.saveUserCommentAboutParticipant).toHaveBeenCalledWith(userComment);
  });

  it('iconStarMethod should initialized the service variable for color', function () {
    expect(service.iconStar(Mock.userCommentsAboutParticipant[2].starred)).toEqual(Mock.icon);
  });

  it('colorStarMethod should initialized the service variable for color', function () {
    expect(service.colorStar(Mock.userCommentsAboutParticipant[2].starred)).toEqual(Mock.color);
  });

  it('getFormattedDateMethod should evoke the service repositoryService', function () {
    expect(service.getFormattedDate(Mock.userCommentsAboutParticipant[0].creationDate)).toEqual('18/12/2020');
  });

  it('showMsgMethod should evoke the service', function () {
    spyOn(Injections.$mdToast, 'show').and.callThrough();

    service.showMsg(Injections.UserCommentAboutParticipantValues.toast[0]);
    expect(Injections.$mdToast.show).toHaveBeenCalledTimes(1);
  });

  function mockInitialize() {
    Mock.participant = { recruitmentNumber: '02' };
    Mock.starred = false;
    Mock.icon = 'star_rate';
    Mock.color = { color: 'rgb(253, 204, 13)' };
    Mock.userCommentsAboutParticipant = Test.utils.data.userCommentsAboutParticipant;
  }

});
