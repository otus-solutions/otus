describe('ActivitySharingCollectionService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q) => {
      Injections.ActivityRemoteStorageService = $injector.get('otusjs.deploy.ActivityRemoteStorageService');
      service = $injector.get('otusjs.activity.repository.ActivitySharingCollectionService', Injections);
      mockInitialize($injector, $q);
      spyOn(Injections.ActivityRemoteStorageService, "getSharedURL").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ActivityRemoteStorageService, "renovateSharedURL").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ActivityRemoteStorageService, "deleteSharedURL").and.returnValue(Mock.deferred.promise);
    });
  });

  function mockInitialize($injector, $q){
    Mock.ActivitySharingService = $injector.get('otusjs.activity.business.ActivitySharingService');
    Mock.responseActivityShared = Test.utils.data.activitySharingArtfacts.data.dataSharingJson;
    Mock.activityId = Mock.responseActivityShared.data.activitySharing.activityId;
    Mock.activitySharing = Mock.ActivitySharingService.parseActivitySharing(Mock.responseActivityShared.data);
    Mock.deferred = $q.defer();
  }

  it('serviceExistence_check', () => {
      expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.getSharedURL).toBeDefined();
    expect(service.renovateSharedURL).toBeDefined();
    expect(service.deleteSharedURL).toBeDefined();
  });

  it('getSharedURL method should return promise by ActivityRemoteStorageService', () => {
    expect(service.getSharedURL(Mock.activityId)).toBePromise();
  });

  it('renovateSharedURL method should return promise by ActivityRemoteStorageService', () => {
    expect(service.renovateSharedURL(Mock.activitySharing.getId())).toBePromise();
  });

  it('deleteSharedURL method should return promise by ActivityRemoteStorageService', () => {
    expect(service.deleteSharedURL(Mock.activitySharing.getId())).toBePromise();
  });
});
