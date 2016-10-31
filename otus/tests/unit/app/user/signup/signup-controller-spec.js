describe('SignupController', function() {

  var Mock = {};
  var controller;

  beforeEach(function() {
    module('otus');

    mockUserData();

    inject(function(_$controller_, _$injector_, $rootScope) {
      controller = _$controller_('SignupController', {
        $scope: mockScope($rootScope),
        SignupService: mockApplicationStateService(_$injector_),
        SignupService: mockSignupService(_$injector_)
      });
    });
  });

  describe('signup method', function() {

    it('should set isWaiting to true', function() {
      controller.signup(Mock.user);

      expect(controller.isWaiting).toBe(true);
    });

    it('should call SignupService.executeSignup', function() {
      controller.signup(Mock.user);

      expect(Mock.SignupService.executeSignup).toHaveBeenCalled();
    });

    xit('should call ApplicationStateService.activateSignupResult', function() {
      controller.signup(Mock.user);

      expect(Mock.ApplicationStateService.activateSignupResult).toHaveBeenCalled();
    });

    xit('should call ApplicationStateService.activateSignupResult', function() {
      controller.signup(Mock.user);

      expect(Mock.$scope.signupForm.email.$setValidity).toHaveBeenCalled();
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

  function mockSignupService($injector) {
    Mock.SignupService = $injector.get('SignupService');

    spyOn(Mock.SignupService, 'executeSignup').and.callThrough();

    return Mock.SignupService;
  }

  function mockApplicationStateService($injector) {
    Mock.ApplicationStateService = $injector.get('otusjs.otus.configuration.state.ApplicationStateService');

    spyOn(Mock.ApplicationStateService, 'activateSignupResult');
    spyOn(Mock.ApplicationStateService, 'activateLogin');

    return Mock.ApplicationStateService;
  }

  function mockUserData() {
    Mock.user = {};
  }

  function mockScope($rootScope) {
    Mock.$scope = $rootScope.$new();
    Mock.$scope.signupForm = {};
    Mock.$scope.signupForm.email = {
      $setValidity: function(flag, value) {

      }
    };

    spyOn(Mock.$scope.signupForm.email, '$setValidity');

    return Mock.$scope;
  }

});
