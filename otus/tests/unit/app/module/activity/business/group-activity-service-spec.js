describe('group-activity-service Test', function() {
    var Mock = {};
    var service;
    var UNIT_NAME = "otusjs.activity.business.GroupActivityService";

    beforeEach(function() {
      mockInjections();
       angular.mock.module('otusjs.activity.business', function ($provide) {
         $provide.value('otusjs.activity.repository.SurveyRepositoryService', Mock.SurveyRepositoryService)
       });

      inject(function(_$injector_) {
        service = _$injector_.get(UNIT_NAME);
      });

      spyOn(Mock.SurveyRepositoryService, "listSurveysGroups").and.callThrough();
    });

    it('should defined methods', function() {
      expect(service.listSurveysGroups).toBeDefined();
    });

  it('should call listSurveysGroups method', function () {
    service.listSurveysGroups();
    expect(Mock.SurveyRepositoryService.listSurveysGroups).toHaveBeenCalledTimes(1)
  });

  function mockInjections() {
      Mock.SurveyRepositoryService = {
        listSurveysGroups: () => {}
      };
    }
});
