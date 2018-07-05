describe('exception handler factory', function() {
  var Mock = {};
  var Injections= {};
  var factory;

  beforeEach(angular.mock.module('otusjs.application.crash'));

  beforeEach(function() {
    Mock.CrashReportService = {
      persistException: function() {},
      getCookie: function() { return true;}
    };

    angular.mock.module(function($provide) {
      $provide.value('otusjs.application.crash.CrashReportService', Mock.CrashReportService);
    });
  });

  beforeEach(function () {
    mockStruture();
    inject(function ($injector) {
      mockInjections($injector);
      Injections = {
        "$log": Mock.$log,
        "Service": Mock.CrashReportService
      };
      factory = $injector.get('$exceptionHandler', Injections);
    });
    spyOn(Mock.$log, 'error').and.callThrough();
    spyOn(Mock.CrashReportService, 'persistException').and.callThrough();
    factory(Mock.exception)
  });

  it('should capture exception', function() {
    expect(factory instanceof Function).toBeTruthy();
    expect(Mock.CrashReportService.persistException).toHaveBeenCalledTimes(1);
    expect(Mock.$log.error).toHaveBeenCalledTimes(1);
  });

  function mockInjections($injector) {
    Mock.$log = $injector.get('$log');
  }

  function mockStruture() {
    Mock.exception = {
      stack: 'Falha conexão',
      message: 'Fail Connection'
    };
  }


});