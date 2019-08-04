describe('StaticVariableDataSourceRequestService', function () {
  var Mock = {};
  var Injections = {};
  var service;
  var UNIT_NAME = 'otusjs.deploy.staticVariable.StaticVariableDataSourceService';

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    inject(function ($injector) {
      mock();
      Injections.$q = $injector.get('$q');
      Injections.StaticVariableRestService = $injector.get('otusjs.deploy.StaticVariableRestService');
      Injections.StaticVariableDataSourceRequestFactory = $injector.get('otusjs.deploy.staticVariable.StaticVariableDataSourceRequestFactory');

      service = $injector.get(UNIT_NAME, Injections);
    });

    spyOn(Injections.StaticVariableRestService, 'initialize');
  });

  it('serviceExistence check ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence check', function () {
    expect(service.up).toBeDefined();
    expect(service.setup).toBeDefined();
  });

  it('upMethod should initialize the rest service', function () {
    expect(service.up()).toBePromise();
    expect(Injections.StaticVariableRestService.initialize).toHaveBeenCalled();
  });

  it('setupMethod should execute activityFacadeService', function () {
    expect(service.setup(Mock.ActivityFacadeService)).toBePromise();
  });

  function mock() {
    Mock.selectedParticipant = {
      recruitmentNumber: 32056510,
    };
    Mock.ActivityFacadeService  = {
      getCurrentSurvey: function () {
        return Promise.resolve();
      },
      getSurvey: function () {
        return function getStaticVariableList(){Promise.resolve([])};
      }
    }
  }

});
