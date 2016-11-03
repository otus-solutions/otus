describe('otusDashboardSidenavLauncher', function() {

  var UNIT_NAME = 'otusDashboardSidenavLauncher';
  var SIDENAV_ORIGIN = 'left';
  var Mock = {};
  var Injections = {};
  var componentController = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_) {
      mockMdSidenav();
      componentController = _$componentController_(UNIT_NAME, Injections);
    });
  });

  describe('launchSidenav method', function() {

    it('should be defined', function() {
      componentController.$onInit();

      componentController.launchSidenav();

      expect(Mock.$mdSidenav().toggle).toHaveBeenCalledWith();
    });

  });

  describe('$onInit method', function() {

    it('should be defined', function() {
      componentController.$onInit();

      expect(Mock.$mdSidenav).toHaveBeenCalledWith(SIDENAV_ORIGIN);
    });

  });

  function mockMdSidenav() {
    Mock.$mdSidenav = jasmine.createSpy().and.returnValue({
      toggle: jasmine.createSpy()
    });

    Injections.$mdSidenav = Mock.$mdSidenav;
  }

});
