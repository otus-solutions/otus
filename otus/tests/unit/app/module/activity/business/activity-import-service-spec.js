describe('activity-import-service Test', function () {
  var Mock = {};
  var service;
  var Injections = {};

  Mock.surveyActivities = [{},{}];
  Mock.version = 1;

  beforeEach(function () {
    angular.mock.module('otusjs.activity', function ($provide) {
      $provide.value('otusjs.deploy.SurveyRestService', {});
      $provide.value('otusjs.deploy.SurveyGroupRestService', {});
    });

    inject(function (_$injector_) {
      Injections = {
        ActivityRepositoryService: _$injector_.get('otusjs.activity.repository.ActivityRepositoryService')
      };
      service = _$injector_.get('otusjs.activity.business.ActivityImportService', Injections);
    });

    spyOn(Injections.ActivityRepositoryService, "importActivities");
  });

  it('should define service', function () {
    expect(service).toBeDefined()
    expect(service.importActivities).toBeDefined()
  });

  it('should call importActivities method', function () {
    service.importActivities(Mock.surveyActivities, Mock.version);
    expect(Injections.ActivityRepositoryService.importActivities).toHaveBeenCalledTimes(1);
    expect(Injections.ActivityRepositoryService.importActivities).toHaveBeenCalledWith(Mock.surveyActivities, Mock.version)
  });

});
