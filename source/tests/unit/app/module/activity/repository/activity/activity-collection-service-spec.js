describe('activity-collection-service Test', function() {
  var Mock = {};
  var service;
  var originalTimeout;
  var Injections = {};

  const ACTIVITY_ID = "123";
  const RN = 12345;

  beforeEach(function() {
    mockData();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    angular.mock.module('otusjs.activity', function ($provide) {
      $provide.value('otusjs.activity.core.ModuleService', Mock.ModuleService)
    });

    inject(function(_$injector_) {
      Injections = {
        $q: _$injector_.get('$q'),
        ModuleService: _$injector_.get('otusjs.activity.core.ModuleService'),
        ActivityStorageService: _$injector_.get('otusjs.activity.storage.ActivityLocalStorageService')
      };

      service = _$injector_.get('otusjs.activity.repository.ActivityCollectionService', Injections);
    });
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create a service', function() {
    expect(service).toBeDefined();
    expect(service.addActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
    expect(service.getAllByStageGroup).toBeDefined();
    expect(service.discardActivity).toBeDefined();
  });

  describe("activity", function () {
    beforeEach(function () {
      spyOn(Injections.$q, "defer").and.returnValue({resolve:()=>{},reject:()=>{}});
      spyOn(Mock.remoteStorage, "addActivityRevision").and.callThrough();
      spyOn(Mock.remoteStorage, "getActivityRevisions").and.callThrough();
      spyOn(Mock.remoteStorage, "importActivities").and.callThrough();
      spyOn(Mock.remoteStorage, "getById").and.callThrough();
      spyOn(Mock.remoteStorage, "createFollowUpActivity").and.callThrough();
      spyOn(Mock.remoteStorage, 'getAllByStageGroup').and.callThrough();
      spyOn(Mock.remoteStorage, 'discardActivity').and.callThrough();
    });

    it('should create activity revision', function (done) {
      service.addActivityRevision({},{});
      Injections.ModuleService.getActivityRemoteStorage().whenReady().then(function (remoteStorage) {
        expect(Mock.remoteStorage.addActivityRevision).toHaveBeenCalledTimes(1);
        expect(Mock.remoteStorage.addActivityRevision).toHaveBeenCalledWith({}, {});
        remoteStorage.addActivityRevision().then(function () {
          done();
        });
        done();
      });
      done();
    });

    it('should return activity revisions', function (done) {
      service.getActivityRevisions({},{});
      Injections.ModuleService.getActivityRemoteStorage().whenReady().then(function (remoteStorage) {
        expect(Mock.remoteStorage.getActivityRevisions).toHaveBeenCalledTimes(1);
        expect(Mock.remoteStorage.getActivityRevisions).toHaveBeenCalledWith({}, {});
        remoteStorage.getActivityRevisions().then(function () {
          done();
        });
        done();
      });
      done();
    });

    it('should import activities', function (done) {
      service.importActivities([{}],"PASC", 1);
      Injections.ModuleService.getActivityRemoteStorage().whenReady().then(function (remoteStorage) {
        expect(Mock.remoteStorage.importActivities).toHaveBeenCalledTimes(1);
        expect(Mock.remoteStorage.importActivities).toHaveBeenCalledWith([{}], "PASC", 1);
        remoteStorage.importActivities().then(function () {
          done();
        });
        done();
      });
      done();
    });

    it('should get activity by ID', function (done) {
      service.getById({},{});
      Injections.ModuleService.getActivityRemoteStorage().whenReady().then(function (remoteStorage) {
        expect(Mock.remoteStorage.getById).toHaveBeenCalledTimes(1);
        expect(Mock.remoteStorage.getById).toHaveBeenCalledWith({},{});
        remoteStorage.getById().then(function () {
          done();
        });
        done();
      });
      done();
    });

    it('should createFollowUpActivity by Activity', function (done) {
      service.createFollowUpActivity({});
      Injections.ModuleService.getActivityRemoteStorage().whenReady().then(function (remoteStorage) {
        expect(Mock.remoteStorage.createFollowUpActivity).toHaveBeenCalledTimes(1);
        expect(Mock.remoteStorage.createFollowUpActivity).toHaveBeenCalledWith({});
        remoteStorage.createFollowUpActivity().then(function () {
          done();
        });
        done();
      });
      done();
    });

    it('getAllByStageGroup method should return remoteStorage getAllByStageGroup result', (done) => {
      expect(service.getAllByStageGroup(ACTIVITY_ID)).toBePromise();

      Injections.ModuleService.getActivityRemoteStorage().whenReady().then(function (remoteStorage) {
        expect(Mock.remoteStorage.getAllByStageGroup).toHaveBeenCalledTimes(1);
        expect(Mock.remoteStorage.getAllByStageGroup).toHaveBeenCalledWith(ACTIVITY_ID);
        remoteStorage.getAllByStageGroup().then(function () {
          done();
        });
        done();
      });
      done();
    });

    it('discardActivity method should return remoteStorage discardActivity result', (done) => {
      service.discardActivity(ACTIVITY_ID, RN);

      Injections.ModuleService.getActivityRemoteStorage().whenReady().then(function (remoteStorage) {
        expect(Mock.remoteStorage.discardActivity).toHaveBeenCalledTimes(1);
        expect(Mock.remoteStorage.discardActivity).toHaveBeenCalledWith(ACTIVITY_ID, RN);
        remoteStorage.discardActivity().then(function () {
          done();
        });
        done();
      });
      done();
    });

  });

  function mockData() {

    Mock.remoteStorage = {
      addActivityRevision: function () {
        return Promise.resolve();
      },
      getActivityRevisions: function () {
        return Promise.resolve();
      },
      importActivities: function () {
        return Promise.resolve();
      },
      getById: function () {
        return Promise.resolve();
      },
      createFollowUpActivity: function () {
        return Promise.resolve();
      },
      getAllByStageGroup: function () {
        return Promise.resolve();
      },
      discardActivity: function () {
        return Promise.resolve();
      }
    };

    Mock.ModuleService = {
      getActivityRemoteStorage: function (){
        return {
          whenReady: () => {return Promise.resolve(Mock.remoteStorage)}
        }
      }
    };
  }

});
