fdescribe('otusUserCommentAboutParticipantListCtrl Test', function () {

  let Mock = {};
  let Injections = [];
  let controller = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector, $controller, $rootScope, $q) {
      Injections.$element = Mock.element;
      Injections.EventService = $injector.get('otusjs.participant.core.EventService');
      Injections.UserCommentAboutParticipantService = $injector.get('otusjs.user.comment.business.UserCommentAboutParticipantService');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.USER_COMMENT_MANAGER_LABELS = $injector.get('USER_COMMENT_MANAGER_LABELS');
      Injections.GenericListViewerService = $injector.get('otusjs.genericListViewer.GenericListViewerService')

      mockInitialize($rootScope, $q);

      controller = $controller('otusUserCommentAboutParticipantListCtrl', Injections);
    });
  });

  it('controller existence check', function () {
    expect(controller).toBeDefined();
  });

  it('should verify properties definition', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.fillSelectedComment).toBeDefined();
    expect(controller.cancelFillSelectedComment).toBeDefined();
    expect(controller.deleteSelectedComment).toBeDefined();
    expect(controller.showStarSelectedUserCommentAboutParticipant).toBeDefined();
    expect(controller.saveUserCommentAboutParticipant).toBeDefined();
    expect(controller.colorStar).toBeDefined();
    expect(controller.getFormattedDate).toBeDefined();
    expect(controller.showMore).toBeDefined();
    expect(controller.showAttribute).toBeDefined();
    expect(controller.getAllItems).toBeDefined();
    expect(controller.callValidationItemsLimits).toBeDefined();
  });

  describe('Methods Suite Test', function () {

    beforeEach(function () {
      spyOn(Injections.EventService, "onParticipantSelected");
      spyOn(Injections.DialogShowService, "showDialog").and.returnValue(Mock.deferredResolve.promise);
    });

    it('onInitMethod should initialized the controller variables', function () {
      spyOn(Injections.UserCommentAboutParticipantService, "getSelectedParticipant").and.returnValue(Mock.participant);
      spyOn(Injections.UserCommentAboutParticipantService, "getNoteAboutParticipant").and.returnValue(Mock.deferred.promise);

      controller.$onInit();
      expect(controller.items).toEqual([]);
      expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.getNoteAboutParticipant).toHaveBeenCalledTimes(1);
      expect(controller.recruitmentNumber).toEqual(Mock.participant.recruitmentNumber);
    });

    it('fillSelectedCommentMethod should initialized the controller variables', function () {
      controller.fillSelectedComment(Mock.items[0]);
      Mock.scope.$digest();
      expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(controller.comment).toEqual(Mock.items[0].comment)
      expect(controller.selectedComment).toEqual(Mock.items[0])
    });

    it('fillSelectedCommentMethod should initialized the controller variables and selected comment', function () {
      spyOn(Injections.UserCommentAboutParticipantService, "showMsg").and.callThrough();

      controller.selectedComment = Mock.items[0];
      controller.fillSelectedComment(Mock.items[1]);
      Mock.scope.$digest();
      expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.showMsg).toHaveBeenCalledTimes(1);
      expect(controller.comment).toEqual(Mock.items[1].comment)
      expect(controller.selectedComment).toEqual(Mock.items[1])
    });

    it('cancelSelectedCommentMethod should initialized the controller variables', function () {
      controller.cancelFillSelectedComment();
      Mock.scope.$digest();
      expect(controller.comment).toEqual("")
      expect(controller.selectedComment).toBeNull();
    });

    it('deleteSelectedCommentMethod should initialized the controller variables', function () {
      spyOn(Injections.UserCommentAboutParticipantService, "deleteSelectedComment").and.returnValue(Promise.resolve());

      controller.deleteSelectedComment(Mock.items[0]._id);
      Mock.scope.$digest();
      expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.deleteSelectedComment).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.deleteSelectedComment).toHaveBeenCalledWith(Mock.items[0]._id);

    });

    it('showStarSelectedUserCommentAboutParticipantMethod should initialized the controller variables', function () {
      spyOn(Injections.UserCommentAboutParticipantService, 'showStarSelectedUserCommentAboutParticipant').and.returnValue(Mock.deferredResolve.promise)

      controller.showStarSelectedUserCommentAboutParticipant(Mock.items[0])
      expect(Injections.UserCommentAboutParticipantService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledWith(Mock.items[0]._id, Mock.starred);

    });

    it('saveUserCommentAboutParticipantMethod should initialized the controller variables', function () {
      let userComment = {
        comment: Mock.items[0].comment,
        recruitmentNumber: Mock.participant.recruitmentNumber
      }
      controller.comment = Mock.items[0].comment;
      controller.recruitmentNumber = Mock.participant.recruitmentNumber;

      spyOn(Injections.UserCommentAboutParticipantService, 'saveUserCommentAboutParticipant').and.returnValue(Mock.deferredResolve.promise);

      controller.saveUserCommentAboutParticipant();
      expect(Injections.UserCommentAboutParticipantService.saveUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.saveUserCommentAboutParticipant).toHaveBeenCalledWith(userComment);
    });

  });

  function mockInitialize($rootScope, $q) {
    Mock.element = angular.element('<div></div>');
    Mock.scope = $rootScope.$new();
    Mock.deferred = $q.defer();
    Mock.deferredResolve = $q.defer();
    Mock.model = {
      "_id": "602699fcefc5ca1cb146be4a",
      "recruitmentNumber": 1234567,
      userName: 'Fulano',
      "creationDate": "2021-02-12T15:08:44.854Z",
      "lastUpdate": "2021-02-12T15:08:44.854Z",
      "editeded": false,
      "starred": false,
      "comment": "primeiro commentário",
      "userId": "5d1bbabe995e20d290d94e49"
    };

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

    Mock.deferredResolve.resolve();
    Mock.deferred.resolve(Mock.items);
  }

});
