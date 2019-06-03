describe('LaboratoryConfigurationService Test', function () {

  var service;
  var Mock = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.laboratory.business.configuration');
  });

  beforeEach(function () {
    Mock.LaboratoryRepositoryService = {
      getCheckingExist: function () {
      },
      getLaboratoryDescriptors: function () {
      },
      getAliquotsDescriptors: function () {
      }
    };

    Mock.LaboratoryConfigurationService = {
      checkLaboratoryConfiguration: function () {
      },
      checkAliquotsDescriptors: function () {
      },
      initializeLaboratoryConfiguration: function () {
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratory.repository.LaboratoryRepositoryService', Mock.LaboratoryRepositoryService);
      $provide.value('otusjs.laboratory.configuration.LaboratoryConfigurationService', Mock.LaboratoryConfigurationService);
    });
  });

  beforeEach(function () {
    angular.mock.inject(function ($injector, $q) {
      Injections = { "$q": $q };
      service = $injector.get('otusjs.laboratory.business.configuration.LaboratoryConfigurationService', Injections);
      spyOn(Mock.LaboratoryRepositoryService, 'getCheckingExist').and.returnValue(Promise.resolve({}));
    });
  });

  it('check existence of service', function () {
    expect(service).toBeDefined();
  });

  it('check existence of methods', function () {
    expect(service.getCheckingExist).toBeDefined();
    expect(service.getLaboratoryDescriptors).toBeDefined();
    expect(service.fetchAliquotsDescriptors).toBeDefined();
  });

  it('getCheckingExist method should to call getCheckingExist method', function () {
    service.getCheckingExist();

    expect(Mock.LaboratoryRepositoryService.getCheckingExist).toHaveBeenCalledTimes(1);
  });

});