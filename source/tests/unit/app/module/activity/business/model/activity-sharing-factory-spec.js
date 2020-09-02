describe('ActivitySharingFactory_UnitTest_Suite', () => {
  let factory, activitySharingParsed;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      factory = $injector.get('otusjs.activity.business.model.ActivitySharingFactory', Injections);
      mockInitialize();
      activitySharingParsed = factory.create(Mock.ActivitySharedJson);
    });
  });

  function mockInitialize(){
    Mock.ActivitySharedJson = Test.utils.data.activitySharingArtfacts.data.dataSharingJson.data.activitySharing;
    Mock.timeResultExpirationDate = 1598977725885;
  }

  it('factoryExistence_check', () => {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence_check', () => {
    expect(factory.create).toBeDefined();
  });

  it('getId method by factoryInstance should return id', () => {
    expect(activitySharingParsed.getId()).toBe(Mock.ActivitySharedJson._id);
  });

  it('isValid method by factoryInstance should return linkExpiredValue', () => {
    expect(activitySharingParsed.isValid()).toBeFalsy();
  });

  it('getExpirationDate method by factoryInstance should return ExpirationDate', () => {
    expect(activitySharingParsed.getExpirationDate().getTime()).toBe(Mock.timeResultExpirationDate);
  });

});
