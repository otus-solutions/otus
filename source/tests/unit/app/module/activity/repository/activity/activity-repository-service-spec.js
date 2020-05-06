describe('activity-repository-service Test', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var ID = "12345";
  var ACRONYM = "PASC";
  var VERSION = 1;
  var SURVEY_ACTIVITIES = [{}, {}];
  var DATA = { activityID: "54321" };
  var DATA_ACTIVITY = "54321";
  var DATA_RN = "0000000";
  var ACTIVITY_REVISION = { revision: DATA };

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    inject(function (_$injector_) {
      Injections = {
        "$q": _$injector_.get('$q'),
        ModuleService: _$injector_.get('otusjs.activity.core.ModuleService'),
        ActivityCollectionService: _$injector_.get('otusjs.activity.repository.ActivityCollectionService'),
        SurveyCollectionService: {}
      };

      service = _$injector_.get('otusjs.activity.repository.ActivityRepositoryService', Injections);
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
  });

  describe("activity revisions test", function () {
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
  })

  describe("activity import test", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityCollectionService, "importActivities").and.callThrough();
    });

    it('should call importActivities method', function () {
      service.importActivities(SURVEY_ACTIVITIES, ACRONYM, VERSION);
      expect(Injections.ActivityCollectionService.importActivities).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityCollectionService.importActivities).toHaveBeenCalledWith(SURVEY_ACTIVITIES, ACRONYM, VERSION);
    });

  });

  describe("activity test", function () {
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
      expect(Injections.ActivityCollectionService.createFollowUpActivity).toHaveBeenCalledWith([Mock.survey]);
    });

  });

  describe("activiteis create test", function () {
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

  })

  function mocks() {
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

