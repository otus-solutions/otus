describe('otusDashboardSidenav', function() {

  var UNIT_NAME = 'otusDashboardSidenavLauncher';
  var SIDENAV_ORIGIN = 'left';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var componentController = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_, _$injector_) {
      /* Injectable mocks */
      mockMdSidenav();
      mockLogoutService(_$injector_);
      mockApplicationStateService(_$injector_);

      componentController = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('$onInit method', function() {

    it('should be defined', function() {
      componentController.$onInit();

      expect(Mock.$mdComponentRegistry.when).toHaveBeenCalledWith(SIDENAV_ORIGIN);
    });

  });

  function mockMdSidenav() {
    Mock.sidenav = {};
    Mock.sidenav.toggle = jasmine.createSpy();

    var promise = {};
    promise.then = jasmine.createSpy().and.callFake(function() {
      arguments[0](Mock.sidenav);
    });

    Mock.$mdComponentRegistry = {};
    Mock.$mdComponentRegistry.when = jasmine.createSpy().and.returnValue(promise);

    Injections.$mdComponentRegistry = Mock.$mdComponentRegistry;
  }

  function mockLogoutService($injector) {
    Mock.LogoutService = $injector.get('otusjs.user.access.service.LogoutService');
    Injections.LogoutService = Mock.LogoutService;
  }

  function mockApplicationStateService($injector) {
    Mock.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
    Injections.ApplicationStateService = Mock.ApplicationStateService;
  }
});
