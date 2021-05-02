describe('otusUserCommentAboutParticipantDialogCtrl Test', function () {

  let Mock = {};
  let Injections = [];
  let controller = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
    Mock.data = { cancel: function () { return }, comment: "", verify: true };
    angular.mock.inject(function ($injector, $controller, $rootScope, $q) {
      Injections.$element = Mock.element;
      Injections.data = Mock.data;
      Injections.UserCommentAboutParticipantService = $injector.get('otusjs.user.comment.business.UserCommentAboutParticipantService');

      mockInitialize($rootScope, $q);

      controller = $controller('otusUserCommentAboutParticipantDialogCtrl', Injections);
    });
  });

  it('controller existence check', function () {
    expect(controller).toBeDefined();
  });

  it('should verify properties definition', function () {
    expect(controller.cancelFillSelectedComment).toBeDefined();
    expect(controller.showStarSelectedUserCommentAboutParticipant).toBeDefined();
    expect(controller.saveUserCommentAboutParticipant).toBeDefined();
    expect(controller.iconStar).toBeDefined();
    expect(controller.colorStar).toBeDefined();
    expect(controller.getFormattedDate).toBeDefined();
  });

  describe('Methods Suite Test', function () {

    it('cancelSelectedCommentMethod should initialized the cancel selected comment', function () {
      controller.cancelFillSelectedComment();
      Mock.scope.$digest();
      expect(controller.comment).toEqual("")
      expect(controller.selectedComment).toBeNull();
    });

    it('showStarSelectedUserCommentAboutParticipantMethod should initialized the show starred selected', function () {
      spyOn(Injections.UserCommentAboutParticipantService, 'showStarSelectedUserCommentAboutParticipant').and.returnValue(Mock.deferredResolve.promise)
      spyOn(Injections.UserCommentAboutParticipantService, "showMsg").and.callThrough();

      controller.showStarSelectedUserCommentAboutParticipant(Mock.userCommentsAboutParticipant[0]);

      Mock.scope.$digest();

      expect(Injections.UserCommentAboutParticipantService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledWith(Mock.userCommentsAboutParticipant[0]._id, true);
      expect(Injections.UserCommentAboutParticipantService.showMsg).toHaveBeenCalledTimes(1);
    });

    it('saveUserCommentAboutParticipantMethod should initialized the save', function () {
      let userComment = {
        comment: Mock.userCommentsAboutParticipant[0].comment,
        recruitmentNumber: Mock.participant.recruitmentNumber
      }
      controller.comment = Mock.userCommentsAboutParticipant[0].comment;
      controller.selectedComment.recruitmentNumber = Mock.participant.recruitmentNumber;

      spyOn(Injections.UserCommentAboutParticipantService, 'saveUserCommentAboutParticipant').and.returnValue(Mock.deferredResolve.promise);
      spyOn(Injections.UserCommentAboutParticipantService, "showMsg").and.callThrough();

      controller.saveUserCommentAboutParticipant();

      Mock.scope.$digest();

      expect(Injections.UserCommentAboutParticipantService.saveUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.saveUserCommentAboutParticipant).toHaveBeenCalledWith(userComment);
      expect(Injections.UserCommentAboutParticipantService.showMsg).toHaveBeenCalledTimes(1);
    });

    it('saveUserCommentAboutParticipantMethod should initialized the save and updateUserComment', function () {
      controller.comment = Mock.userCommentsAboutParticipant[0].comment;
      controller.selectedComment = Mock.userCommentsAboutParticipant[0];
      controller.selectedComment.recruitmentNumber = Mock.participant.recruitmentNumber;
      controller.selectedComment.comment = Mock.userCommentsAboutParticipant[1].comment;

      spyOn(Injections.UserCommentAboutParticipantService, 'updateUserCommentAboutParticipant').and.returnValue(Promise.resolve());

      controller.saveUserCommentAboutParticipant();

      expect(Injections.UserCommentAboutParticipantService.updateUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.updateUserCommentAboutParticipant).toHaveBeenCalledWith(Mock.userCommentsAboutParticipant[0]);
    });

    it('iconStarMethod should initialized the controller variable for color', function () {
      expect(controller.iconStar(Mock.userCommentsAboutParticipant[2].starred)).toEqual(Mock.icon);
    });

    it('colorStarMethod should initialized the controller variable for color', function () {
      expect(controller.colorStar(Mock.userCommentsAboutParticipant[2].starred)).toEqual(Mock.color);
    });

    it('getFormattedDateMethod should initialized the.userCommentsAboutParticipantformate ISO', function () {
      spyOn(Injections.UserCommentAboutParticipantService, 'getFormattedDate').and.returnValue(Promise.resolve());

      controller.getFormattedDate(Mock.userCommentsAboutParticipant[0].creationDate);
      expect(Injections.UserCommentAboutParticipantService.getFormattedDate).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.getFormattedDate).toHaveBeenCalledWith(Mock.userCommentsAboutParticipant[0].creationDate);
    });
  });

  function mockInitialize($rootScope, $q) {
    Mock.element = angular.element('<div></div>');
    Mock.scope = $rootScope.$new();
    Mock.deferred = $q.defer();
    Mock.deferredResolve = $q.defer();
    Mock.icon = 'star_rate';
    Mock.color = { color: 'rgb(253, 204, 13)' };
    Mock.showMoreIcon = { icon: 'visibility', tooltip: 'Ocultar Detalhes' };
    Mock.showMoreIcon2 = { icon: 'visibility_off', tooltip: 'Mostrar Detalhes' };
    Mock.participant = { recruitmentNumber: '02' };
    Mock.starred = false;
    Mock.userCommentsAboutParticipant = Test.utils.data.userCommentsAboutParticipant;
    Mock.deferredResolve.resolve();
    Mock.deferred.resolve(Mock.userCommentsAboutParticipant);
  }

});
