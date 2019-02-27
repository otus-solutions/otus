describe('survey-collection-service Test', function() {
  var Mock = {};
  var service;
  var UNIT_NAME = 'otusjs.activity.repository.SurveyCollectionService';

  beforeEach(function() {
    mockInjections();
    angular.mock.module('otusjs.activity.repository', function ($provide) {
      $provide.value('otusjs.activity.core.ModuleService', Mock.ModuleService);
      $provide.value('otusjs.deploy.SurveyRestService', Mock.SurveyRestService)
    });

    inject(function(_$injector_) {
      service = _$injector_.get(UNIT_NAME);
    });

    spyOn(Mock.SurveyRestService, "listSurveysGroups").and.callThrough();
  });

  it('should defined methods', function() {
    expect(service.listSurveysGroups).toBeDefined();
  });

  it('should call listSurveysGroups method', function () {
    service.listSurveysGroups();
    expect(Mock.SurveyRestService.listSurveysGroups).toHaveBeenCalledTimes(1)
  });

  function mockInjections() {
    Mock.ModuleService = {};
    Mock.SurveyRestService = {
      listSurveysGroups: () => {}
    };
  }
});

