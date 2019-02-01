describe('activity-repository-service Test', function() {
  var Mock = {};
  var service;

  beforeEach(function() {
    angular.mock.module('otusjs.activity.repository', function ($provide) {
      mockInjection();
      $provide.value('otusjs.activity.core.ModuleService',{});
      $provide.value('otusjs.activity.core.ContextService',{});
      $provide.value('otusjs.activity.repository.ActivityCollectionService', Mock.ActivityCollectionService);
      $provide.value('otusjs.activity.repository.SurveyCollectionService',{});
    });

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.activity.repository.ActivityRepositoryService');
    });

    spyOn(Mock.ActivityCollectionService, "updateCheckerActivity").and.callThrough();
  });
  it('should call Mock.ActivityCollectionService.updateCheckerActivity method', function() {
    expect(Mock.ActivityCollectionService.updateCheckerActivity).toBeDefined();
    service.updateCheckerActivity(Mock.rn, Mock.object);
    expect(Mock.ActivityCollectionService.updateCheckerActivity).toHaveBeenCalledTimes(1);
    expect(Mock.ActivityCollectionService.updateCheckerActivity).toHaveBeenCalledWith(Mock.rn, Mock.object);
  });

  function mockInjection() {
    Mock.ActivityCollectionService = {
      updateCheckerActivity: function (obj) {
        return obj;
      }
    };
    Mock.rn = 35621458;
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
