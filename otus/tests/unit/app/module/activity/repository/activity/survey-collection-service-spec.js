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

    spyOn(Mock.SurveyRestService, "getSurveyGroupsByUser").and.callThrough();
  });

  it('should defined methods', function() {
    expect(service.getSurveyGroupsByUser).toBeDefined();
  });

  it('should call getSurveyGroupsByUser method', function () {
    service.getSurveyGroupsByUser();
    expect(Mock.SurveyRestService.getSurveyGroupsByUser).toHaveBeenCalledTimes(1)
  });

  function mockInjections() {
    Mock.ModuleService = {};
    Mock.SurveyRestService = {
      getSurveyGroupsByUser: () => {}
    };
  }
});

