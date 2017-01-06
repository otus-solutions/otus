xdescribe('otusjs.user.business.UserRepositoryService', function() {

  var UNIT_NAME = 'otusjs.user.business.UserRepositoryService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.user');

    inject(function(_$injector_) {
      /* Test data */
      mockDataSource();

      /* Injectable mocks */
      mockModuleEventsService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('connectTo method', function() {

    it('should try to up the data source of users', function() {
      service.connectTo(Mock.dataSource);

      expect(Mock.dataSource.up).toHaveBeenCalledWith();
    });

    it('should get user indexers from data source', function() {
      service.connectTo(Mock.dataSource);

      expect(Mock.dataSource.listIndexers).toHaveBeenCalledWith();
    });

    it('should notify that user indexers were loaded', function() {
      service.connectTo(Mock.dataSource);

      expect(Mock.ModuleEventsService.fireUserIndexersLoaded).toHaveBeenCalledWith(Mock.indexers);
    });

  });

  describe('authenticateUserData method', function() {

    it('should try to up the data source of users', function() {
      service.connectTo(Mock.dataSource);

      expect(Mock.dataSource.up).toHaveBeenCalledWith();
    });

  });

  function mockDataSource() {
    Mock.promise = {};
    Mock.promise.then = jasmine.createSpy().and.callFake(function() {
      arguments[0]();
    });

    Mock.indexers = [];
    Mock.dataSource = {};
    Mock.dataSource.up = jasmine.createSpy().and.returnValue(Mock.promise);
    Mock.dataSource.listIndexers = jasmine.createSpy().and.returnValue(Mock.indexers);
  }

  function mockModuleEventsService($injector) {
    Mock.ModuleEventsService = $injector.get('otusjs.user.core.EventService');
    spyOn(Mock.ModuleEventsService, 'fireUserIndexersLoaded');
    Injections.ModuleEventsService = Mock.ModuleEventsService;
  }
});
