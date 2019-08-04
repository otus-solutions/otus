describe('LaboratoryMonitoringRestService', function () {
  var Mock = {};
  var service;
  var _rest = {};
  var Injections = {};
  var UNIT_NAME = 'otusjs.deploy.StaticVariableRestService';

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusjs.deploy.rest', function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });

    inject(function ($injector) {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get(UNIT_NAME, Injections);
    });
    spyOn(Injections.OtusRestResourceService, 'getStaticVariableResource');
  });

  it('serviceExistence check ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence check', function () {
    expect(service.initialize).toBeDefined();
    expect(service.getParticipantStaticVariable).toBeDefined();
  });

  it('initializeMethod should initialize the service', function () {
    service.initialize();
    expect(Injections.OtusRestResourceService.getStaticVariableResource).toHaveBeenCalled();
  });

  xit('getParticipantStaticVariableMethod should the service', function () {
    service.initialize();
    spyOn(Mock._rest, "getStaticVariableList");
    service.getParticipantStaticVariable(jasmine.anything());
    expect(Mock._rest.getStaticVariableList).toHaveBeenCalledTimes(1);
  });

  function mockInjections() {
    Mock._rest = {
      getStaticVariableList: function () {
        return {$promise: Promise.resolve({
            data: {
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
            }
          })
        }
      }
    };
    Mock.OtusRestResourceService = {
      getStaticVariableResource: function () {
        return Mock._rest;
      }
    }
  }
});
