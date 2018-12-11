describe('CrashLocalStorageService Suite Test', function () {

  const ERROR_DATA = {'name': 'otus_bugtracker','data':[{'exception': 'Opa!!!', 'cause': 'Error: Opa!!!'}]};
  const COLLECTION = {};
  const DB = null;
  const TOTAL_DATA = 1;

  var service;
  var Mock = {};

  beforeEach(function () {
    angular.mock.module('otusjs.application.crash');
  });

  beforeEach(function () {
    Mock.CrashLocalStorageService = {
      initialize: function () {
      },
      insert: function () {
      },
      find: function () {
      },
      count: function () {
      },
      remove: function () {
      },
      clear: function () {
      },
      getCollectionError: function () {
      }
    }

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.application.crash.CrashLocalStorageService', Mock.CrashLocalStorageService);
    });
  });

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      service = $injector.get('otusjs.application.crash.CrashLocalStorageService');
      spyOn(Mock.CrashLocalStorageService, 'initialize').and.returnValue(Promise.resolve(COLLECTION,DB));
      spyOn(Mock.CrashLocalStorageService, 'insert').and.returnValue(Promise.resolve(ERROR_DATA));
      spyOn(Mock.CrashLocalStorageService, 'find').and.returnValue(Promise.resolve(ERROR_DATA));
      spyOn(Mock.CrashLocalStorageService, 'remove').and.returnValue(Promise.resolve(ERROR_DATA));
      spyOn(Mock.CrashLocalStorageService, 'clear').and.returnValue(Promise.resolve(ERROR_DATA));
      spyOn(Mock.CrashLocalStorageService, 'count').and.returnValue(Promise.resolve(TOTAL_DATA));
      spyOn(Mock.CrashLocalStorageService, 'getCollectionError').and.returnValue(Promise.resolve(ERROR_DATA));
    });
  });

  it('serviceExistence', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence', function () {
    expect(service.initialize).toBeDefined();
    expect(service.insert).toBeDefined();
    expect(service.find).toBeDefined();
    expect(service.count).toBeDefined();
    expect(service.remove).toBeDefined();
    expect(service.clear).toBeDefined();
    expect(service.getCollectionError).toBeDefined();
  });

  it('initializeMethod should to call initialize of CrashLocalStorageService', function () {
    service.initialize(COLLECTION,DB);
    expect(Mock.CrashLocalStorageService.initialize).toHaveBeenCalledTimes(1);
    expect(Mock.CrashLocalStorageService.initialize).toHaveBeenCalledWith(COLLECTION,DB);
  });

  it('insertMethod should to call insert of CrashLocalStorageService', function () {
    service.insert(ERROR_DATA);
    expect(Mock.CrashLocalStorageService.insert).toHaveBeenCalledTimes(1);
    expect(Mock.CrashLocalStorageService.insert).toHaveBeenCalledWith(ERROR_DATA);
  });

  it('findMethod should to call find of CrashLocalStorageService', function () {
    service.find(ERROR_DATA);
    expect(Mock.CrashLocalStorageService.find).toHaveBeenCalledTimes(1);
    expect(Mock.CrashLocalStorageService.find).toHaveBeenCalledWith(ERROR_DATA);
  });

  it('getErrorListMethod should to call getErrorList of  CrashReportService', function () {
    service.getCollectionError(ERROR_DATA);
    expect(Mock.CrashLocalStorageService.getCollectionError).toHaveBeenCalledTimes(1);
    expect(Mock.CrashLocalStorageService.getCollectionError).toHaveBeenCalledWith(ERROR_DATA);
  });

  it('removeMethod should to call remove of  CrashReportService', function () {
    service.remove(ERROR_DATA);
    expect(Mock.CrashLocalStorageService.remove).toHaveBeenCalledTimes(1);
    expect(Mock.CrashLocalStorageService.remove).toHaveBeenCalledWith(ERROR_DATA);
  });

  it('clearMethod should to call clear of  CrashReportService', function () {
    service.clear(ERROR_DATA);
    expect(Mock.CrashLocalStorageService.clear).toHaveBeenCalledTimes(1);
    expect(Mock.CrashLocalStorageService.clear).toHaveBeenCalledWith(ERROR_DATA);
  });

  it('countMethod should to call count of  CrashReportService', function () {
    service.count(TOTAL_DATA);
    expect(Mock.CrashLocalStorageService.count).toHaveBeenCalledTimes(1);
    expect(Mock.CrashLocalStorageService.count).toHaveBeenCalledWith(TOTAL_DATA);
  });

});