xdescribe('MonitoringCollectionService', function () {
  var UNIT_NAME = 'otusjs.monitoring.repository.MonitoringCollectionService';
  var Mock = {};
  var Injections = {};
  var service = {};
  var scope;

  mockRemoteStorage();
  mockModuleService();

  beforeEach(function () {
    angular.mock.module('otusjs.otus.monitoring', function ($provide) {
      $provide.value('otusjs.monitoring.core.ModuleService', Mock.ModuleService);
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
      spyOn(Mock.RemoteStorage, "find").and.returnValue(Promise.resolve('a'));
      spyOn(Mock.MonitoringLocalStorageService, "find").and.returnValue([]);

      Mock.ModuleService.getMonitoringRemoteStorage().whenReady().then(function () {
        console.log('mds')
      });

      service.find({acronym: 'acronym'});

      expect(Mock.RemoteStorage.find).toHaveBeenCalledWith('acronym');
    });

  });


  //-----Mock Functions
  function mockInjections($injector, $q) {
    Mock.MonitoringLocalStorageService = $injector.get('otusjs.monitoring.storage.MonitoringLocalStorageService');
    Mock.$q = $q;

    Injections.$q = Mock.$q;
    Injections.ModuleService = Mock.ModuleService;
    Injections.MonitoringLocalStorageService = Mock.MonitoringLocalStorageService;
  }

  function mockModuleService() {
    Mock.ModuleService = {
      getMonitoringRemoteStorage: function () {
        return {
          whenReady: function () {
            return Promise.resolve(Mock.RemoteStorage);
          }
        };
      }
    };
  }

  function mockRemoteStorage() {
    Mock.RemoteStorage = {
      listAcronyms: function () {
        return Promise.resolve('result');
      },
      listCenters: function () {
        return Promise.resolve('result');
      },
      find: function (acronym) {
        return Promise.resolve('result');
      }
    };

    return Mock.RemoteStorage;
  }

  function mockUtils() {

  }

});
