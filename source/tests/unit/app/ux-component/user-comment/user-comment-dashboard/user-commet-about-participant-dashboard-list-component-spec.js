describe('otusUserCommentAboutParticipantDashboardListCtrl Test', function () {

  let Mock = {};
  let Injections = [];
  let controller = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector, $controller, $rootScope, $q) {
      Injections.$element = Mock.element;
      Injections.DashboardService = $injector.get('otusjs.otus.dashboard.service.DashboardService');
      Injections.EventService = $injector.get('otusjs.otus.dashboard.core.EventService');
      Injections.UserCommentAboutParticipantService = $injector.get('otusjs.user.comment.business.UserCommentAboutParticipantService');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.USER_COMMENT_MANAGER_LABELS = $injector.get('USER_COMMENT_MANAGER_LABELS');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');

      mockInitialize($rootScope, $q);

      controller = $controller('otusUserCommentAboutParticipantDashboardListCtrl', Injections);
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
    expect(controller.viewPlusUserCommentAboutParticipant).toBeDefined();
  });

  describe('Methods Suite Test', function () {

    beforeEach(function () {
      spyOn(Injections.EventService, "onParticipantSelected");
      spyOn(Injections.DashboardService, "getSelectedParticipant").and.returnValue(Mock.deferredResolve.promise);
      spyOn(Injections.DialogShowService, "showDialog").and.returnValue(Mock.deferredResolve.promise);
    });

    it('onInitMethod should initialized the controller variables', function () {
      controller.selectedParticipant = Mock.participant;

      controller.$onInit();

      Mock.scope.$digest();

      expect(controller.items).toEqual([]);
      expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
      expect(controller.selectedParticipant.recruitmentNumber).toEqual(Mock.participant.recruitmentNumber);
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

    it('cancelSelectedCommentMethod should initialized the cancel selected comment', function () {
      controller.cancelFillSelectedComment();
      Mock.scope.$digest();
      expect(controller.comment).toEqual("")
      expect(controller.selectedComment).toBeNull();
    });

    it('deleteSelectedCommentMethod should initialized the delete selected', function () {
      spyOn(Injections.UserCommentAboutParticipantService, "deleteSelectedComment").and.returnValue(Promise.resolve());

      controller.deleteSelectedComment(Mock.items[0]._id);
      Mock.scope.$digest();
      expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.deleteSelectedComment).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.deleteSelectedComment).toHaveBeenCalledWith(Mock.items[0]._id);

    });

    it('showStarSelectedUserCommentAboutParticipantMethod should initialized the show starred selected', function () {
      spyOn(Injections.UserCommentAboutParticipantService, 'showStarSelectedUserCommentAboutParticipant').and.returnValue(Mock.deferredResolve.promise)
      spyOn(Injections.UserCommentAboutParticipantService, "showMsg").and.callThrough();

      controller.showStarSelectedUserCommentAboutParticipant(Mock.items[0]);

      Mock.scope.$digest();

      expect(Injections.UserCommentAboutParticipantService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.showStarSelectedUserCommentAboutParticipant).toHaveBeenCalledWith(Mock.items[0]._id, Mock.starred);
      expect(Injections.UserCommentAboutParticipantService.showMsg).toHaveBeenCalledTimes(1);
    });

    it('saveUserCommentAboutParticipantMethod should initialized the save', function () {
      let userComment = {
        comment: Mock.items[0].comment,
        recruitmentNumber: Mock.participant.recruitmentNumber
      }
      controller.comment = Mock.items[0].comment;
      controller.selectedParticipant = Mock.participant;

      spyOn(Injections.UserCommentAboutParticipantService, 'saveUserCommentAboutParticipant').and.returnValue(Mock.deferredResolve.promise);
      spyOn(Injections.UserCommentAboutParticipantService, "getNoteAboutParticipant").and.returnValue(Mock.deferredResolve.promise);
      spyOn(Injections.UserCommentAboutParticipantService, "showMsg").and.callThrough();

      controller.saveUserCommentAboutParticipant();

      Mock.scope.$digest();

      expect(Injections.UserCommentAboutParticipantService.saveUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.saveUserCommentAboutParticipant).toHaveBeenCalledWith(userComment);
      expect(Injections.UserCommentAboutParticipantService.getNoteAboutParticipant).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.showMsg).toHaveBeenCalledTimes(1);
    });

    it('saveUserCommentAboutParticipantMethod should initialized the save and updateUserComment', function () {
      controller.comment = Mock.items[0].comment;
      controller.selectedComment = Mock.items[0];

      spyOn(Injections.UserCommentAboutParticipantService, 'updateUserCommentAboutParticipant').and.returnValue(Promise.resolve());

      controller.saveUserCommentAboutParticipant();

      expect(Injections.UserCommentAboutParticipantService.updateUserCommentAboutParticipant).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.updateUserCommentAboutParticipant).toHaveBeenCalledWith(Mock.items[0]);
    });

    it('colorStarMethod should initialized the controller variable for color', function () {
      expect(controller.colorStar(Mock.items[0].starred)).toEqual(Mock.color);
    });

    it('getFormattedDateMethod should initialized the items formate ISO', function () {
      spyOn(Injections.UserCommentAboutParticipantService, 'getFormattedDate').and.returnValue(Promise.resolve());

      controller.getFormattedDate(Mock.items[0].creationDate);
      expect(Injections.UserCommentAboutParticipantService.getFormattedDate).toHaveBeenCalledTimes(1);
      expect(Injections.UserCommentAboutParticipantService.getFormattedDate).toHaveBeenCalledWith(Mock.items[0].creationDate);
    });

    it('viewPlusUserCommentAboutParticipantMethod should initialized the state userCommentAboutParticipant', function () {
      spyOn(Injections.ApplicationStateService, 'userCommentAboutParticipant').and.callThrough();

      controller.viewPlusUserCommentAboutParticipant();

      expect(Injections.ApplicationStateService.userCommentAboutParticipant).toHaveBeenCalledTimes(1);
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

    Mock.color = { color: 'rgb(253, 204, 13)' };
    Mock.showMoreIcon = { icon: 'visibility', tooltip: 'Ocultar Detalhes' };
    Mock.showMoreIcon2 = { icon: 'visibility_off', tooltip: 'Mostrar Detalhes' };
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
