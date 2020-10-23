describe('OtusExpressActivityCreatorDialogShowService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q, $rootScope) => {
      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      service = $injector.get('otusjs.otus.uxComponent.ExpressActivityCreatorDialogShowService', Injections);
      mockInitialize($q, $rootScope);

      spyOn(Injections.ParticipantActivityService, "listAllCategories");
      spyOn(Injections.ParticipantActivityService, "listAvailables").and.returnValue(Mock.deferred.promise)
      spyOn(Injections.ParticipantActivityService, "saveActivity").and.callThrough();
      spyOn(Injections.ParticipantActivityService, "createPreActivity").and.callThrough();
    });
  });

  function mockInitialize($q, $rootScope){
    Mock.ACRONYM = "CSJ"
    Mock.deferred = $q.defer();
    Mock.deferred.resolve([Test.utils.data.preActivity.surveyForm])
    Mock.scope = $rootScope.$new();
    Mock.preActivityArtefacts = {
      surveyForm: jasmine.createSpy(),
      configuration: jasmine.createSpy(),
      checkerData: jasmine.createSpy(),
      realizationDate: jasmine.createSpy(),
      externalID: jasmine.createSpy()
    }
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

  it('getSurveyByAcronym should filter survey by acronym', () => {
    service.getSurveyByAcronym(Mock.ACRONYM)
      .then((expected) => expect(expected).toBe(Test.utils.data.preActivity.surveyForm))
    Mock.scope.$digest();
    expect(Injections.ParticipantActivityService.listAvailables).toHaveBeenCalledTimes(1)
  });

  it('createActivity method should mount preActivity and evoke saveActivity by ParticipantActivityService', () => {
    expect(service.createActivity(Mock.preActivityArtefacts)).toBePromise();
    expect(Injections.ParticipantActivityService.createPreActivity).toHaveBeenCalledTimes(1)
    expect(Injections.ParticipantActivityService.saveActivity).toHaveBeenCalledTimes(1)
  });
});
