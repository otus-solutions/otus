describe('activity-repository-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  var ID = "12345";
  var ACRONYM = "PASC";
  var VERSION = 1;
  var SURVEY_ACTIVITIES = [{},{}]
  var DATA = {activityID: "54321"};
  var ACTIVITY_REVISION = {revision: DATA};

  beforeEach(function() {
    angular.mock.module('otusjs.activity', function ($provide) {
     $provide.value('otusjs.deploy.SurveyRestService', {});
     $provide.value('otusjs.deploy.SurveyGroupRestService', {});
    });

    inject(function(_$injector_) {
      Injections = {
        "$q": _$injector_.get('$q'),
        ModuleService: _$injector_.get('otusjs.activity.core.ModuleService'),
        ContextService: _$injector_.get('otusjs.activity.core.ContextService'),
        ActivityCollectionService: _$injector_.get('otusjs.activity.repository.ActivityCollectionService'),
        SurveyCollectionService: {}
      };

      service = _$injector_.get('otusjs.activity.repository.ActivityRepositoryService', Injections);
    });
  });


  it('should create service', function() {
    expect(service).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
    expect(service.importActivities).toBeDefined();
    expect(service.getById).toBeDefined();
  });


  describe("activity revisions test", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityCollectionService, "addActivityRevision").and.callThrough();
      spyOn(Injections.ActivityCollectionService, "getActivityRevisions").and.callThrough();
      spyOn(Injections.ActivityCollectionService, "importActivities").and.callThrough();
      spyOn(Injections.ActivityCollectionService, "getById").and.callThrough();
    });

    it('should call addActivityRevision method', function () {
      service.addActivityRevision(ID, DATA);
      expect(Injections.ActivityCollectionService.addActivityRevision).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.addActivityRevision).toHaveBeenCalledWith(ID, DATA);
    });

    it('should call getActivityRevisions method', function () {
      service.getActivityRevisions(ACTIVITY_REVISION, DATA);
      expect(Injections.ActivityCollectionService.getActivityRevisions).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.getActivityRevisions).toHaveBeenCalledWith(ACTIVITY_REVISION, DATA);
    });
  })

  describe("activity import test", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityCollectionService, "importActivities").and.callThrough();
    });

    it('should call importActivities method', function () {
      service.importActivities(SURVEY_ACTIVITIES, ACRONYM, VERSION);
      expect(Injections.ActivityCollectionService.importActivities).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.importActivities).toHaveBeenCalledWith(SURVEY_ACTIVITIES, ACRONYM, VERSION);
    });

  });

  describe("activity test", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityCollectionService, "getById").and.callThrough();
    });

    it('should call getById method', function () {
      service.getById(DATA);
      expect(Injections.ActivityCollectionService.getById).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.getById).toHaveBeenCalledWith(DATA);
    });

  });

});

