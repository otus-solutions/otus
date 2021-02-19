fdescribe('UserCommentAboutParticipantRestService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.inject($injector => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.UserCommentAboutParticipantRestService', Injections);

      Mock._rest = Injections.OtusRestResourceService.getNoteAboutParticipantResourceFactory();
      spyOn(Injections.OtusRestResourceService, 'getNoteAboutParticipantResourceFactory').and.returnValue(Mock._rest);

      mockInitialize();

      service.initialize();
    });
  });

  it('service_existence_check', () => {
    expect(service).toBeDefined();
  });

  it('service_methods_existence_check', () => {
    expect(service.initialize).toBeDefined();
    expect(service.getAllUsersComments).toBeDefined();
    expect(service.showStarSelectedUserCommentAboutParticipant).toBeDefined();
    expect(service.deleteSelectedComment).toBeDefined();
    expect(service.saveUserCommentAboutParticipant).toBeDefined();
    expect(service.updateUserCommentAboutParticipant).toBeDefined();
  });

  it('initializeMethod_should_evoke_getNoteAboutParticipantResourceFactory_from_OtusRestResourceService', () => {
    expect(Injections.OtusRestResourceService.getNoteAboutParticipantResourceFactory).toHaveBeenCalledTimes(1);
  });

  it('getAllUsersCommentsMethod should_return_promise_and_call_getAll_rest_method', () => {
    spyOn(Mock._rest, 'getAll').and.callThrough();

    expect(service.getAllUsersComments(Mock.searchSettings)).toBePromise();
    expect(Mock._rest.getAll).toHaveBeenCalledTimes(1);
  });

  it('showStarSelectedUserCommentAboutParticipantMethod should_return_promise_and_call_updateStarred_rest_method', () => {
    spyOn(Mock._rest, 'updateStarred').and.callThrough();

    expect(service.showStarSelectedUserCommentAboutParticipant(Mock.items[0]._id, Mock.starred)).toBePromise();
    expect(Mock._rest.updateStarred).toHaveBeenCalledTimes(1);
  });

  it('deleteSelectedCommentMethod should_return_promise_and_call_delete_rest_method', () => {
    spyOn(Mock._rest, 'delete').and.callThrough();

    expect(service.deleteSelectedComment(Mock.items[0]._id)).toBePromise();
    expect(Mock._rest.delete).toHaveBeenCalledTimes(1);
  });

  it('saveUserCommentAboutParticipantMethod should_return_promise_and_call_create_rest_method', () => {
    let userComment = {
      comment: Mock.items[0].comment,
      recruitmentNumber: Mock.participant.recruitmentNumber
    }
    spyOn(Mock._rest, 'create').and.callThrough();

    expect(service.saveUserCommentAboutParticipant(userComment)).toBePromise();
    expect(Mock._rest.create).toHaveBeenCalledTimes(1);
  });

  it('updateUserCommentAboutParticipantMethod should_return_promise_and_call_update_rest_method', () => {
    spyOn(Mock._rest, 'update').and.callThrough();

    expect(service.updateUserCommentAboutParticipant(Mock.items[0])).toBePromise();
    expect(Mock._rest.update).toHaveBeenCalledTimes(1);
  });

  function mockInitialize() {
    Mock.participant = { recruitmentNumber: '02' };
    Mock.starred = false;
    Mock.searchSettings = {
      recruitmentNumber: '02'
    }
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
