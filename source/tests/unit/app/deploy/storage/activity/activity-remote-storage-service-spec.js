describe('ActivityRemoteStorageService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  /* Old variables */
  let DATA = {activity: {}};
  let ACRONYM = "ABC";
  let VERSION = 1;
  let SURVEY_ACTIVITIES = [DATA, DATA, DATA];
  let ACTIVITY_REVISION = {};
  let ACTIVITY_ID = 123;
  let DATA_ACTIVITY = "54321";
  let DATA_RN = "0000000";


  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.$q = $injector.get('$q');
      Injections.ActivityRestService = $injector.get('otusjs.deploy.ActivityRestService');
      Injections.ActivityImportRestService = $injector.get('otusjs.deploy.ActivityImportRestService');
      Injections.ActivityConfigurationRestService = $injector.get('otusjs.deploy.ActivityConfigurationRestService');
      Injections.ActivitySharingRestService = $injector.get('otusjs.deploy.ActivitySharingRestService');
      service = $injector.get('otusjs.deploy.ActivityRemoteStorageService', Injections);
      mockInitialize($injector);

      spyOn(Injections.ActivitySharingRestService, 'getSharedURL').and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ActivitySharingRestService, 'renovateSharedURL').and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ActivitySharingRestService, 'deleteSharedURL').and.returnValue(Mock.deferred.promise);

      spyOn(Injections.ActivityRestService, 'addActivityRevision').and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ActivityRestService, 'getActivityRevisions').and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ActivityRestService, 'getById').and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ActivityImportRestService, 'importActivities').and.returnValue(Mock.deferred.promise);
    });
  });

  function mockInitialize($injector) {
    Mock.deferred = Injections.$q.defer();
    Mock.ActivitySharingService = $injector.get('otusjs.activity.business.ActivitySharingService');
    Mock.responseActivityShared = Test.utils.data.activitySharingArtfacts.data.dataSharingJson;
    Mock.activityId = Mock.responseActivityShared.data.activitySharing.activityId;
    Mock.activitySharing = Mock.ActivitySharingService.parseActivitySharing(Mock.responseActivityShared.data);
  }

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
  });

  it('getSharedURL method should return promise by ActivitySharingRestService', () => {
    expect(service.getSharedURL(Mock.activityId)).toBePromise();
    expect(Injections.ActivitySharingRestService.getSharedURL).toHaveBeenCalledTimes(1);
  });

  it('renovateSharedURL method should return promise by ActivitySharingRestService', () => {
    expect(service.renovateSharedURL(Mock.activitySharing.getId())).toBePromise();
    expect(Injections.ActivitySharingRestService.renovateSharedURL).toHaveBeenCalledTimes(1);
  });

  it('deleteSharedURL method should return promise by ActivitySharingRestService', () => {
    expect(service.deleteSharedURL(Mock.activitySharing.getId())).toBePromise();
    expect(Injections.ActivitySharingRestService.deleteSharedURL).toHaveBeenCalledTimes(1);
  });

  /*Old Tests recovery*/
  it('should create a activity revision', function () {
    expect(service.addActivityRevision(Mock.ACTIVITY_REVISION, Mock.DATA)).toBePromise();
    expect(Injections.ActivityRestService.addActivityRevision).toHaveBeenCalledTimes(1);
  });

  it('should get a activity revision', function () {
    expect(service.getActivityRevisions(ACTIVITY_ID, DATA)).toBePromise();
    expect(Injections.ActivityRestService.getActivityRevisions).toHaveBeenCalledTimes(1);
  });

  it('should getByID of activity revision', function () {
      expect(service.getById(DATA_ACTIVITY,DATA_RN)).toBePromise();
      expect(Injections.ActivityRestService.getById).toHaveBeenCalledTimes(1);
  });

  it('should importActivities of activity revision', function () {
      expect(service.importActivities(SURVEY_ACTIVITIES, ACRONYM, VERSION)).toBePromise();
      expect(Injections.ActivityImportRestService.importActivities).toHaveBeenCalledTimes(1);
    });
});


