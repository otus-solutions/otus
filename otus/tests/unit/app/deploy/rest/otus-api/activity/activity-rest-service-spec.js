describe('activity-rest-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  var originalTimeout;

  beforeEach(function() {
    mockInjections();
    mockData();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    angular.mock.module('otusjs.deploy.rest', function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });

    inject(function(_$injector_) {
      Injections = {
        $q: _$injector_.get('$q')
      };

      service = _$injector_.get('otusjs.deploy.ActivityRestService', Injections);
      service.initialize();
    });
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create a service', function() {
    expect(service).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
  });

  describe("activity revision", function () {
    beforeEach(function () {
      spyOn(Mock.rest, "addActivityRevision").and.callThrough();
      spyOn(Mock.rest, "getActivityRevisions").and.callThrough();
    })

    it('should create activity revision', function () {
      service.addActivityRevision({}, Mock.data);
      expect(Mock.rest.addActivityRevision).toHaveBeenCalledTimes(1)
    });

    it('should return activity revision', function (done) {
      service.getActivityRevisions({}, Mock.data);
      expect(Mock.rest.getActivityRevisions).toHaveBeenCalledTimes(1);
      Mock.rest.getActivityRevisions().$promise.then(function () {
        done();
      });
      done();
    });
  });

  function mockInjections() {
    Mock.rest = {
      addActivityRevision: function () {
        return {$promise: true};
      },
      getActivityRevisions: function () {
        return {$promise: Promise.resolve({data:[]})};
      }
    };

    Mock.OtusRestResourceService = {
      getActivityResource: function () {
        return Mock.rest;
      }
    }
  }

  function mockData() {
    Mock.data = {
      participantData: {
        recruitmentNumber: 123
      }
    }
  }

});
