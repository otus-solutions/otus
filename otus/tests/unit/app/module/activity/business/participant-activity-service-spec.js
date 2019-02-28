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
          ModuleService: _$injector_.get('otusjs.activity.core.ModuleService'),
          ContextService: _$injector_.get('otusjs.activity.core.ContextService'),
          ActivityRepositoryService: _$injector_.get('otusjs.activity.repository.ActivityRepositoryService'),
          UserRepositoryService: _$injector_.get('otusjs.activity.repository.UserRepositoryService')
        };

        service = _$injector_.get('otusjs.activity.business.ParticipantActivityService', Injections);
      });
    });


    it('should create service', function() {
      expect(service).toBeDefined();
      expect(service.addActivityRevision).toBeDefined();
      expect(service.getActivityRevisions).toBeDefined();
    });


    describe("activity revisions test", function () {
      beforeEach(function () {
        spyOn(Injections.ActivityRepositoryService, "addActivityRevision").and.callThrough();
        spyOn(Injections.ActivityRepositoryService, "getActivityRevisions").and.callThrough();
      });

      it('should call addActivityRevision method', function () {
        service.addActivityRevision(ID, DATA);
        expect(Injections.ActivityRepositoryService.addActivityRevision).toHaveBeenCalledTimes(1);
        expect(Injections.ActivityRepositoryService.addActivityRevision).toHaveBeenCalledWith(ID, DATA);
      });

      it('should call getActivityRevisions method', function () {
        service.getActivityRevisions(ACTIVITY_REVISION, DATA);
        expect(Injections.ActivityRepositoryService.getActivityRevisions).toHaveBeenCalledTimes(1);
        expect(Injections.ActivityRepositoryService.getActivityRevisions).toHaveBeenCalledWith(ACTIVITY_REVISION, DATA);
      });
    })

});
