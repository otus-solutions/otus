describe('ActivityRestService Suite Test', function () {
  let Mock = {};
  let service;
  let Injections = {};
  let originalTimeout;

  const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';
  const RN = 123;
  const ACTIVITY_ID = "1234567890";

  beforeEach(function () {
    mockInjections();
    mockData();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    angular.mock.module('otusjs.deploy.rest', function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });

    inject(function ($injector, $rootScope) {
      Injections = {
        $q: $injector.get('$q')
      };

      service = $injector.get('otusjs.deploy.ActivityRestService', Injections);

      Mock.$scope = $rootScope.$new();
    });
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create a service', function () {
    expect(service).toBeDefined();
    expect(service.initialize).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.list).toBeDefined();
    expect(service.save).toBeDefined();
    expect(service.updateCheckerActivity).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
    expect(service.getById).toBeDefined();
    expect(service.createFollowUpActivity).toBeDefined();
    expect(service.reopen).toBeDefined();
    expect(service.getAllByStageGroup).toBeDefined();
    expect(service.discardActivity).toBeDefined();
  });

  describe('Rest Not Initialized Suite Test', function () {
    it('update method should throw error with message resource is not initialized', function () {
      expect(service.update).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('list method should throw error with message resource is not initialized', function () {
      expect(service.list).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('save method should throw error with message resource is not initialized', function () {
      expect(service.save).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('remove method should throw error with message resource is not initialized', function () {
      expect(service.remove).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('updateCheckerActivity method should throw error with message resource is not initialized', function () {
      expect(service.updateCheckerActivity).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('addActivityRevision method should throw error with message resource is not initialized', function () {
      expect(service.addActivityRevision).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('getActivityRevisions method should throw error with message resource is not initialized', function () {
      expect(service.getActivityRevisions).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('getById method should throw error with message resource is not initialized', function () {
      expect(service.getById).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('createFollowUpActivity method should throw error with message resource is not initialized', function () {
      expect(service.createFollowUpActivity).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('reopen method should throw error with message resource is not initialized', function () {
      expect(service.reopen).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('getAllByStageGroup method should throw error with message resource is not initialized', function () {
      expect(service.getAllByStageGroup).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('discardActivity method should throw error with message resource is not initialized', function () {
      expect(service.discardActivity).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
    });
  });

  describe("Rest Initialized Suite Test", function () {
    beforeEach(function () {
      service.initialize();
    });

    it('update method should call rest update method', function () {
      spyOn(Mock.rest, "update").and.callThrough();
      service.update(Mock.data);
      expect(Mock.rest.update).toHaveBeenCalledTimes(1);
    });

    it('list method should call rest listAll method', function () {
      spyOn(Mock.rest, "listAll").and.callThrough();
      service.list(Mock.data);
      expect(Mock.rest.listAll).toHaveBeenCalledTimes(1);
    });

    it('list method should call rest listAll method that return response with no data attribute', function () {
      _mockRestMethodWithoutData('listAll');
      spyOn(Mock.rest, "listAll").and.callThrough();
      service.list(Mock.data);
      expect(Mock.rest.listAll).toHaveBeenCalledTimes(1);
    });

    it('save method should call rest crate method', function () {
      spyOn(Mock.rest, "create").and.callThrough();
      service.save(Mock.data);
      expect(Mock.rest.create).toHaveBeenCalledTimes(1);
    });

    it('remove method should call rest remove method', function () {
      spyOn(Mock.rest, "remove").and.callThrough();
      service.remove(Mock.data);
      expect(Mock.rest.remove).toHaveBeenCalledTimes(1);
    });

    it('updateCheckerActivity method should call rest update method', function () {
      spyOn(Mock.rest, "updateCheckerActivity").and.callThrough();
      service.updateCheckerActivity(Mock.data);
      expect(Mock.rest.updateCheckerActivity).toHaveBeenCalledTimes(1);
    });

    it('addActivityRevision method should create activity revision', function () {
      spyOn(Mock.rest, "addActivityRevision").and.callThrough();
      service.addActivityRevision({}, Mock.data);
      expect(Mock.rest.addActivityRevision).toHaveBeenCalledTimes(1);
    });

    it('getActivityRevisions method should return activity revision', function (done) {
      spyOn(Mock.rest, "getActivityRevisions").and.callThrough();
      service.getActivityRevisions({}, Mock.data);
      expect(Mock.rest.getActivityRevisions).toHaveBeenCalledTimes(1);
      Mock.rest.getActivityRevisions().$promise.then(function () {
        done();
      });
      done();
    });

    it('getById method should return activity with surveyTemplate', function (done) {
      spyOn(Mock.rest, "getById").and.callThrough();
      service.getById(Mock.data);
      expect(Mock.rest.getById).toHaveBeenCalledTimes(1);
      Mock.rest.getById().$promise.then(function () {
        done();
      });
      done();
    });

    it('createFollowUp method should call followUpRest createFollowUpActivity', function () {
      spyOn(Mock.rest, "createFollowUpActivity").and.callThrough();
      service.createFollowUpActivity(Mock.data);
      expect(Mock.rest.createFollowUpActivity).toHaveBeenCalledTimes(1);
    });

    it('reopen method should call update method', function () {
      spyOn(Mock.rest, "update").and.callThrough();
      service.reopen(Mock.data);
      expect(Mock.rest.update).toHaveBeenCalledTimes(1);
    });

    it('getAllByStageGroup method should call getAllByStageGroup method', function () {
      spyOn(Mock.rest, "getAllByStageGroup").and.callThrough();
      service.getAllByStageGroup(Mock.data);
      expect(Mock.rest.getAllByStageGroup).toHaveBeenCalledTimes(1);
    });

    it('discardActivity method should call discard method', function () {
      spyOn(Mock.rest, "discard").and.callThrough();
      service.discardActivity(Mock.data);
      expect(Mock.rest.discard).toHaveBeenCalledTimes(1);
    });

  });

  function _mockRestMethodWithoutData(restMethod) {
    Mock.OtusRestResourceService[restMethod] = function () {
      return { $promise: Promise.resolve({}) };
    };
  }


  function mockInjections() {
    Mock.rest = {
      update: function () {
        return { $promise: true };
      },
      listAll: function () {
        return { $promise: Promise.resolve({ data: [] }) };
      },
      create: function () {
        return { $promise: true };
      },
      remove: function () {
        return { $promise: true };
      },
      updateCheckerActivity: function () {
        return { $promise: true };
      },
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
      },
      getAllByStageGroup: function () {
        return { $promise: true };
      },
      discard: function () {
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
        recruitmentNumber: RN
      },
      _id: ACTIVITY_ID,
      getID: function () {
        return ACTIVITY_ID;
      }
    }
  }

});
