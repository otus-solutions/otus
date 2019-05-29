describe('activity-collection-service Test', function() {
  var Mock = {};
  var service;
  var originalTimeout;
  var Injections = {};

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
  });

  describe("activity revisions", function () {
    beforeEach(function () {
      spyOn(Injections.$q, "defer").and.returnValue({resolve:()=>{},reject:()=>{}});
      spyOn(Mock.remoteStorage, "addActivityRevision").and.callThrough();
      spyOn(Mock.remoteStorage, "getActivityRevisions").and.callThrough();
      spyOn(Mock.remoteStorage, "importActivities").and.callThrough();
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
      }
    }

    Mock.ModuleService = {
      getActivityRemoteStorage: function (){
        return {
          whenReady: () => {return Promise.resolve(Mock.remoteStorage)}
        }
      }
    };
  }

});
