describe('CrashReportService', function () {
  const NUMBER = [1];

  var service = {};
  var Mock = {};

  beforeEach(function () {
    angular.mock.module('otusjs.application.crash');
  });
  beforeEach(function () {
    Mock.CrashReportService = {
      persistException: function () {
      },
      getErrorList: function () {
      }
    },
      Mock.exception = {
        stack: 'Falha conexão',
        message: 'Fail Connection'
      },
      Mock.errorData = {'name': 'otus_bugtracker','data':[{'exception': 'Opa!!!', 'cause': 'Error: Opa!!!'}]};;

    angular.mock.module(function ($provide){
      $provide.value('otusjs.application.crash.CrashReportService',Mock.CrashReportService);
    });
  });

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      service = $injector.get('otusjs.application.crash.CrashReportService');
      spyOn(Mock.CrashReportService, 'persistException').and.returnValue(Promise.resolve(Mock.exception));
      spyOn(Mock.CrashReportService, 'getErrorList').and.returnValue(Promise.resolve(Mock.errorData));
    });
  });

  it('serviceExistence',function () {
    expect(service).toBeDefined();
  })

  it('serviceMethodsExistence ', function () {
    expect(service.persistException).toBeDefined();
    expect(service.getErrorList).toBeDefined();
  });

  it('persistExceptionMethod should to call persistException of CrashReportService', function () {
    service.persistException(Mock.exception);
    expect(service.persistException).toHaveBeenCalledTimes(1);
    expect(Mock.CrashReportService.persistException).toHaveBeenCalledWith(Mock.exception);
  });

  it('getErrorListMethod should to call persistException of CrashReportService ', function () {
    service.getErrorList(Mock.errorData);
    expect(Mock.CrashReportService.getErrorList).toHaveBeenCalledTimes(1);
    expect(Mock.CrashReportService.getErrorList).toHaveBeenCalledWith(Mock.errorData);
  });

});