describe('activity-player-service Test', function () {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function () {
    mockData();
    angular.mock.module('otusjs.otus');

    inject(function (_$injector_) {
      Injections = {
        ParticipantActivityService: _$injector_.get('otusjs.activity.business.ParticipantActivityService'),
        ModuleService: _$injector_.get('otusjs.activity.core.ModuleService'),
        ContextService: _$injector_.get('otusjs.activity.core.ContextService')
      };

      service = _$injector_.get('otusjs.activity.business.ActivityPlayerService', Injections);
    });

    spyOn(Injections.ContextService, "getSelectedActivities").and.returnValue([{}]);
    spyOn(Injections.ContextService, "selectActivities");
    spyOn(Injections.ContextService, "setActivityToPlay");
    spyOn(Injections.ParticipantActivityService, "getById").and.returnValue(Promise.resolve([{}]));
    spyOn(Injections.ModuleService, "whenActivityFacadeServiceReady").and.returnValue(Promise.resolve(Mock.ActivityFacadeService));
    spyOn(Injections.ModuleService, "whenActivityPlayerServiceReady").and.returnValue(Promise.resolve(Mock.PlayerService));
    spyOn(Mock.ActivityFacadeService, "useActivity");
    spyOn(Mock.ActivityFacadeService, "openSurveyActivity");
    spyOn(Mock.PlayerService, "setup");
  });

  it('should create service', function () {
    expect(service).toBeDefined();
    expect(service.load).toBeDefined();
  });

  it('should execute load method', function (done) {
    service.load();
    expect(Injections.ContextService.getSelectedActivities).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantActivityService.getById).toHaveBeenCalledTimes(1);
    Injections.ParticipantActivityService.getById().then(function () {
      expect(Injections.ModuleService.whenActivityFacadeServiceReady).toHaveBeenCalledTimes(1);
      Injections.ModuleService.whenActivityFacadeServiceReady().then(function () {
        expect(Injections.ContextService.selectActivities).toHaveBeenCalledTimes(1);
        expect(Mock.ActivityFacadeService.useActivity).toHaveBeenCalledTimes(1);
        expect(Mock.ActivityFacadeService.openSurveyActivity).toHaveBeenCalledTimes(1);
        expect(Injections.ContextService.setActivityToPlay).toHaveBeenCalledTimes(1);
        expect(Injections.ModuleService.whenActivityPlayerServiceReady).toHaveBeenCalledTimes(1);
        Injections.ModuleService.whenActivityPlayerServiceReady().then(function () {
          expect(Mock.PlayerService.setup).toHaveBeenCalledTimes(1);
          done();
        });
        done();
      });
      done();
    });
    done();
  });


  function mockData() {
    Mock.ActivityFacadeService = {
      useActivity: function () {
      },
      openSurveyActivity: function () {
      }
    };

    Mock.PlayerService = {
      setup: function () {}
    };
  }

});
