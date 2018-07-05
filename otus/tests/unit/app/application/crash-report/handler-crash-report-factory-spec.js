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

    Mock.exceptionHandler = function(){
      return function (exception) {
        console.error(exception);
      };
    };

    angular.mock.module(function($provide) {
      $provide.value('otusjs.application.crash.CrashReportService', Mock.CrashReportService);
      $provide.value('$exceptionHandler', {});
    });
  });

  beforeEach(function () {
    inject(function ($injector) {
      mockInjections($injector);
      Injections = {
        "$log": Mock.$log,
        "Service": Mock.CrashReportService
      };
      factory = $injector.get('$exceptionHandler', Injections);
      console.log(factory);
    });
    spyOn(Mock.CrashReportService, 'persistException').and.callThrough();
    //TODO: AVALIAR
    throw true;
  });

  it('should capture exception', function() {
    expect(Mock.CrashReportService.persistException).toHaveBeenCalledTimes(1);
  });



  function mockInjections($injector) {
    Mock.$log = $injector.get('$log');
  }


});