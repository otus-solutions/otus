xdescribe('CrashReportService', function () {
  var service = {};
  var Injections = {};
  var Mock = {};

  beforeEach(angular.mock.module('otusjs.application.crash'));
  beforeEach(function () {
    inject(function ($injector, $window) {
      service = $injector.get('otusjs.application.crash.CrashReportService');
      mockStruture();
      /* Injections */
      mockInjections($injector, $window);
    });
  });

  describe('Teste Example', function () {
    it('Sempre TRUE', function () {
      expect(true).toBe(true);
    });
  });

  function mockStruture() { }

  function mockInjections($injector, $window) {
    Mock.$window = $window;
    Mock.CrashReportFactory = $injector.get('otusjs.application.crash.CrashReportFactory');
  }
});