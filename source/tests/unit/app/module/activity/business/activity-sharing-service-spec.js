describe('ActivitySharingService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};
  const PARSE_ACTIVITY_SHARING_ERROR_MSG = 'an error occurred while trying to parse ativitySharingJson'

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q) => {
      Injections.ActivitySharingCollectionService = $injector.get('otusjs.activity.repository.ActivitySharingCollectionService');
      Injections.ActivitySharingFactory = $injector.get('otusjs.activity.business.model.ActivitySharingFactory');
      Injections.$mdToast = $injector.get('$mdToast');
      service = $injector.get('otusjs.activity.business.ActivitySharingService', Injections);
      mockInitialize($q);
      spyOn(Injections.ActivitySharingCollectionService, 'getSharedURL').and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ActivitySharingCollectionService, 'renovateSharedURL').and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ActivitySharingCollectionService, 'deleteSharedURL').and.returnValue(Mock.deferred.promise);
      spyOn(Injections.$mdToast, 'show');
    });
  });

  function mockInitialize($q) {
    Mock.responseActivityShared = Test.utils.data.activitySharingArtfacts.data.dataSharingJson;
    Mock.activityId = Mock.responseActivityShared.data.activitySharing.activityId;
    Mock.activitySharing = service.parseActivitySharing(Mock.responseActivityShared.data);
    Mock.deferred = $q.defer();
  }

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.getSharedURL).toBeDefined();
    expect(service.renovateSharedURL).toBeDefined();
    expect(service.deleteSharedURL).toBeDefined();
    expect(service.parseActivitySharing).toBeDefined();
    expect(service.copyLinkToClipboard).toBeDefined();
    expect(service.callToast).toBeDefined();
  });

  it('getSharedURL method should return a promise by collectionService', () => {
    expect(service.getSharedURL(Mock.activityId)).toBePromise();
    expect(Injections.ActivitySharingCollectionService.getSharedURL).toHaveBeenCalledTimes(1);
  });

  it('renovateSharedURL method should return a promise by collectionService', () => {
    expect(service.renovateSharedURL(Mock.activitySharing.getId())).toBePromise();
    expect(Injections.ActivitySharingCollectionService.renovateSharedURL).toHaveBeenCalledTimes(1);
  });

  it('deleteSharedURL method should return a promise by collectionService', () => {
    expect(service.deleteSharedURL(Mock.activitySharing.getId())).toBePromise();
    expect(Injections.ActivitySharingCollectionService.deleteSharedURL).toHaveBeenCalledTimes(1);
  });

  it('parseActivitySharing method should parse activitySharingJson by ActiviytSharingFactory', () => {
    let activitySharing = service.parseActivitySharing(Mock.responseActivityShared.data);
    expect(activitySharing.objectType).toBe('ActivitySharing');
    expect(activitySharing.url).toBe(Mock.responseActivityShared.data.url);
  });

  it('parseActivitySharing method throw parseError for Invalid activitySharingJson', () => {
    expect(() => service.parseActivitySharing(Mock.responseActivityShared))
      .toThrowError(PARSE_ACTIVITY_SHARING_ERROR_MSG);
  });

 it('callToast method should call show by $mdToast', () => {
   service.callToast("MockMessage",  1000);
   expect(Injections.$mdToast.show).toHaveBeenCalledTimes(1)
  });

});
