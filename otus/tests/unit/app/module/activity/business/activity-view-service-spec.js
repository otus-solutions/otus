describe('activity-view-service Test', function () {
  var Mock = {};
  var service;
  var Injections = {};

  Mock.surveyActivities = [{}, {}];
  Mock.version = 1;

  beforeEach(function () {

    angular.mock.module('otusjs.activity', function ($provide) {
      $provide.value('otusjs.deploy.SurveyRestService', {});
      $provide.value('otusjs.deploy.SurveyGroupRestService', {});
    });

    inject(function (_$injector_) {
      Injections = {
        ModuleService: _$injector_.get('otusjs.activity.core.ModuleService'),
        ContextService: _$injector_.get('otusjs.activity.core.ContextService')
      };
      service = _$injector_.get('otusjs.activity.business.ActivityViewService', Injections);
    });

    spyOn(Injections.ModuleService, "whenActivityFacadeServiceReady").and.callThrough();
    spyOn(Injections.ContextService, "getSelectedActivities");
    spyOn(Injections.ContextService, "getLoggedUser");
    spyOn(Injections.ContextService, "setActivityToView");
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

    it('should call whenActivityFacadeServiceReady method', function () {
      service.load();

      expect(Injections.ModuleService.whenActivityFacadeServiceReady).toHaveBeenCalledTimes(1);
    });

    it('when called should call getSelectedActivities method', function () {
      service.load();

      Injections.ModuleService.whenActivityFacadeServiceReady().then(function () {
        expect(Injections.ContextService.getSelectedActivities).toHaveBeenCalledTimes(1);
      });
    });

    it('when called should call setActivityToView method', function () {
      service.load();

      Injections.ModuleService.whenActivityFacadeServiceReady().then(function () {
        expect(Injections.ContextService.setActivityToView).toHaveBeenCalledTimes(1);
      });
    });

  });

});
