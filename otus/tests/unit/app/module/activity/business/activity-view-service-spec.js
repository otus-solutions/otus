describe('activity-view-service Test', function () {
  var Mock = {};
  var service;
  var Injections = {};

  Mock.surveyActivities = [{}, {}];
  Mock.version = 1;

  beforeEach(function () {

    _mockData();

    angular.mock.module('otusjs.activity', function ($provide) {
      $provide.value('otusjs.deploy.SurveyRestService', {});
      $provide.value('otusjs.deploy.SurveyGroupRestService', {});
    });

    inject(function (_$injector_) {
      Injections = {
        ModuleService: _$injector_.get('otusjs.activity.core.ModuleService'),
        ContextService: _$injector_.get('otusjs.activity.core.ContextService'),
        ParticipantActivityService: _$injector_.get('otusjs.activity.business.ParticipantActivityService'),
      };
      service = _$injector_.get('otusjs.activity.business.ActivityViewService', Injections);
    });

    spyOn(Injections.ContextService, "getSelectedActivities").and.returnValue([{}]);
    spyOn(Injections.ContextService, "selectActivities");
    spyOn(Injections.ContextService, "setActivityToPlay");
    spyOn(Injections.ParticipantActivityService, "getById").and.returnValue(Promise.resolve([{}]));
    spyOn(Injections.ModuleService, "whenActivityFacadeServiceReady").and.returnValue(Promise.resolve(Mock.ActivityFacadeService));
    spyOn(Injections.ModuleService, "whenActivityPlayerServiceReady").and.returnValue(Promise.resolve(Mock.PlayerService));
    spyOn(Mock.ActivityFacadeService, "useActivity");
    spyOn(Mock.PlayerService, "setup");
  });

  describe('service step', function () {

    it('should define service', function () {
      expect(service).toBeDefined();
    });

    it('should to be defined methods', function () {
      expect(service.load).toBeDefined();
    });

  });

  describe('load method', function () {

    it('should execute load method', function (done) {
      service.load();
      expect(Injections.ContextService.getSelectedActivities).toHaveBeenCalledTimes(1);
      expect(Injections.ParticipantActivityService.getById).toHaveBeenCalledTimes(1);
      Injections.ParticipantActivityService.getById().then(function () {
        expect(Injections.ModuleService.whenActivityFacadeServiceReady).toHaveBeenCalledTimes(1);
        Injections.ModuleService.whenActivityFacadeServiceReady().then(function () {
          expect(Injections.ContextService.selectActivities).toHaveBeenCalledTimes(1);
          expect(Mock.ActivityFacadeService.useActivity).toHaveBeenCalledTimes(1);
          expect(Injections.ContextService.setActivityToPlay).toHaveBeenCalledTimes(1);
          done();
        });
        done();
      });
      done();
    });

  });

  function _mockData() {
    Mock.ActivityFacadeService = {
      useActivity: function () {
      },
      openSurveyActivity: function () {
      }
    };

    Mock.PlayerService = {
      setup: function () { }
    };
  }

});
