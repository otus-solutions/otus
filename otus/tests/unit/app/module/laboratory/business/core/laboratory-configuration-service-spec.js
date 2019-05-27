xdescribe('LaboratoryConfigurationService', function () {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.laboratory.business.configuration');
  });

  beforeEach(function () {
    Mock.$q = {
      defer: function () {
        promise = {};
      }
    };

    Mock.LaboratoryRepositoryService = {
      getCheckingExist: function () {
        return Promise.resolve([
          {
            "groups": [],
            "objectType": "SurveyGroupPermission"
          },
          {
            "access": false,
            "objectType": "LaboratoryPermission"
          }
        ]);
      },
      getLaboratoryDescriptors: function () {
      },
      getAliquotsDescriptors: function () {
      }
    };

    Mock.LaboratoryConfigurationService = {
      checkAliquotsDescriptors: function () {
      },
      initializeLaboratoryConfiguration: function () {
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('$q', Mock.$q);
      $provide.value('otusjs.laboratory.repository.LaboratoryRepositoryService', Mock.LaboratoryRepositoryService);
      $provide.value('otusjs.laboratory.configuration.LaboratoryConfigurationService', Mock.LaboratoryConfigurationService);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {

      Injections = {
        $q: _$injector_.get('$q'),
        LaboratoryRepositoryService: _$injector_.get('otusjs.laboratory.repository.LaboratoryRepositoryService'),
        LaboratoryConfigurationService: _$injector_.get('otusjs.laboratory.configuration.LaboratoryConfigurationService')
      };

      service = _$injector_.get('otusjs.laboratory.business.configuration.LaboratoryConfigurationService', Injections);
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
