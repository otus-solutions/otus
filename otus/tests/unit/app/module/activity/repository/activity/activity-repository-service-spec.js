describe('participant-activity-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  var ID = "12345";
  var DATA = {activityID: "54321"};
  var ACTIVITY_REVISION = {revision: DATA};

  beforeEach(function() {
    angular.mock.module('otusjs.activity');

    inject(function(_$injector_) {
      Injections = {
        "$q": _$injector_.get('$q'),
        ModuleService: _$injector_.get('otusjs.activity.core.ModuleService'),
        ContextService: _$injector_.get('otusjs.activity.core.ContextService'),
        ActivityCollectionService: _$injector_.get('otusjs.activity.repository.ActivityCollectionService'),
        UserRepositoryService: _$injector_.get('otusjs.activity.repository.SurveyCollectionService')
      };

      service = _$injector_.get('otusjs.activity.repository.ActivityRepositoryService', Injections);
    });
  });


  it('should create service', function() {
    expect(service).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
  });


  describe("activity revisions test", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityCollectionService, "addActivityRevision").and.callThrough();
      spyOn(Injections.ActivityCollectionService, "getActivityRevisions").and.callThrough();
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

});

