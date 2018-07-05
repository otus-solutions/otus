describe('CrashReportService', function () {
  var service = {};
  var Injections = {};
  var Mock = {};

  beforeEach(angular.mock.module('otusjs.application.crash'));
  beforeEach(function () {
    inject(function ($injector, $window) {
      mockInjections($injector, $window);
      Injections = {
        "$window" : Mock.$window,
        "CrashReportFactory": Mock.CrashReportFactory
      }
      service = $injector.get('otusjs.application.crash.CrashReportService', Injections);
      mockStruture();

    });
  });

  describe('persist exceptions test', function () {
    var _cookies;
    beforeEach(function() {
      spyOn(service, 'persistException').and.callThrough();
      spyOn(service, 'getCookie').and.callThrough();
      service.persistException(Mock.exception);
      service.persistException(Mock.exception);
      service.persistException(Mock.exception2);
      service.persistException(Mock.exception2);
    });
    it('should get a cookie errors', function () {
      _cookies = service.getCookie();
      expect(service.persistException).toHaveBeenCalledWith(Mock.exception);
      expect(service.persistException).toHaveBeenCalledWith(Mock.exception2);
      expect(service.persistException).toHaveBeenCalledTimes(4);

      expect(service.getCookie).toHaveBeenCalled();
      expect(service.getCookie).toHaveBeenCalledTimes(1);

      expect(_cookies.length).toBeGreaterThan(0);
      // expect(_cookies.length).toEqual(2);
      _cookies.forEach(function(cookie) {
        expect(cookie.exception).not.toBeNull();
        expect(cookie.cause).not.toBeNull();
        expect(cookie.url).not.toBeNull();
        expect(cookie.date).not.toBeNull();
        expect(cookie.browserOnline).not.toBeNull();
        expect(cookie.browserName).not.toBeNull();
        expect(cookie.browserVersion).not.toBeNull();
        expect(cookie.cookiesEnabled).not.toBeNull();
        expect(cookie.plataform).not.toBeNull();
      });
    });
  });

  function mockStruture() {
    Mock.exception = {
      stack: 'Falha conexão',
      message: 'Fail Connection'
    };
    Mock.exception2 = {
      stack: 'Falha browser',
      message: 'Fail Browser'
    };
  }

  function mockInjections($injector, $window) {
    Mock.$window = $window;
    Mock.CrashReportFactory = $injector.get('otusjs.application.crash.CrashReportFactory');
  }
});