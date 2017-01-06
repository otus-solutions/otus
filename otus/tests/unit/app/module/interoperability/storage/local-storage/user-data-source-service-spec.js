describe('otusjs.otus.interoperability.dataSource.UserDataSourceService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.dataSource.UserDataSourceService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      /* Injectable mocks */
      mockQ();
      mockUserRepositoryService(_$injector_);
      mockUserStorageService(_$injector_);
      mockLoginProxyService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('up method', function() {

    xit('should request a defer promise state', function() {
      service.up();

      expect(Mock.$q.defer).toHaveBeenCalledWith();
    });

    it('should initialize UserRepositoryService', function() {
      spyOn(Mock.UserRepositoryService, 'initialize');

      service.up();

      expect(Mock.UserRepositoryService.initialize).toHaveBeenCalledWith();
    });

    xit('should resolve loadingDefer', function() {
      service.up();

      expect(Mock.loadingDefer.resolve).toHaveBeenCalledWith();
    });

  });

  describe('authenticateUserData method', function() {

    it('should request user authentication', function() {
      var userData = {};
      spyOn(Mock.LoginProxyService, 'authenticate');

      service.authenticateUserData(userData);

      expect(Mock.LoginProxyService.authenticate).toHaveBeenCalledWith(userData);
    });

  });

  function mockQ() {
    Mock.loadingDefer = {};
    Mock.loadingDefer.promise = {};
    Mock.loadingDefer.resolve = jasmine.createSpy();

    Mock.$q = {};
    Mock.$q.defer = jasmine.createSpy().and.returnValue(Mock.loadingDefer);

    Injections.$q = Mock.$q;
  }

  function mockUserRepositoryService($injector) {
    Mock.UserRepositoryService = $injector.get('otusjs.otus.interoperability.rest.otusApi.UserRepositoryService');
    Injections.UserRepositoryService = Mock.UserRepositoryService;
  }

  function mockUserStorageService($injector) {
    Mock.UserStorageService = $injector.get('otusjs.user.storage.UserStorageService');
    Injections.UserStorageService = Mock.UserStorageService;
  }

  function mockLoginProxyService($injector) {
    Mock.LoginProxyService = $injector.get('otusjs.otus.interoperability.rest.otusApi.LoginProxyService');
    Injections.LoginProxyService = Mock.LoginProxyService;
  }

});
