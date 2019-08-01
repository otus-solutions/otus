describe('LaboratoryMonitoringRestService', function () {
  var Mock = {};
  var service;
  var _rest = {};
  var Injections = {};
  var UNIT_NAME = 'otusjs.deploy.StaticVariableRestService';

  beforeEach(function () {
    angular.mock.module('otusjs.deploy.rest');

    inject(function (_$injector_) {
      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

});
