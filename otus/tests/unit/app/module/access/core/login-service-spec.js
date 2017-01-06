describe('otusjs.user.access.service.LoginService', function() {

  var UNIT_NAME = 'otusjs.user.access.service.LoginService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      /* Test data */
      mockUserData();

      /* Injectable mocks */
      mockUserCollectionService(_$injector_);
      mockAccessContextService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('authenticate method', function() {

    describe('when user is authenticated', function() {

      var authenticationData = {};

      beforeEach(function() {
        authenticationData.hasErrors = false;
        authenticationData.data = {};

        var promise = {};
        promise.then = jasmine.createSpy().and.callFake(function() {
          arguments[0](authenticationData);
        });

        spyOn(Mock.UserCollectionService, 'authenticateUserData').and.returnValue(promise);
        spyOn(Mock.AccessContextService, 'beginSession');
      });

      it('should call UserCollectionService.authenticateUserData', function() {
        service.authenticate(Mock.userData);

        expect(Mock.UserCollectionService.authenticateUserData).toHaveBeenCalledWith(Mock.userData);
      });

      it('should call AccessContextService.beginSession', function() {
        service.authenticate(Mock.userData);

        expect(Mock.AccessContextService.beginSession).toHaveBeenCalledWith(authenticationData.data);
      });

    });

    describe('when user is not authenticated', function() {

      var authenticationData = {};

      beforeEach(function() {
        authenticationData.hasErrors = true;

        var promise = {};
        promise.then = jasmine.createSpy().and.callFake(function() {
          arguments[0](authenticationData);
        });

        spyOn(Mock.UserCollectionService, 'authenticateUserData').and.returnValue(promise);
        spyOn(Mock.AccessContextService, 'beginSession');
      });

      it('should not call AccessContextService.beginSession', function() {
        service.authenticate(Mock.userData);

        expect(Mock.AccessContextService.beginSession).not.toHaveBeenCalled();
      });

    });

  });

  function mockUserData() {
    Mock.userData = {};
  }

  function mockUserCollectionService($injector) {
    Mock.UserCollectionService = $injector.get('otusjs.user.access.service.UserCollectionService');
    Injections.UserCollectionService = Mock.UserCollectionService;
  }

  function mockAccessContextService($injector) {
    Mock.AccessContextService = $injector.get('otusjs.user.access.core.ContextService');
    Injections.AccessContextService = Mock.AccessContextService;
  }

});
