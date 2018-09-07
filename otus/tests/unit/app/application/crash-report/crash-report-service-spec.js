fdescribe('CrashReportService', function () {
  var service = {};
  var Injections = {};
  var Mock = {};

  beforeEach(angular.mock.module('otusjs.application.crash'));
  beforeEach(function () {
    inject(function ($injector, $window) {
      mockInjections($injector, $window);
      Injections = {
        "$window": Mock.$window,
        "CrashReportFactory": Mock.CrashReportFactory
      };

      service = $injector.get('otusjs.application.crash.CrashReportService', Injections);
      mockStruture();
    });
  });

  describe('persist exceptions test', function () {
    var _cookies;
    beforeEach(function () {
      spyOn(service, 'persistException').and.callThrough();
      spyOn(service, 'getErrorList').and.callThrough();
      service.persistException(Mock.exception);
      service.persistException(Mock.exception);
      service.persistException(Mock.exception2);
      service.persistException(Mock.exception2);
    });
    it('should get a cookie errors', function () {
      _cookies = service.getErrorList();
      expect(service.persistException).toHaveBeenCalledWith(Mock.exception);
      expect(service.persistException).toHaveBeenCalledWith(Mock.exception2);
      expect(service.persistException).toHaveBeenCalledTimes(4);

      expect(service.getErrorList).toHaveBeenCalled();
      expect(service.getErrorList).toHaveBeenCalledTimes(1);

      expect(_cookies.length).toBeGreaterThan(0);
      _cookies.forEach(function (cookie) {
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

  xdescribe('the cookies overflow control', function () {

    it('should start removing old cookies when inserting new ones', function () {

      service.clearCookiesPool();

      var overflow = false;

      for (var errorNumber = 1; !overflow; errorNumber++) {
        Mock.exception.message = String(errorNumber);


        console.log(errorNumber);

        if (service.getErrorList().length < errorNumber) {
          overflow = true;
        } else {
          service.persistException(Mock.exception);
        }
      }

      var oldestError = angular.copy(JSON.parse(service.getErrorList()[0]));
      expect(oldestError.exception).toEqual(String(1));

      // Mock.exception.message = String(errorNumber);
      // service.persistException(Mock.exception);
      //
      // var newOldestError = JSON.parse(service.getErrorList()[0]);
      // expect(newOldestError.exception).toEqual(String(2));
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