//Old Test for comparation in future
// describe('activity-remote-storage-service Test', function() {
//   var Mock = {};
//   var service;
//   var Injections = {};
//   var DATA = {activity:{}};
//   var ACRONYM = "ABC";
//   var VERSION = 1;
//   var SURVEY_ACTIVITIES = [DATA,DATA,DATA];
//   var ACTIVITY_REVISION = {};
//   var ACTIVITY_ID = 123;
//   var DATA_ACTIVITY = "54321";
//   var DATA_RN = "0000000";
//
//   beforeEach(function() {
//     mockInjections();
//     angular.mock.module('otusjs.otus', function ($provide) {
//       $provide.value('otusjs.deploy.ActivityRestService', Mock.ActivityRestService);
//       $provide.value('otusjs.deploy.ActivityImportRestService', Mock.ActivityImportRestService);
//       $provide.value('otusjs.deploy.ActivityConfigurationRestService', {});
//     });
//
//     inject(function(_$injector_) {
//       Injections = {
//         $q: _$injector_.get('$q')
//       };
//       service = _$injector_.get('otusjs.deploy.ActivityRemoteStorageService', Injections);
//     });
//   });
//
//   it('should create a service', function() {
//     expect(service).toBeDefined();
//     expect(service.addActivityRevision).toBeDefined();
//     expect(service.getActivityRevisions).toBeDefined();
//     expect(service.importActivities).toBeDefined();
//     expect(service.getById).toBeDefined();
//   });
//
//   describe("activity revision", function () {
//     beforeEach(function () {
//       spyOn(Mock.ActivityRestService, "addActivityRevision").and.callThrough();
//       spyOn(Mock.ActivityRestService, "getActivityRevisions").and.callThrough();
//     });
//
//     it('should create a activity revision', function () {
//       service.addActivityRevision(Mock.ACTIVITY_REVISION, Mock.DATA);
//       expect(Injections.ActivityRestService.addActivityRevision).toHaveBeenCalledTimes(1);
//       expect(Injections.ActivityRestService.addActivityRevision).toHaveBeenCalledWith(ACTIVITY_REVISION, DATA);
//     });
//
//     it('should create a activity revision', function () {
//       service.getActivityRevisions(ACTIVITY_ID, DATA);
//       expect(Mock.ActivityRestService.getActivityRevisions).toHaveBeenCalledTimes(1);
//       expect(Mock.ActivityRestService.getActivityRevisions).toHaveBeenCalledWith(ACTIVITY_ID, DATA);
//
//     });
//   });
//
//   describe("activity", function () {
//     beforeEach(function () {
//       spyOn(Mock.ActivityRestService, "getById").and.callThrough();
//     });
//
//     it('should create a activity revision', function () {
//       service.getById(DATA_ACTIVITY,DATA_RN);
//       expect(Mock.ActivityRestService.getById).toHaveBeenCalledTimes(1);
//       expect(Mock.ActivityRestService.getById).toHaveBeenCalledWith(DATA_ACTIVITY,DATA_RN);
//
//     });
//   });
//
//   describe("activity import", function () {
//     beforeEach(function () {
//       spyOn(Mock.ActivityImportRestService, "importActivities").and.callThrough();
//     });
//
//     it('should create a activity revision', function () {
//       service.importActivities(SURVEY_ACTIVITIES, ACRONYM, VERSION);
//       expect(Mock.ActivityImportRestService.importActivities).toHaveBeenCalledTimes(1);
//       expect(Mock.ActivityImportRestService.importActivities).toHaveBeenCalledWith(SURVEY_ACTIVITIES, ACRONYM, VERSION);
//
//     });
//   });
//
//   function mockInjections() {
//     Mock.ActivityRestService = {
//       addActivityRevision: function () {
//         return Promise.resolve();
//       },
//       getActivityRevisions: function () {
//         return Promise.resolve();
//       },
//       getById: function () {
//         return Promise.resolve();
//       }
//     };
//
//     Mock.ActivityImportRestService = {
//       importActivities: function () {
//         return Promise.resolve();
//       }
//     };
//   }
//
//  });
