describe('activity-rest-service Test', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var originalTimeout;
  let UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';

  beforeEach(function () {
    mockInjections();
    mockData();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    angular.mock.module('otusjs.deploy.rest', function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });

    inject(function (_$injector_) {
      Injections = {
        $q: _$injector_.get('$q')
      };

      service = _$injector_.get('otusjs.deploy.ActivityRestService', Injections);
    });
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create a service', function () {
    expect(service).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
    expect(service.createFollowUpActivity).toBeDefined();
  });

  describe("activity", function () {
    beforeEach(function () {
      service.initialize();
      spyOn(Mock.rest, "addActivityRevision").and.callThrough();
      spyOn(Mock.rest, "getActivityRevisions").and.callThrough();
      spyOn(Mock.rest, "createFollowUpActivity").and.callThrough();
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

    it('should createFollowUp activity', function () {
      service.createFollowUpActivity(Mock.data);
      expect(Mock.rest.createFollowUpActivity).toHaveBeenCalledTimes(1)
    });

  });

  it('addActivityRevision method should throw error with message resource is not initialized', function () {
    expect(service.addActivityRevision).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('getActivityRevisions method should throw error with message resource is not initialized', function () {
    expect(service.getActivityRevisions).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('createFollowUpActivity method should throw error with message resource is not initialized', function () {
    expect(service.createFollowUpActivity).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  it('getById method should throw error with message resource is not initialized', function () {
    expect(service.getById).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
  });

  describe("activity", function () {
    beforeEach(function () {
      service.initialize();
      spyOn(Mock.rest, "getById").and.callThrough();
    });

    it('should return activity with surveyTemplate', function (done) {
      service.getById(Mock.data);
      expect(Mock.rest.getById).toHaveBeenCalledTimes(1);
      Mock.rest.getById().$promise.then(function () {
        done();
      });
      done();
    });
  });

  function mockInjections() {
    Mock.rest = {
      addActivityRevision: function () {
        return { $promise: true };
      },
      getActivityRevisions: function () {
        return { $promise: Promise.resolve({ data: [] }) };
      },
      getById: function () {
        return { $promise: Promise.resolve({ data: [] }) };
      },
      createFollowUpActivity: function () {
        return { $promise: true };
      }
    };

    Mock.OtusRestResourceService = {
      getActivityResource: function () {
        return Mock.rest;
      },
      getFollowUpResourceFactory: function () {
        return Mock.rest;
      }
    }
  }

  function mockData() {
    Mock.data = {
      participantData: {
        recruitmentNumber: 123
      },
      getID: function () {
        return "1234567890";
      }
    }
  }

});
