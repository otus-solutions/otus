describe('CrashReportService', function () {
  const NUMBER = [1];

  var service = {};
  var Injection = [];
  var Mock = {};

  beforeEach(function () {
    angular.mock.module('otusjs.application.crash');

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
      Mock.errorData = {maxId:500,'name': 'otus_bugtracker','data':[{'exception': 'Opa!!!', 'cause': 'Error: Opa!!!'}]};;

    // angular.mock.module(function ($provide){
    //   $provide.value('otusjs.application.crash.CrashReportService',Mock.CrashReportService);
    // });

    angular.mock.inject(function ($injector) {
      Injection.CrashReportFactory = $injector.get('otusjs.application.crash.CrashReportFactory');
      Injection.CrashLocalStorageService = $injector.get('otusjs.application.crash.CrashLocalStorageService');
      service = $injector.get('otusjs.application.crash.CrashReportService',Injection);
      spyOn(Injection.CrashLocalStorageService, 'insert');
      spyOn(Injection.CrashLocalStorageService, 'find');

      spyOn(Injection.CrashLocalStorageService, 'remove');
      spyOn(Injection.CrashLocalStorageService, 'clear');
      spyOn(Injection.CrashReportFactory, 'create').and.callThrough();
    });
  });

  it('serviceExistence',function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence ', function () {
    expect(service.persistException).toBeDefined();
    expect(service.getErrorList).toBeDefined();
  });

  it('persistExceptionMethod should to call evoke internalMethods', function () {
    spyOn(Injection.CrashLocalStorageService, 'count').and.returnValue(28);
    service.persistException(Mock.exception);
    expect(Injection.CrashLocalStorageService.count).toHaveBeenCalledTimes(1);
    expect(Injection.CrashLocalStorageService.insert).toHaveBeenCalledTimes(1);
  });

  it('persistExceptionMethod should to call evoke internalMethods of false', function () {
    spyOn(Injection.CrashLocalStorageService, 'count').and.returnValue(31);
    spyOn(Injection.CrashLocalStorageService, 'getCollectionError').and.returnValue({idIndex:[{},{}]});

    service.persistException(Mock.exception);
    expect(Injection.CrashLocalStorageService.count).toHaveBeenCalledTimes(1);
    expect(Injection.CrashLocalStorageService.getCollectionError).toHaveBeenCalledTimes(2);
    expect(Injection.CrashLocalStorageService.remove).toHaveBeenCalledTimes(1);
  });

  it('getErrorListMethod should to call persistException evoke internalMethods', function () {
    spyOn(Injection.CrashLocalStorageService, 'getCollectionError').and.returnValue({maxId:500});

    service.getErrorList();
    expect(Injection.CrashLocalStorageService.getCollectionError).toHaveBeenCalledTimes(2);
    // expect(Injection.CrashLocalStorageService.clear).toHaveBeenCalledTimes(1);
  });

});