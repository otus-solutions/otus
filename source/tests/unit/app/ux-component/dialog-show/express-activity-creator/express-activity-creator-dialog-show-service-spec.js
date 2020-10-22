describe('_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q, $rootScope) => {
      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      service = $injector.get('otusjs.otus.uxComponent.OtusExpressActivityCreatorDialogShowService', Injections);
      mockInitialize($q, $rootScope);

      spyOn(Injections.ParticipantActivityService, "listAllCategories");
      spyOn(Injections.ParticipantActivityService, "listAvailables").and.returnValue(Mock.deferred.promise)
    });
  });

  function mockInitialize($q, $rootScope){
    Mock.deferred = $q.defer();
    Mock.deferred.resolve([Test.utils.data.preActivity.surveyForm])
  }

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.loadCategories).toBeDefined();
    expect(service.getSurveyByAcronym).toBeDefined();
    expect(service.createActivity).toBeDefined();
  });

  it('loadCategories method should evoke listAllCategories by ParticipantActivityService', () => {
    service.loadCategories();
    expect(Injections.ParticipantActivityService.listAllCategories).toHaveBeenCalledTimes(1)
  });

  it('getSurveyByAcronym should filter survey by acronym ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
});
