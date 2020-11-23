describe('LaboratoryConfigurationService_Suite_Test', function () {
  var service;
  var Mock = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject( ($injector) => {
      Injections.$q = $injector.get('$q');
      Injections.LaboratoryRepositoryService = $injector.get('otusjs.laboratory.repository.LaboratoryRepositoryService');
      Injections.LaboratoryConfigurationService = $injector.get('otusjs.laboratory.configuration.LaboratoryConfigurationService');

      service = $injector.get('otusjs.laboratory.business.configuration.LaboratoryConfigurationService', Injections);
    });

    _mockInitialize();
  });


  it('check existence of service', function () {
    expect(service).toBeDefined();
  });

  it('check existence of methods', function () {
    expect(service.getCheckingExist).toBeDefined();
    expect(service.getLaboratoryDescriptors).toBeDefined();
    expect(service.fetchAliquotsDescriptors).toBeDefined();
    expect(service.getQualityControlGroupNames).toBeDefined();
    expect(service.getTubeMedataDataByType).toBeDefined();
  });

  it('getCheckingExist method should to call getCheckingExist method', function () {
    spyOn(Injections.LaboratoryRepositoryService, 'getCheckingExist').and.returnValue(Mock.resolve);
    service.getCheckingExist();
    expect(Injections.LaboratoryRepositoryService.getCheckingExist).toHaveBeenCalledTimes(1);
  });

  it('getTubeMedataDataByType method should to call getTubeMedataDataByType method', function () {
    spyOn(Injections.LaboratoryRepositoryService, 'getTubeMedataDataByType').and.returnValue(Mock.resolve);
    service.getTubeMedataDataByType(Mock.tube);
    expect(Injections.LaboratoryRepositoryService.getTubeMedataDataByType).toHaveBeenCalledTimes(1);
    expect(Injections.LaboratoryRepositoryService.getTubeMedataDataByType).toHaveBeenCalledWith(Mock.tube);
  });


  function _mockInitialize(){
    Mock.resolve = Promise.resolve({});
    Mock.resolve = Promise.reject('error');

    Mock.tube = {};
  }

});