describe('participant-activity-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  var ID = "12345";
  var DATA = {activityID: "54321"};
  var ACTIVITY_REVISION = {revision: DATA};

  beforeEach(function() {
    mocks();

    angular.mock.module('otusjs.otus');

    inject(function(_$injector_) {
      Injections.ModuleService = _$injector_.get('otusjs.activity.core.ModuleService');
      Injections.ContextService = _$injector_.get('otusjs.activity.core.ContextService');
      Injections.ActivityRepositoryService = _$injector_.get('otusjs.activity.repository.ActivityRepositoryService');
      Injections.UserRepositoryService = _$injector_.get('otusjs.activity.repository.UserRepositoryService');
      Injections.PreActivityFactory =  _$injector_.get('otusjs.activity.business.PreActivityFactory');
      Injections.ApplicationStateService = _$injector_.get('otusjs.application.state.ApplicationStateService');
      Injections.SurveyFormFactory = _$injector_.get('SurveyFormFactory');

      service = _$injector_.get('otusjs.activity.business.ParticipantActivityService', Injections);
    });
  });


  it('should create service', function() {
    expect(service).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
    expect(service.getById).toBeDefined();
    expect(service.createPreActivity).toBeDefined();
    expect(service.saveActivities).toBeDefined();
    expect(service.getSurveyFromJson).toBeDefined()
  });


  describe("activity revisions test", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityRepositoryService, "addActivityRevision").and.callThrough();
      spyOn(Injections.ActivityRepositoryService, "getActivityRevisions").and.callThrough();
      spyOn(Injections.ActivityRepositoryService, "getById").and.callThrough();
    });

    it('should call addActivityRevision method', function () {
      service.addActivityRevision(ID, DATA);
      expect(Injections.ActivityRepositoryService.addActivityRevision).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityRepositoryService.addActivityRevision).toHaveBeenCalledWith(ID, DATA);
    });

    it('should call getActivityRevisions method', function () {
      service.getActivityRevisions(ACTIVITY_REVISION, DATA);
      expect(Injections.ActivityRepositoryService.getActivityRevisions).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityRepositoryService.getActivityRevisions).toHaveBeenCalledWith(ACTIVITY_REVISION, DATA);
    });

    it('should call getById method', function () {
      service.getById(DATA);
      expect(Injections.ActivityRepositoryService.getById).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityRepositoryService.getById).toHaveBeenCalledWith(DATA);
    });
  });

  describe("create activity test", function () {
    beforeEach(function () {
      spyOn(Injections.ContextService, "getLoggedUser");
      spyOn(Injections.PreActivityFactory, "create");
      spyOn(Injections.SurveyFormFactory,"fromJsonObject").and.callThrough();
    });

    it('should call createPreActivity method', function () {
      service.createPreActivity(Mock.survey,Mock.configuration,Mock.mode);
      expect(Injections.ContextService.getLoggedUser).toHaveBeenCalledTimes(1);
      expect(Injections.PreActivityFactory.create).toHaveBeenCalledTimes(1);
      expect(Injections.PreActivityFactory.create).toHaveBeenCalledWith(Mock.survey,Mock.configuration,Mock.mode,Injections.ContextService.getLoggedUser());
    });

    it('should call saveActivities method', function () {
      spyOn(Injections.ActivityRepositoryService,"createOnLineActivity").and.returnValue(Promise.resolve(Mock.participant));
      spyOn(Injections.ContextService,"getSelectedParticipant").and.returnValue(Promise.resolve(Mock.participant));
      service.saveActivities([Mock.preActivity]);
      expect(Injections.ContextService.getSelectedParticipant).toHaveBeenCalledTimes(1);
    });

    it('should call saveActivities paperActivity method', function () {
      Mock.preActivity.mode = "PAPER";
      Mock.preActivity.paperActivityData = "2019-03-11T19:20:37.056Z";
      spyOn(Injections.ActivityRepositoryService,"createPaperActivity").and.returnValue(Promise.resolve(Mock.participant));
      spyOn(Injections.ContextService,"getSelectedParticipant").and.returnValue(Promise.resolve(Mock.participant));
      service.saveActivities([Mock.preActivity]);
      expect(Injections.ContextService.getSelectedParticipant).toHaveBeenCalledTimes(1);
    });

    it('should call getSurveyFromJson method', function () {
      service.getSurveyFromJson(Mock.preActivity);
      expect(Injections.SurveyFormFactory.fromJsonObject).toHaveBeenCalledTimes(1);
      expect(Injections.SurveyFormFactory.fromJsonObject).toHaveBeenCalledWith(Mock.preActivity);
    });
  });

  function mocks() {
    Mock.survey = Test.utils.data.activityPASC.surveyForm;
    Mock.mode = Test.utils.data.activityPASC.mode;
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
    Mock.configuration = {
      category: {
        disabled: false,
        isDefault: true,
        label: "Normal",
        name: "C0",
        objectType: "ActivityCategory"
      }
    };
    Mock.externalID = "32432432";
    Mock.user = {
      email: "fulano@gmail.com",
      fieldCenter: {},
      name: "Adonis",
      phone: "5199999999",
      surname: "Garcia",
      token: "eyJhbGciOiJIUzI1NiJ9AOFIMALEM"
    };
    Mock.preActivity = {
      configuration: Mock.configuration,
      externalID: Mock.externalID,
      mode: Mock.mode,
      objectType: "preActivity",
      paperActivityData: "",
      preActivityValid: true,
      surveyForm: Mock.survey,
      user: Mock.user
    };
  }
});
