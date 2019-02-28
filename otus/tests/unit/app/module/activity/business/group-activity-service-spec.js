describe('group-activity-service Test', function() {
  var Mock = {};
  var service;
  var UNIT_NAME = "otusjs.activity.business.GroupActivityService";

  beforeEach(function() {
    mockInjections();
    angular.mock.module('otusjs.activity.business', function ($provide) {
      $provide.value('otusjs.activity.repository.SurveyRepositoryService', Mock.SurveyRepositoryService)
      $provide.value('otusjs.survey.GroupManagerFactory', Mock.GroupManagerFactory)
    });

    inject(function(_$injector_) {
      service = _$injector_.get(UNIT_NAME);
    });

    spyOn(Mock.SurveyRepositoryService, "getSurveyGroupsByUser").and.callThrough();
    spyOn(Mock.GroupManagerFactory, "create").and.callThrough();
  });

  it('should defined methods', function() {
    expect(service.getSurveyGroupsByUser).toBeDefined();
  });

  it('should call getSurveyGroupsByUser method', function () {
    service.getSurveyGroupsByUser();
    expect(Mock.SurveyRepositoryService.getSurveyGroupsByUser).toHaveBeenCalledTimes(1)
    Mock.SurveyRepositoryService.getSurveyGroupsByUser().then(function () {
      expect(Mock.GroupManagerFactory.create).toHaveBeenCalledTimes(1);
    })
  });

  function mockInjections() {
    Mock.SurveyRepositoryService = {
      getSurveyGroupsByUser: () => {return Promise.resolve()}
    };

    Mock.GroupManagerFactory = {
      create: () => {}
    }


  }
});
