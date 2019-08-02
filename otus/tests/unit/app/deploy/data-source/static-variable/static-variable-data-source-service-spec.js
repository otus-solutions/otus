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
      Injections.ParticipantManagerService =  $injector.get('otusjs.participant.business.ParticipantManagerService');

      service = $injector.get(UNIT_NAME, Injections);
    });

    spyOn(Injections.StaticVariableRestService, 'initialize');
    spyOn(Injections.ParticipantManagerService, 'getSelectedParticipante').and.returnValue(Mock.selectedParticipant);
    spyOn(Injections.StaticVariableRestService, 'getParticipantStaticVariable').and.callThrough();
  });

  it('controllerExistence check ', function () {
    expect(service).toBeDefined();
  });

  it('controllerMethodsExistence check', function () {
    expect(service.up).toBeDefined();
    expect(service.setup).toBeDefined();
  });

  it('upMethod should initialize the rest service', function () {
    expect(service.up()).toBePromise();
    expect(Injections.StaticVariableRestService.initialize).toHaveBeenCalled();
  });

  it('setupMethod should execute activityFacadeService', function () {
    expect(service.setup()).toBePromise();
    // expect(Injections.StaticVariableRestService.getParticipantStaticVariable).toHaveBeenCalledTimes(1)
  });

  function mock() {
    Mock.selectedParticipant = {
      recruitmentNumber: 32056510,
    };
  }

});
