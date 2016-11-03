describe('otusDashboardSidenav', function() {

  var UNIT_NAME = 'otusDashboardSidenav';
  var SIDENAV_ORIGIN = 'left';
  var Mock = {};
  var Injections = {};
  var componentController = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_, _$injector_) {
      mockMdSidenav();
      mockLogoutService(_$injector_);
      componentController = _$componentController_(UNIT_NAME, Injections);
    });
  });

  describe('$onInit method', function() {

    it('should be defined', function() {
      componentController.$onInit();

      expect(Mock.$mdSidenav).toHaveBeenCalledWith(SIDENAV_ORIGIN);
    });

  });

  describe('close method', function() {

    it('should be defined', function() {
      componentController.$onInit();

      componentController.close();

      expect(Mock.$mdSidenav().toggle).toHaveBeenCalledWith();
    });

  });

  describe('logout method', function() {

    it('should be defined', function() {
      spyOn(Mock.LogoutService, 'logout');

      componentController.logout();

      expect(Mock.LogoutService.logout).toHaveBeenCalledWith();
    });

  });

  function mockMdSidenav() {
    Mock.$mdSidenav = jasmine.createSpy().and.returnValue({
      toggle: jasmine.createSpy()
    });

    Injections.$mdSidenav = Mock.$mdSidenav;
  }

  function mockLogoutService($injector) {
    Mock.LogoutService = $injector.get('LogoutService');
    Injections.LogoutService = Mock.LogoutService;
  }

});
