describe('otusFlagReportDashboardCtrl Test', function () {
  var Mock = {};
  var controller;
  var Injections = {};
  var FLAG_REPORT = "flag-report";

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
      $provide.value("STATE", Mock.STATE);
      $provide.value("otusjs.application.state.ApplicationStateService", Mock.ApplicationStateService);
    });

    inject(function (_$controller_) {
      Injections = {
        STATE: Mock.STATE,
        ApplicationStateService: Mock.ApplicationStateService
      };

      controller = _$controller_('otusFlagReportDashboardCtrl', Injections);
    });
  });

  describe('Current State in flag dashboard', function () {
    beforeEach(function () {
      spyOn(Mock.ApplicationStateService, "getCurrentState").and.returnValue(FLAG_REPORT);
      spyOn(Mock.ApplicationStateService, "activateFlagsReportManager").and.callThrough();
      controller.$onInit();
    });

    it('should call method activateFlagsReportManager', function () {
      expect(Mock.ApplicationStateService.activateFlagsReportManager).toHaveBeenCalled();
      expect(Mock.ApplicationStateService.activateFlagsReportManager).toHaveBeenCalledTimes(1);
    });
  });

  describe('Current State not in flag dashboard', function () {
    beforeEach(function () {
      spyOn(Mock.ApplicationStateService, "getCurrentState").and.returnValue("");
      spyOn(Mock.ApplicationStateService, "activateFlagsReportManager").and.callThrough();
      controller.$onInit();
    });

    it('should call method activateFlagsReportManager', function () {
      expect(Mock.ApplicationStateService.activateFlagsReportManager).not.toHaveBeenCalled();
      expect(Mock.ApplicationStateService.activateFlagsReportManager).toHaveBeenCalledTimes(0);
    });
  });


  function mockInjections() {
    Mock.STATE = {
      FLAG_DASHBOARD: FLAG_REPORT
    };
    Mock.ApplicationStateService = {
      getCurrentState: () => { },
      activateFlagsReportManager: () => { }
    }
  }

});
