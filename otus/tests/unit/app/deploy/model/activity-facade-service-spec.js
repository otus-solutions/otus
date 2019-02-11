describe('activity-facade-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function() {
    mockInjections();
    angular.mock.module('otusjs.deploy.model.otus', function ($provide) {
      $provide.value('otusjs.model.activity.ActivityFacadeService', Mock.ActivityFacadeService);
    });

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.deploy.model.ActivityFacadeService');
    });
  });

  it('should create a service', function() {
    expect(service).toBeDefined();
    expect(service.createActivityRevision).toBeDefined();
    expect(service.getActivityRevisions).toBeDefined();
  });

  describe("activity revision", function () {
    beforeEach(function () {
      spyOn(Mock.ActivityFacadeService, "createActivityRevision").and.callThrough();
      spyOn(Mock.ActivityFacadeService, "createActivityRevisionFromJson").and.callThrough();
    });

    it('should create activity revision', function () {
      service.createActivityRevision(123, {});
      expect(Mock.ActivityFacadeService.createActivityRevision).toHaveBeenCalledTimes(1);
      expect(Mock.ActivityFacadeService.createActivityRevision).toHaveBeenCalledWith(123, {})
    });

    it('should get activity revisions', function () {
      service.getActivityRevisions({});
      expect(Mock.ActivityFacadeService.createActivityRevisionFromJson).toHaveBeenCalledTimes(1);
      expect(Mock.ActivityFacadeService.createActivityRevisionFromJson).toHaveBeenCalledWith({})
    });

  });

  function mockInjections() {
    Mock.ActivityFacadeService = {
      createActivityRevision: ()=>{},
      createActivityRevisionFromJson: ()=>{}
    }
  }

});
