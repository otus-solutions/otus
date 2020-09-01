fdescribe('ActivitySharingRestService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    mockData();
    angular.mock.inject(($injector, $q) => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.ActivitySharingRestService', Injections);
      Mock._rest = Injections.OtusRestResourceService.getActivitySharingResourceFactory();
      spyOn(Injections.OtusRestResourceService, "getActivitySharingResourceFactory").and.returnValue(Mock._rest);
      spyOn(Mock._rest, 'getSharedURL').and.callThrough();
      spyOn(Mock._rest, 'renovateSharedURL').and.callThrough();
      spyOn(Mock._rest, 'deleteSharedURL').and.callThrough();
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.initialize).toBeDefined();
    expect(service.getSharedURL).toBeDefined();
    expect(service.renovateSharedURL).toBeDefined();
    expect(service.deleteSharedURL).toBeDefined();
  });

  it('initializeMethod should evoke getActivitySharingResourceFactory by OtusRestResourceService', () => {
    service.initialize();
    expect(Injections.OtusRestResourceService.getActivitySharingResourceFactory).toHaveBeenCalledTimes(1);
  });

  it('getSharedURL method should return promise', () => {
    service.initialize();
    expect(service.getSharedURL(Mock.activityId)).toBePromise();
  });

  it('renovateSharedURL method should return promise', () => {
    service.initialize();
    expect(service.renovateSharedURL(Mock.activitySharingId)).toBePromise();
  });

  it('deleteSharedURL method should return promise', () => {
    service.initialize();
    expect(service.deleteSharedURL(Mock.activitySharingId)).toBePromise();
  });

  function mockData() {
    Mock.activityId = Test.utils.data.activitySharingArtfacts.data.dataSharingJson.data.activitySharing.activityId;
    Mock.activitySharingId = "5be45306e69a690064fb1e1c";
  }
});
