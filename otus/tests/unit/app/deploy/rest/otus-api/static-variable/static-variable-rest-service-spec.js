describe('StaticVariableRestService', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var UNIT_NAME = 'otusjs.deploy.StaticVariableRestService';

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusjs.otus');

    inject(function ($injector) {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get(UNIT_NAME, Injections);

    });
  });

  it('serviceExistence check ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence check', function () {
    expect(service.initialize).toBeDefined();
    expect(service.getParticipantStaticVariable).toBeDefined();
  });

  it('initializeMethod should initialize the service', function () {
    spyOn(Injections.OtusRestResourceService, 'getStaticVariableResource');
    service.initialize();
    expect(Injections.OtusRestResourceService.getStaticVariableResource).toHaveBeenCalled();
  });

  it('getParticipantStaticVariableMethod should execute the service list StaticVariable', function () {
    spyOn(Injections.OtusRestResourceService, 'getStaticVariableResource').and.returnValue(Mock._rest);
    service.initialize();
    expect(service.getParticipantStaticVariable(Mock.data)).toBePromise();
  });

  it('getParticipantStaticVariableMethod should execute the throw error', function () {
    spyOn(Injections.OtusRestResourceService, 'getStaticVariableResource').and.returnValue(false);
    service.initialize();
    expect(service.getParticipantStaticVariable).toThrowError("REST resource is not initialized.");
  });

  function mockInjections() {
    Mock.data = {
        variables:[
          {
            name: "var1",
            sending: "onda 1",
            value: 0
          },
          {
            name: "var2",
            sending: "onda 2",
            value: "30Kg"
          }
        ]
    };
    Mock._rest = {
      getStaticVariableList: function (data) {
        return {$promise: Promise.resolve(data)};
      }
    };
  }
});
