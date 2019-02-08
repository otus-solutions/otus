describe('activity-remote-storage-service Test', function() {
    var Mock = {};
    var service;
    var Injections = {};
    var DATA = {activity:{}};
    var ACTIVITY_REVISION = {};
    var ACTIVITY_ID = 123;

    beforeEach(function() {
      mockInjections();
      angular.mock.module('otusjs.deploy.storage', function ($provide) {
        $provide.value('otusjs.deploy.ActivityRestService', Mock.ActivityRestService);
        $provide.value('otusjs.deploy.ActivityConfigurationRestService', {});
      });

      inject(function(_$injector_) {
        Injections = {
          $q: _$injector_.get('$q')
        };
        service = _$injector_.get('otusjs.deploy.ActivityRemoteStorageService', Injections);
      });
    });

    it('should create a service', function() {
        expect(service).toBeDefined();
        expect(service.addActivityRevision).toBeDefined();
        expect(service.getActivityRevisions).toBeDefined();
    });

    describe("activity revision", function () {
      beforeEach(function () {
        spyOn(Mock.ActivityRestService, "addActivityRevision").and.callThrough();
        spyOn(Mock.ActivityRestService, "getActivityRevisions").and.callThrough();
      });

      it('should create a activity revision', function () {
        service.addActivityRevision(ACTIVITY_REVISION, DATA);
        expect(Mock.ActivityRestService.addActivityRevision).toHaveBeenCalledTimes(1);
        expect(Mock.ActivityRestService.addActivityRevision).toHaveBeenCalledWith(ACTIVITY_REVISION, DATA);
      });

      it('should create a activity revision', function () {
        service.getActivityRevisions(ACTIVITY_ID, DATA);
        expect(Mock.ActivityRestService.getActivityRevisions).toHaveBeenCalledTimes(1);
        expect(Mock.ActivityRestService.getActivityRevisions).toHaveBeenCalledWith(ACTIVITY_ID, DATA);

      });
    });

    function mockInjections() {
      Mock.ActivityRestService = {
        addActivityRevision: function () {
          return Promise.resolve();
        },
        getActivityRevisions: function () {
          return Promise.resolve();
        }
      }
    }

});
