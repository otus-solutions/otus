describe('ActivityRemoteStorageService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  const ACTIVITY_ID = "123";
  const RN = 12345;
  const DATA = {activity: {}};
  const ACRONYM = "ABC";
  const VERSION = 1;
  const SURVEY_ACTIVITIES = [DATA, DATA, DATA];
  const ACTIVITY_REVISION = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $rootScope) => {
      Injections.$q = $injector.get('$q');
      Injections.ActivityRestService = $injector.get('otusjs.deploy.ActivityRestService');
      Injections.ActivityImportRestService = $injector.get('otusjs.deploy.ActivityImportRestService');
      Injections.ActivityConfigurationRestService = $injector.get('otusjs.deploy.ActivityConfigurationRestService');
      Injections.ActivitySharingRestService = $injector.get('otusjs.deploy.ActivitySharingRestService');
      service = $injector.get('otusjs.deploy.ActivityRemoteStorageService', Injections);

      _mockInitialize($injector);
      Mock.$scope = $rootScope.$new();
    });
  });


  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.insert).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.updateCheckerActivity).toBeDefined();
    expect(service.findActivities).toBeDefined();
    expect(service.findCategories).toBeDefined();
    expect(service.getById).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
    expect(service.importActivities).toBeDefined();
    expect(service.createFollowUpActivity).toBeDefined();
    expect(service.getSharedURL).toBeDefined();
    expect(service.renovateSharedURL).toBeDefined();
    expect(service.deleteSharedURL).toBeDefined();
    expect(service.reopenActivity).toBeDefined();
  });

  it('insert method should call $q.all', () => {
    spyOn(Injections.ActivityRestService, 'save').and.returnValue(
      _mockPromiseResolve({data: ACTIVITY_ID}));
    spyOn(Injections.$q, 'all').and.returnValue(Mock.resolve);
    expect(service.insert([Mock.activity])).toBePromise();
    expect(Injections.$q.all).toHaveBeenCalledTimes(1);
  });

  it('findActivities method should call ActivityRestService list method', () => {
    spyOn(Injections.ActivityRestService, 'list');
    service.findActivities({recruitmentNumber: RN});
    expect(Injections.ActivityRestService.list).toHaveBeenCalledTimes(1);
  });

  describe('getByID method Suite Test', function () {

    it('should getByID of activity revision', function () {
      spyOn(Injections.ActivityRestService, 'getById').and.returnValue(Mock.resolve);
      service.getById(ACTIVITY_ID, RN);
      Mock.$scope.$digest();
      expect(Injections.ActivityRestService.getById).toHaveBeenCalledTimes(1);
    });

    it('should getByID return rejected promise', function () {
      spyOn(Injections.ActivityRestService, 'getById').and.returnValue(Mock.reject);
      service.getById(ACTIVITY_ID, RN);
      Mock.$scope.$digest();
      expect(Injections.ActivityRestService.getById).toHaveBeenCalledTimes(1);
    });
  });

  it('findCategories method should return ActivityConfigurationRestService list', () => {
    const LIST = [];
    spyOn(Injections.ActivityConfigurationRestService, 'list').and.returnValue(LIST);
    expect(service.findCategories()).toEqual(LIST);
    expect(Injections.ActivityConfigurationRestService.list).toHaveBeenCalledTimes(1);
  });


  describe('addActivityRevision method Suite Test', function () {

    it('should add activity revision', function () {
      spyOn(Injections.ActivityRestService, 'addActivityRevision').and.returnValue(Mock.resolve);
      service.addActivityRevision(ACTIVITY_REVISION, Mock.activity);
      Mock.$scope.$digest();
      expect(Injections.ActivityRestService.addActivityRevision).toHaveBeenCalledTimes(1);
    });

    it('should return rejected promise', function () {
      spyOn(Injections.ActivityRestService, 'addActivityRevision').and.returnValue(Mock.reject);
      service.addActivityRevision(ACTIVITY_REVISION, Mock.activity);
      Mock.$scope.$digest();
      expect(Injections.ActivityRestService.addActivityRevision).toHaveBeenCalledTimes(1);
    });

  });

  describe('getActivityRevisions method Suite Test', function () {

    it('should get activity revision', function () {
      spyOn(Injections.ActivityRestService, 'getActivityRevisions').and.returnValue(Mock.resolve);
      service.getActivityRevisions(ACTIVITY_ID, Mock.activity);
      Mock.$scope.$digest();
      expect(Injections.ActivityRestService.getActivityRevisions).toHaveBeenCalledTimes(1);
    });

    it('should return rejected promise', function () {
      spyOn(Injections.ActivityRestService, 'getActivityRevisions').and.returnValue(Mock.reject);
      service.getActivityRevisions(ACTIVITY_ID, Mock.activity);
      Mock.$scope.$digest();
      expect(Injections.ActivityRestService.getActivityRevisions).toHaveBeenCalledTimes(1);
    });

  });

  describe('importActivities method Suite Test', function () {

    it('should get activity revision', function () {
      spyOn(Injections.ActivityImportRestService, 'importActivities').and.returnValue(Mock.resolve);
      service.importActivities(SURVEY_ACTIVITIES, ACRONYM, VERSION);
      Mock.$scope.$digest();
      expect(Injections.ActivityImportRestService.importActivities).toHaveBeenCalledTimes(1);
    });

    it('should return rejected promise', function () {
      spyOn(Injections.ActivityImportRestService, 'importActivities').and.returnValue(Mock.reject);
      service.importActivities(SURVEY_ACTIVITIES, ACRONYM, VERSION);
      Mock.$scope.$digest();
      expect(Injections.ActivityImportRestService.importActivities).toHaveBeenCalledTimes(1);
    });

  });

  describe('createFollowUpActivity method Suite Test', function () {

    it('should create followUp activity', function () {
      spyOn(Injections.ActivityRestService, 'createFollowUpActivity').and.returnValue(Mock.resolve);
      service.createFollowUpActivity(Mock.activity);
      Mock.$scope.$digest();
      expect(Injections.ActivityRestService.createFollowUpActivity).toHaveBeenCalledTimes(1);
    });

    it('should return rejected promise', function () {
      spyOn(Injections.ActivityRestService, 'createFollowUpActivity').and.returnValue(Mock.reject);
      service.createFollowUpActivity(Mock.activity);
      Mock.$scope.$digest();
      expect(Injections.ActivityRestService.createFollowUpActivity).toHaveBeenCalledTimes(1);
    });

  });

  it('getSharedURL method should return promise by ActivitySharingRestService', () => {
    spyOn(Injections.ActivitySharingRestService, 'getSharedURL').and.returnValue(Mock.resolve);
    expect(service.getSharedURL(Mock.activityId)).toBePromise();
    expect(Injections.ActivitySharingRestService.getSharedURL).toHaveBeenCalledTimes(1);
  });

  it('renovateSharedURL method should return promise by ActivitySharingRestService', () => {
    spyOn(Injections.ActivitySharingRestService, 'renovateSharedURL').and.returnValue(Mock.resolve);
    expect(service.renovateSharedURL(Mock.activitySharing.getId())).toBePromise();
    expect(Injections.ActivitySharingRestService.renovateSharedURL).toHaveBeenCalledTimes(1);
  });

  it('deleteSharedURL method should return promise by ActivitySharingRestService', () => {
    spyOn(Injections.ActivitySharingRestService, 'deleteSharedURL').and.returnValue(Mock.resolve);
    expect(service.deleteSharedURL(Mock.activitySharing.getId())).toBePromise();
    expect(Injections.ActivitySharingRestService.deleteSharedURL).toHaveBeenCalledTimes(1);
  });

  it('reopenActivity method should return ActivityRestService reopen result', () => {
    const RESULT = {};
    spyOn(Injections.ActivityRestService, 'reopen').and.returnValue(RESULT);
    expect(service.reopenActivity(ACTIVITY_ID)).toEqual(RESULT);
    expect(Injections.ActivityRestService.reopen).toHaveBeenCalledTimes(1);
  });


  function _mockInitialize($injector) {
    const deferredResolve = Injections.$q.defer();
    deferredResolve.resolve();
    Mock.resolve = deferredResolve.promise;

    const deferredReject = Injections.$q.defer();
    deferredReject.reject('some error');
    Mock.reject = deferredReject.promise;

    Mock.activity = {
      _id: "1234567890"
    };

    Mock.ActivitySharingService = $injector.get('otusjs.activity.business.ActivitySharingService');
    Mock.responseActivityShared = Test.utils.data.activitySharingArtfacts.data.dataSharingJson;
    Mock.activityId = Mock.responseActivityShared.data.activitySharing.activityId;
    Mock.activitySharing = Mock.ActivitySharingService.parseActivitySharing(Mock.responseActivityShared.data);
  }

  function _mockPromiseResolve(value){
    const deferredResolveObj = Injections.$q.defer();
    deferredResolveObj.resolve(value);
    return deferredResolveObj.promise;
  }
});
