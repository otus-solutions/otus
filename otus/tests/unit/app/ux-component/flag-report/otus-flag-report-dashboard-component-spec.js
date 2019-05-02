describe('otusFlagReportDashboardCtrl Test', function () {
  var Mock = {};
  var controller;
  var Injections = {};
  var FLAG_REPORT = "flag-report";

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) { });

    inject(function (_$controller_) {
      Injections = {};

      controller = _$controller_('otusFlagReportDashboardCtrl', Injections);
    });
  });

  describe('onInit method', () => {
    beforeEach(() => {
      spyOn(controller, '$onInit').and.callThrough();

      controller.$onInit();
    });

    it('should onInit be defined', () => {
      expect(controller.$onInit).toHaveBeenCalled();
      expect(controller.ready).toBeDefined();
    });

    it('should initialize variables', () => {
      expect(controller.ready).toBe(false);
    });

  });

  describe('buildLaboratoryFlagReport method', () => {
    beforeEach(() => {
      spyOn(controller, '$onInit').and.callThrough();

      controller.$onInit();
    });

    it('should to assign true in variable ready', () => {
      controller.buildLaboratoryFlagReport();

      expect(controller.ready).toBe(true);
    });

  });

  function mockInjections() { }

});
