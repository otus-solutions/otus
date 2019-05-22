describe('activity-import-rest-service Test', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var originalTimeout;

  beforeEach(function () {
    mockInjections();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    angular.mock.module('otusjs.deploy.rest', function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });

    inject(function (_$injector_) {
      Injections = {
        $q: _$injector_.get('$q')
      };

      service = _$injector_.get('otusjs.deploy.ActivityImportRestService', Injections);
    });
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create a service', function() {
    expect(service).toBeDefined();
    expect(service.importActivities).toBeDefined();
  });

  describe("activity importation", function () {

    it('should return throw Error', function () {
      expect(function () {
        service.importActivities(jasmine.anything(), jasmine.anything());
      }).toThrowError('REST resource is not initialized.');
    });

    it('should import activities with response invalids', function () {
      service.initialize();
      spyOn(Mock.rest, "importActivities").and.returnValue({$promise: Promise.resolve({data:[{}]})})
      service.importActivities(jasmine.anything(), jasmine.anything());
      expect(Mock.rest.importActivities).toHaveBeenCalledTimes(1)
    });

    it('should import activities valids', function () {
      service.initialize();
      spyOn(Mock.rest, "importActivities").and.returnValue({$promise: Promise.resolve({data:[]})})
      service.importActivities(jasmine.anything(), jasmine.anything());
      expect(Mock.rest.importActivities).toHaveBeenCalledTimes(1)
    });

  });

  function mockInjections() {
    Mock.rest = {
      importActivities: function () {
        return {$promise: Promise.resolve({data:[{}]})};
      }
    };

    Mock.OtusRestResourceService = {
      getActivityImportationResource: function () {
        return Mock.rest;
      }
    }
  }

});
