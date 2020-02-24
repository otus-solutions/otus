describe('activity-facade-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function() {
    mocks();
    angular.mock.module('otusjs.otus');

    inject(function(_$injector_) {
      Injections.ActivityFacadeService = _$injector_.get('otusjs.model.activity.ActivityFacadeService');
      service = _$injector_.get('otusjs.deploy.model.ActivityFacadeService', Injections);
    });
  });

  it('should create a service', function() {
    expect(service).toBeDefined();
    expect(service.createActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
    expect(service.createActivity).toBeDefined();
  });

  describe("activity revision", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityFacadeService, "createActivityRevision").and.callThrough();
      spyOn(Injections.ActivityFacadeService, "createActivityRevisionFromJson").and.callThrough();
    });

    it('should create activity revision', function () {
      service.createActivityRevision(123, {});
      expect(Injections.ActivityFacadeService.createActivityRevision).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityFacadeService.createActivityRevision).toHaveBeenCalledWith(123, {})
    });

    it('should get activity revisions', function () {
      service.getActivityRevisions([Mock.activityRevisionFromJson]);
      expect(Injections.ActivityFacadeService.createActivityRevisionFromJson).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityFacadeService.createActivityRevisionFromJson).toHaveBeenCalledWith([Mock.activityRevisionFromJson])
    });
  });

  describe("create activity", function () {
    beforeEach(function () {
      spyOn(Injections.ActivityFacadeService, "createActivity");
      spyOn(Injections.ActivityFacadeService, "createPaperActivity");
    });

    it('should create activity online', function () {
      service.createActivity(Mock.template,Mock.user,Mock.participant,null,Mock.configuration,Mock.externalID);
      expect(Injections.ActivityFacadeService.createActivity).toHaveBeenCalledTimes(1);
    });

    it('should create activity paper', function () {
      service.createActivity(Mock.template,Mock.user,Mock.participant,true,Mock.configuration,Mock.externalID);
      expect(Injections.ActivityFacadeService.createPaperActivity).toHaveBeenCalledTimes(1);
    });
  });

  function mocks() {
    Mock.activityRevisionFromJson = {
      objectType : 'ActivityRevision',
      activityID : '5a33cb4928f10d1043710f55',
      revisionDate: '2017-07-06T21:01:11.416Z',
      user: null
    };

    Mock.template = Test.utils.data.activityPASC.surveyForm;
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
    }

  }
});
