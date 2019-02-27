describe('survey-repository-service Test', function() {
  var Mock = {};
  var service;
  var UNIT_NAME = "otusjs.activity.repository.SurveyRepositoryService";

  beforeEach(function() {
    mockInjections();
    angular.mock.module('otusjs.activity.repository', function ($provide) {
      $provide.value('otusjs.activity.repository.SurveyCollectionService', Mock.SurveyCollectionService)
    });

    inject(function(_$injector_) {
      service = _$injector_.get(UNIT_NAME);
    });

    spyOn(Mock.SurveyCollectionService, "listSurveysGroups").and.callThrough();
  });

  it('should defined methods', function() {
    expect(service.listSurveysGroups).toBeDefined();
  });

  it('should call listSurveysGroups method', function () {
    service.listSurveysGroups();
    expect(Mock.SurveyCollectionService.listSurveysGroups).toHaveBeenCalledTimes(1)
  });

  function mockInjections() {
    Mock.SurveyCollectionService = {
      listSurveysGroups: () => {}
    };
  }
});
