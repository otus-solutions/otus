describe('activity-repository-service Test', function () {
  let Mock = {};
  let Injections = {};
  let service;

  const ID = "12345";
  const ACRONYM = "PASC";
  const VERSION = 1;
  const SURVEY_ACTIVITIES = [{}, {}];
  const DATA = { activityID: "54321" };
  const DATA_ACTIVITY = "54321";
  const DATA_RN = "0000000";
  const ACTIVITY_REVISION = { revision: DATA };

  const UNINITIALIZED_REPOSITORY_ERROR_MESSAGE = 'No participant selected to list stage.';

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    inject(function ($injector) {
      Injections = {
        "$q": $injector.get('$q'),
        ModuleService: $injector.get('otusjs.activity.core.ModuleService'),
        ActivityCollectionService: $injector.get('otusjs.activity.repository.ActivityCollectionService'),
        SurveyCollectionService: {}
      };

      service = $injector.get('otusjs.activity.repository.ActivityRepositoryService', Injections);
    });

    mocks();
  });

  it('should create service', function () {
    expect(service).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
    expect(service.importActivities).toBeDefined();
    expect(service.getById).toBeDefined();
    expect(service.createFollowUpActivity).toBeDefined();
    expect(service.getAllByStageGroup).toBeDefined();
    expect(service.discardActivity).toBeDefined();
  });

  describe('listAll method Suit Test', function () {

    it('should throw error in case falsy participant parameter', function(){
      try{
        service.listAll();
        expect(false).toBeTruthy();
      }
      catch (e) {
        expect(true).toBeTruthy();
      }
    });

    it('should list all in case truthy participant parameter', function(){
      spyOn(Injections.ActivityCollectionService, 'useParticipant');
      spyOn(Injections.ActivityCollectionService, 'listAll').and.returnValue(Mock.resolve);
      service.listAll(Mock.participant);
      expect(Injections.ActivityCollectionService.useParticipant).toHaveBeenCalledTimes(1);
    });

  });

  it('listAllCategories should return ActivityCollectionService result', function(){
    const LIST = {};
    spyOn(Injections.ActivityCollectionService, 'listAllCategories').and.returnValue(LIST);
    expect(service.listAllCategories()).toEqual(LIST);
    expect(Injections.ActivityCollectionService.listAllCategories).toHaveBeenCalledTimes(1);
  });

  it('updateCheckerActivity should return ActivityCollectionService result', function(){
    const PROMISE = {};
    spyOn(Injections.ActivityCollectionService, 'updateCheckerActivity').and.returnValue(PROMISE);
    expect(service.updateCheckerActivity(DATA_RN, {})).toEqual(PROMISE);
    expect(Injections.ActivityCollectionService.updateCheckerActivity).toHaveBeenCalledTimes(1);
  });

  describe("activity revisions Suite Test", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityCollectionService, "addActivityRevision").and.callThrough();
      spyOn(Injections.ActivityCollectionService, "getActivityRevisions").and.callThrough();
      spyOn(Injections.ActivityCollectionService, "importActivities").and.callThrough();
      spyOn(Injections.ActivityCollectionService, "getById").and.callThrough();
    });

    it('should call addActivityRevision method', function () {
      service.addActivityRevision(ID, DATA);
      expect(Injections.ActivityCollectionService.addActivityRevision).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.addActivityRevision).toHaveBeenCalledWith(ID, DATA);
    });

    it('should call getActivityRevisions method', function () {
      service.getActivityRevisions(ACTIVITY_REVISION, DATA);
      expect(Injections.ActivityCollectionService.getActivityRevisions).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.getActivityRevisions).toHaveBeenCalledWith(ACTIVITY_REVISION, DATA);
    });
  });

  describe("importActivities Suite Test", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityCollectionService, "importActivities").and.callThrough();
    });

    it('should call importActivities method', function () {
      service.importActivities(SURVEY_ACTIVITIES, ACRONYM, VERSION);
      expect(Injections.ActivityCollectionService.importActivities).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.importActivities).toHaveBeenCalledWith(SURVEY_ACTIVITIES, ACRONYM, VERSION);
    });

  });

  describe("createFollowUpActivity Suite Test", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityCollectionService, "getById").and.callThrough();
      spyOn(Injections.ActivityCollectionService, "createFollowUpActivity").and.callThrough();
    });

    it('should call getById method', function () {
      service.getById(DATA_ACTIVITY, DATA_RN);
      expect(Injections.ActivityCollectionService.getById).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.getById).toHaveBeenCalledWith(DATA_ACTIVITY, DATA_RN);
    });

    it('should call createFollowUpActivity method', function () {
      service.createFollowUpActivity(Mock.survey);
      expect(Injections.ActivityCollectionService.createFollowUpActivity).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.createFollowUpActivity).toHaveBeenCalledWith(Mock.survey);
    });

  });

  describe("createAutoFillActivity Suite Test", function () {
    beforeEach(function () {
      spyOn(Injections.ModuleService, "whenActivityFacadeServiceReady").and.callThrough();
    });

    it('should call createAutoFillActivity method', function () {
      Mock.survey.mode = "AUTOFILL";
      service.createAutoFillActivity(Mock.survey, Mock.user, Mock.participant, Mock.configuration, null);
      expect(Injections.ModuleService.whenActivityFacadeServiceReady).toHaveBeenCalledTimes(1);
    });

    it('should call createOnLineActivity method', function () {
      service.createOnLineActivity(Mock.survey, Mock.user, Mock.participant, Mock.configuration, null);
      expect(Injections.ModuleService.whenActivityFacadeServiceReady).toHaveBeenCalledTimes(1);
    });

    it('should call createPaperActivity method', function () {
      Mock.survey.mode = "PAPER";
      service.createPaperActivity(Mock.survey, Mock.user, Mock.participant, null, Mock.configuration, null);
      expect(Injections.ModuleService.whenActivityFacadeServiceReady).toHaveBeenCalledTimes(1);
    });

  });

  it('reopenActivity should call ActivityCollectionService reopenActivity method', function () {
    const ACTIVITY = {};
    spyOn(Injections.ActivityCollectionService, 'reopenActivity').and.returnValue(Mock.resolve);
    service.reopenActivity(ACTIVITY);
    expect(Injections.ActivityCollectionService.reopenActivity).toHaveBeenCalledTimes(1);
    expect(Injections.ActivityCollectionService.reopenActivity).toHaveBeenCalledWith(ACTIVITY);
  });

  it('getAllByStageGroup method should throw error with message select is not participant', function () {
    expect(service.getAllByStageGroup).toThrowError(UNINITIALIZED_REPOSITORY_ERROR_MESSAGE);
  });

  fit('discardActivity method should throw error with message select is not participant', function () {
    expect(service.discardActivity).toThrowError(UNINITIALIZED_REPOSITORY_ERROR_MESSAGE);
  });

  it('getAllByStageGroup should call ActivityCollectionService getAllByStageGroup method', function () {
    spyOn(Injections.ActivityCollectionService, 'getAllByStageGroup').and.returnValue(Mock.resolve);
    service.getAllByStageGroup(ID);
    expect(Injections.ActivityCollectionService.getAllByStageGroup).toHaveBeenCalledTimes(1);
    expect(Injections.ActivityCollectionService.getAllByStageGroup).toHaveBeenCalledWith(ID);
  });

  it('discardActivity should call ActivityCollectionService discardActivity method', function () {
    spyOn(Injections.ActivityCollectionService, 'discardActivity').and.returnValue(Mock.resolve);
    service.discardActivity(ID, DATA_RN);
    expect(Injections.ActivityCollectionService.discardActivity).toHaveBeenCalledTimes(1);
    expect(Injections.ActivityCollectionService.discardActivity).toHaveBeenCalledWith(ID, DATA_RN);
  });

  function mocks() {
    const deferredResolve = Injections.$q.defer();
    deferredResolve.resolve();
    Mock.resolve = deferredResolve.promise;

    const deferredReject = Injections.$q.defer();
    deferredReject.reject('some error');
    Mock.reject = deferredReject.promise;

    Mock.survey = Test.utils.data.activityPASC.surveyForm;
    Mock.configuration = {
      category: {
        disabled: false,
        isDefault: true,
        label: "Normal",
        name: "C0",
        objectType: "ActivityCategory"
      }
    };
    Mock.participant = Test.utils.data.activityPASC.participantData;
    Mock.externalID = "32432432";
    Mock.user = {
      email: "fulano@gmail.com",
      fieldCenter: {},
      name: "Fulano",
      phone: "5199999999",
      surname: "Sobrenome",
      token: "eyJhbGciOiJIUzI1NiJ9AOFIMAXXXX"
    };
  }

});

