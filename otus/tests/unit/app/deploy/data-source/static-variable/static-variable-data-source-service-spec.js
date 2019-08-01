fdescribe('StaticVariableDataSourceRequestFactory', function () {
  var Mock = {};
  var Injections = {};
  var service;
  var UNIT_NAME = 'otusjs.deploy.staticVariable.StaticVariableDataSourceService';

  beforeEach(function () {
    angular.mock.module('otusjs.deploy.staticVariable');


    inject(function (_$injector_) {
      mock(_$injector_);
      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });
  describe('the up method', function () {
    beforeEach(function () {
      spyOn(Injections.StaticVariableRestService, 'initialize');
    });
    it('should initialize the rest service', function () {
      service.up();
      expect(Injections.StaticVariableRestService.initialize).toHaveBeenCalled();
    })
  });


  function mock($injector) {
    Injections.$q = {
      defer:function(){}
    };

    Injections.StaticVariableRestService = {
      initialize: function () {
      },
      getParticipantStaticVariable: function (request) {
      }
    };

    Mock.selectedParticipant = {
      recruitmentNumber: 32056510
    };

    Injections.ParticipantManagerService = {
      getSelectedParticipante: function () {
        return Mock.selectedParticipant;
      }
    };

    Injections.StaticVariableDataSourceRequestFactory = $injector.get('otusjs.deploy.staticVariable.StaticVariableDataSourceRequestFactory');
  }

});
