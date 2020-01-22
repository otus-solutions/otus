describe('activity-remote-storage-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  var DATA = {activity:{}};
  var ACRONYM = "ABC";
  var VERSION = 1;
  var SURVEY_ACTIVITIES = [DATA,DATA,DATA];
  var ACTIVITY_REVISION = {};
  var ACTIVITY_ID = 123;
  var DATA_ACTIVITY = "54321";
  var DATA_RN = "0000000";

  beforeEach(function() {
    mockInjections();
    angular.mock.module('otusjs.deploy.storage', function ($provide) {
      $provide.value('otusjs.deploy.ActivityRestService', Mock.ActivityRestService);
      $provide.value('otusjs.deploy.ActivityImportRestService', Mock.ActivityImportRestService);
      $provide.value('otusjs.deploy.ActivityConfigurationRestService', {});
    });

    inject(function(_$injector_) {
      Injections = {
        $q: _$injector_.get('$q')
      };
      service = _$injector_.get('otusjs.deploy.ActivityRemoteStorageService', Injections);
    });
  });

  it('should create a service', function() {
    expect(service).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
    expect(service.importActivities).toBeDefined();
    expect(service.getById).toBeDefined();
  });

  describe("activity revision", function () {
    beforeEach(function () {
      spyOn(Mock.ActivityRestService, "addActivityRevision").and.callThrough();
      spyOn(Mock.ActivityRestService, "getActivityRevisions").and.callThrough();
    });

    it('should create a activity revision', function () {
      service.addActivityRevision(ACTIVITY_REVISION, DATA);
      expect(Mock.ActivityRestService.addActivityRevision).toHaveBeenCalledTimes(1);
      expect(Mock.ActivityRestService.addActivityRevision).toHaveBeenCalledWith(ACTIVITY_REVISION, DATA);
    });

    it('should create a activity revision', function () {
      service.getActivityRevisions(ACTIVITY_ID, DATA);
      expect(Mock.ActivityRestService.getActivityRevisions).toHaveBeenCalledTimes(1);
      expect(Mock.ActivityRestService.getActivityRevisions).toHaveBeenCalledWith(ACTIVITY_ID, DATA);

    });
  });

  describe("activity", function () {
    beforeEach(function () {
      spyOn(Mock.ActivityRestService, "getById").and.callThrough();
    });

    it('should create a activity revision', function () {
      service.getById(DATA_ACTIVITY,DATA_RN);
      expect(Mock.ActivityRestService.getById).toHaveBeenCalledTimes(1);
      expect(Mock.ActivityRestService.getById).toHaveBeenCalledWith(DATA_ACTIVITY,DATA_RN);

    });
  });

  describe("activity import", function () {
    beforeEach(function () {
      spyOn(Mock.ActivityImportRestService, "importActivities").and.callThrough();
    });

    it('should create a activity revision', function () {
      service.importActivities(SURVEY_ACTIVITIES, ACRONYM, VERSION);
      expect(Mock.ActivityImportRestService.importActivities).toHaveBeenCalledTimes(1);
      expect(Mock.ActivityImportRestService.importActivities).toHaveBeenCalledWith(SURVEY_ACTIVITIES, ACRONYM, VERSION);

    });
  });

  function mockInjections() {
    Mock.ActivityRestService = {
      addActivityRevision: function () {
        return Promise.resolve();
      },
      getActivityRevisions: function () {
        return Promise.resolve();
      },
      getById: function () {
        return Promise.resolve();
      }
    };

    Mock.ActivityImportRestService = {
      importActivities: function () {
        return Promise.resolve();
      }
    };
  }

});
