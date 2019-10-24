describe('FileUploadDatasourceService_Test_Suite', function () {
  var service;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector,  $rootScope) {
      Injections.$q = $injector.get('$q');
      Injections.FileUploadService = $injector.get('otusjs.utils.FileUploadFactory');
      Injections.FileUploadRestService = $injector.get('otusjs.deploy.FileUploadRestService');

      service = $injector.get('otusjs.deploy.FileUploadDatasourceService', Injections);
      Mock.scope = $rootScope.$new();
    });
  });

  it('serviceExistenceCheck', function () {
    expect(service).toBeDefined();
  });
  it('serviceMethodsExistenceCheck', function () {
    expect(service.up).toBeDefined();
    expect(service.setupUploader).toBeDefined();
  });

  it('upMethod_should_return_promiseResolved_after_boot_FileUploadRestService ', function () {
    spyOn(Injections.FileUploadRestService, "initialize");
    service.up().then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
    expect(Injections.FileUploadRestService.initialize).toHaveBeenCalledTimes(1);
  });

  it('setupUploaderMethod_should_return_promise_resolved_after_setUploadInterface_of_FileUploadService_has_been_approved', function () {
    var deffered = Injections.$q.defer();
    deffered.resolve(true);
    spyOn(Injections.FileUploadService, "setUploadInterface").and.returnValue(deffered.promise);
    service.setupUploader().then(data => expect(data).toBeTruthy());
    Mock.scope.$digest();
  });
});