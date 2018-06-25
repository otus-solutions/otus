describe('MonitoringCollectionService', function () {
  var UNIT_NAME = 'otusjs.monitoring.repository.MonitoringCollectionService';
  var Mock = {};
  var Injections = {};
  var service = {};
  var scope;

  beforeEach(function () {
    angular.mock.module('otusjs.otus.monitoring', function ($provide) {
      $provide.value('ReportRestService', function () {

      }());
    });
  });
  beforeEach(function () {

    inject(function (_$rootScope_, _$q_, _$injector_) {
      scope = _$rootScope_;
      mockUtils();

      // Injections
      mockInjections(_$injector_, _$q_);
      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  //Factory Tests
  describe('the ', function () {
    it('a', function () {
      console.log(service);
    });
  });


  //-----Mock Functions

  function mockInjections($injector, $q) {
    Mock.ModuleService = $injector.get('otusjs.monitoring.core.ModuleService');
    Mock.MonitoringLocalStorageService = $injector.get('otusjs.monitoring.storage.MonitoringLocalStorageService');
    Mock.$q = $q;

    Injections.$q = Mock.$q;
    Injections.ModuleService = Mock.ModuleService;
    Injections.MonitoringLocalStorageService = Mock.MonitoringLocalStorageService;


  }

  function mockModuleService() {
    return function(){
      this.getMonitoringRemoteStorage = function(){
        return {};
      };
    };
  }

  function mockUtils() {

  }

});
