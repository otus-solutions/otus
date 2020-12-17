describe('tusReportDashboardCtrl_UnitTest_Suite', function () {

  let Mock = {};
  let Injections = [];
  let controller = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    mock();

    angular.mock.inject(function ($injector, $controller) {
      Injections.EventService = $injector.get('otusjs.otus.dashboard.core.EventService');
      Injections.DashboardService = $injector.get('otusjs.otus.dashboard.service.DashboardService');
      Injections.ParticipantReportWidgetFactory = $injector.get('otusjs.report.business.ParticipantReportWidgetFactory');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');

      controller = $controller('ReportDashboardCtrl', Injections);
    });
  });

  it('controller existence check', function () {
    expect(controller).toBeDefined();
  });

  it('should verify properties definition', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.$onDestroy).toBeDefined();
    expect(controller.generateReport).toBeDefined();
  });

  describe('Methods Suite Test', function () {

    beforeEach(function () {
      spyOn(Injections.EventService, "onParticipantSelected").and.callThrough();
      spyOn(Injections.ParticipantLaboratoryService, "getCheckingExist").and.returnValue(Promise.resolve());
      spyOn(Injections.LoadingScreenService, "changeMessage").and.callThrough();
      spyOn(Injections.LoadingScreenService, "start").and.callThrough();
      spyOn(Injections.LoadingScreenService, "finish");
    });

    it('onInitMethod should initialized the controller methods', function () {
      controller.$onInit();
      expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
      expect(Injections.ParticipantLaboratoryService.getCheckingExist).toHaveBeenCalledTimes(1);
      expect(controller.selectedParticipant).toBe(null);
    });

    it('generateReportMethod should call methods LoadingScreenService', function () {
      controller.generateReport(Mock.report);
      expect(Injections.LoadingScreenService.changeMessage).toHaveBeenCalledTimes(1);
      expect(Injections.LoadingScreenService.start).toHaveBeenCalledTimes(1);
      expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
    });
  });

  function mock() {
    Mock.report = {
      getLoadingMessage : function () { return },
      generateReport: function (initializedFunction) {
        initializedFunction();
       }
    }
  }

});
