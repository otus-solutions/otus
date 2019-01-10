describe('participant-activity-service Test', function() {
    var Mock = {};
    var service;
    var Injections = {};

    beforeEach(function() {
      angular.mock.module('otusjs.activity.business', function ($provide) {
        mockInjection();
        $provide.value('otusjs.activity.core.ModuleService',{});
        $provide.value('otusjs.activity.core.ContextService',{});
        $provide.value('otusjs.activity.repository.ActivityRepositoryService', Mock.ActivityRepositoryService);
        $provide.value('otusjs.activity.repository.UserRepositoryService',{});
      });

      inject(function(_$injector_) {
        service = _$injector_.get('otusjs.activity.business.ParticipantActivityService');
      });

      spyOn(Mock.ActivityRepositoryService, "updateCheckerActivity").and.callThrough();
    });
    it('should call Mock.ActivityRepositoryService.updateCheckerActivity method', function() {
      expect(Mock.ActivityRepositoryService.updateCheckerActivity).toBeDefined();
      service.updateCheckerActivity(Mock.id,Mock.activityStatus);
      expect(Mock.ActivityRepositoryService.updateCheckerActivity).toHaveBeenCalledTimes(1);
      expect(Mock.ActivityRepositoryService.updateCheckerActivity).toHaveBeenCalledWith(Mock.object);
    });

    function mockInjection() {
      Mock.ActivityRepositoryService = {
        updateCheckerActivity: function (obj) {
          return obj;
        }
      };

      Mock.id = "5aff3edaaf11bb0d302be3c7";
      Mock.activityStatus = {
        "objectType": "ActivityStatus",
        "name": "FINALIZED",
        "date": "2018-11-08T15:15:45.810Z",
        "user": {
          "name": "Emanoel",
          "surname": "Vianna",
          "phone": "51999999999",
          "email": "otus@otus.com"
        }
      }

      Mock.object = {id:Mock.id, activityStatus: Mock.activityStatus}

    }

});
