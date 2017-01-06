describe('otusjs.user.access.signup.SignupController', function() {

  var UNIT_NAME = 'otusjs.otus.uxComponent.SignupController';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var controller;

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$controller_, _$injector_, $rootScope, _$mdToast_) {
      /* Test data */
      mockUserData();

      /* Injectable mocks */
      mockApplicationStateService(_$injector_);
      mockSignupService(_$injector_);
      mockScope($rootScope);
      mockMdToast(_$mdToast_);

      controller = _$controller_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('signup method', function() {

    it('should set isWaiting to true', function() {
      controller.signup(Mock.user);

      expect(controller.isWaiting).toBe(true);
    });

    it('should call SignupService.executeSignup', function() {
      var promise = {};
      promise.then = jasmine.createSpy()
      spyOn(Mock.SignupService, 'executeSignup').and.returnValue(promise);

      controller.signup(Mock.user);

      expect(Mock.SignupService.executeSignup).toHaveBeenCalled();
    });

    describe('when signup is executed with success', function() {

      beforeEach(function() {
        var response = {};
        var promise = {};

        response.data = true;
        promise.then = jasmine.createSpy().and.callFake(function() { arguments[0](response); });

        spyOn(Mock.SignupService, 'executeSignup').and.returnValue(promise);
      })

      it('should call ApplicationStateService.activateSignupResult', function() {
        controller.signup(Mock.user);

        expect(Mock.ApplicationStateService.activateSignupResult).toHaveBeenCalled();
      });

    });

    describe('when signup fails', function() {

      beforeEach(function() {
        var response = {};
        var promise = {};

        response.data = false;
        promise.then = jasmine.createSpy().and.callFake(function() { arguments[0](response); });

        spyOn(Mock.SignupService, 'executeSignup').and.returnValue(promise);
      })

      it('should not call ApplicationStateService.activateSignupResult', function() {
        controller.signup(Mock.user);

        expect(Mock.ApplicationStateService.activateSignupResult).not.toHaveBeenCalled();
      });

    });

  });

  describe('back method', function() {

    it('should call ApplicationStateService.activateLogin', function() {
      controller.back();

      expect(Mock.ApplicationStateService.activateLogin).toHaveBeenCalled();
    });

  });

  describe('agree method', function() {

    it('should call ApplicationStateService.activateLogin', function() {
      controller.agree();

      expect(Mock.ApplicationStateService.activateLogin).toHaveBeenCalled();
    });

  });

  function mockUserData() {
    Mock.user = {};
  }

  function mockApplicationStateService($injector) {
    Mock.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');

    spyOn(Mock.ApplicationStateService, 'activateSignupResult');
    spyOn(Mock.ApplicationStateService, 'activateLogin');

    Injections.ApplicationStateService = Mock.ApplicationStateService;
  }

  function mockSignupService($injector) {
    Mock.SignupService = $injector.get('otusjs.user.access.service.SignupService');
    Injections.SignupService = Mock.SignupService;
  }

  function mockScope($rootScope) {
    Mock.$scope = $rootScope.$new();
    Mock.$scope.signupForm = {};
    Mock.$scope.signupForm.email = {
      $setValidity: function(flag, value) {

      }
    };

    spyOn(Mock.$scope.signupForm.email, '$setValidity');

    Injections.$scope = Mock.$scope;
  }

  function mockMdToast($mdToast) {
    Injections.$mdToast = $mdToast;
  }
});
