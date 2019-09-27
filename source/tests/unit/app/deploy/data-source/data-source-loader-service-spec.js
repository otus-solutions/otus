describe('DataSourceLoaderService_Test_Suite', function () {
  var service;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(function ($injector) {
      Injections.$q = $injector.get('$q');
      Injections.ActivityDataSourceService = $injector.get('otusjs.deploy.ActivityDataSourceService');
      Injections.ParticipantDataSourceService = $injector.get('otusjs.deploy.ParticipantDataSourceService');
      Injections.UserDataSourceService = $injector.get('otusjs.deploy.UserDataSourceService');
      Injections.SurveyItemDatasourceService= $injector.get('otusjs.deploy.SurveyItemDatasourceService');
      Injections.FileUploadDatasourceService = $injector.get('otusjs.deploy.FileUploadDatasourceService');
      Injections.StaticVariableDataSourceService = $injector.get('otusjs.deploy.staticVariable.StaticVariableDataSourceService');

      service = $injector.get('otusjs.deploy.DataSourceLoaderService', Injections);
      Mock.deferred = Injections.$q.defer();
      Mock.deferred.resolve({data: true});

      spyOn(Injections.ActivityDataSourceService, "up").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.ParticipantDataSourceService, "up").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.UserDataSourceService, "up").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.SurveyItemDatasourceService, "up").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.FileUploadDatasourceService, "up").and.returnValue(Mock.deferred.promise);
      spyOn(Injections.StaticVariableDataSourceService, "up").and.returnValue(Mock.deferred.promise);
    });
  });

  it('serviceExistenceCheck ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistenceCheck', function () {
    expect(service.initializeDataSources).toBeDefined();
  });

  it('initializeDataSourcesMethod_should_return_promise', function () {
    expect(service.initializeDataSources()).toBePromise();
  });

  it('test_should_check_servicePromisesResolutions', function () {
    service.initializeDataSources();
    expect(Injections.ActivityDataSourceService.up).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantDataSourceService.up).toHaveBeenCalledTimes(1);
    expect(Injections.UserDataSourceService.up).toHaveBeenCalledTimes(1);
    expect(Injections.SurveyItemDatasourceService.up).toHaveBeenCalledTimes(1);
    expect(Injections.FileUploadDatasourceService.up).toHaveBeenCalledTimes(1);
    expect(Injections.StaticVariableDataSourceService.up).toHaveBeenCalledTimes(1);
  });
});