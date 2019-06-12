describe('CrashLocalStorageService Suite Test', function () {

  const ERROR_DATA = {'name': 'otus_bugtracker','data':[{'exception': 'Opa!!!', 'cause': 'Error: Opa!!!'}]};

  var service;
  var Mock = {};

  beforeEach(function () {
    angular.mock.module('otusjs.application.crash');

    mockData();

    angular.mock.inject(function ($injector) {
      service = $injector.get('otusjs.application.crash.CrashLocalStorageService');
    });

    spyOn(service, 'initialize').and.callThrough();
    spyOn(service, 'insert').and.callThrough();
    spyOn(service, 'find').and.callThrough();
    spyOn(service, 'remove').and.callThrough();
    spyOn(service, 'clear').and.callThrough();
    spyOn(service, 'count').and.callThrough();
    spyOn(service, 'getCollectionError').and.callThrough();

    service.initialize(Mock.collection,Mock.db);
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
    expect(service.initialize).toHaveBeenCalledTimes(1);
    expect(service.initialize).toHaveBeenCalledWith(Mock.collection,Mock.db);
  });

  it('insertMethod should to call insert of CrashLocalStorageService', function () {
    service.insert(ERROR_DATA);
    expect(service.insert).toHaveBeenCalledTimes(1);
  });

  it('findMethod should to call find of CrashLocalStorageService', function () {
    service.find();
    expect(service.find).toHaveBeenCalledTimes(1);
  });

  it('getErrorListMethod should to call getErrorList of CrashReportService', function () {
    service.getCollectionError();
    expect(service.getCollectionError).toHaveBeenCalledTimes(1);
  });

  it('removeMethod should to call remove of CrashReportService', function () {
    service.remove(ERROR_DATA);
    expect(service.remove).toHaveBeenCalledTimes(1);
  });

  it('clearMethod should to call clear of CrashReportService', function () {
    service.clear();
    expect(service.clear).toHaveBeenCalledTimes(1);
  });

  it('countMethod should to call count of CrashReportService', function () {
    service.count();
    expect(service.count).toHaveBeenCalledTimes(1);
  });

  function mockData() {
    Mock.collection = {
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
    };

    Mock.db = {
      saveDatabase: function () {
      }
    };
  }
});