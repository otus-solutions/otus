describe('otusjs.otus.uxComponent.LoginController', function() {

  var UNIT_NAME = 'otusjs.otus.uxComponent.LoginController';
  var Mock = {};
  var Injections = {};
  var controller;

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$controller_, _$injector_, _$mdToast_) {
      /* Test data */
      mockUserData();

      /* Injectable mocks */
      mockLoginService(_$injector_);
      mockApplicationStateService(_$injector_);
      mockMdToast(_$mdToast_);

      controller = _$controller_(UNIT_NAME, Injections);
    });
  });

  describe('authenticate method', function() {

    it('should call LoginService.authenticate', function() {
      var promise = {};
      promise.then = jasmine.createSpy();
      spyOn(Mock.LoginService, 'authenticate').and.returnValue(promise);

      controller.authenticate(Mock.user);

      expect(Mock.LoginService.authenticate).toHaveBeenCalled();
    });

    describe('when signup is executed with success', function() {

      beforeEach(function() {
        var promise = {};
        promise.then = jasmine.createSpy().and.callFake(function() {
          arguments[0]();
        });
        spyOn(Mock.LoginService, 'authenticate').and.returnValue(promise);
      });

      it('should call ApplicationStateService.activateSignupResult', function() {
        controller.authenticate(Mock.user);

        expect(Mock.ApplicationStateService.activateDashboard).toHaveBeenCalled();
      });

    });

    describe('when signup fails', function() {

      beforeEach(function() {
        var promise = {};
        promise.then = jasmine.createSpy().and.callFake(function() {
          arguments[1]();
        });
        spyOn(Mock.LoginService, 'authenticate').and.returnValue(promise);
      });

      it('should call ApplicationStateService.activateSignupResult', function() {
        controller.authenticate(Mock.user);

        expect(Mock.$mdToast.show).toHaveBeenCalled();
      });
    });

  });

  describe('goToSignupPage method', function() {

    it('should call ApplicationStateService.activateLogin', function() {
      controller.goToSignupPage();

      expect(Mock.ApplicationStateService.activateSignup).toHaveBeenCalled();
    });

  });

  function mockUserData() {
    Mock.user = {};
  }

  function mockLoginService($injector) {
    Mock.LoginService = $injector.get('otusjs.user.access.service.LoginService');
    Injections.LoginService = Mock.LoginService;
  }

  function mockApplicationStateService($injector) {
    Mock.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');

    spyOn(Mock.ApplicationStateService, 'activateSignup');
    spyOn(Mock.ApplicationStateService, 'activateDashboard');

    Injections.ApplicationStateService = Mock.ApplicationStateService;
  }

  function mockMdToast($mdToast) {
    Mock.$mdToast = $mdToast;

    spyOn(Mock.$mdToast, 'show');

    Injections.$mdToast = Mock.$mdToast;
  }
});
