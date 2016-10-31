describe('DashboardStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.configuration.state.DashboardState';
  var URL = '/dashboard';
  var TEMPLATE_URL = 'app/session/dashboard/home/main-home-content-template.html';
  var SESSION_WRAP_TEMPLATE_URL = 'app/session/dashboard/home/main-home-content-template.html';
  var DASHBOARD_TEMPLATE_URL = 'app/session/dashboard/menu/dashboard-menu.html';
  var CONTROLLER = 'OtusDashboardMenu as dashboardMenu';
  var provider = {};
  var injections = {};

  beforeEach(function() {
    module('otus');

    inject(function(_$injector_, _STATE_) {
      injections.STATE = _STATE_;
      provider = _$injector_.get(UNIT_NAME, injections);
    });
  });

  describe('state definition', function() {

    it('parent should be equal to "session"', function() {
      expect(provider.state.parent).toEqual(injections.STATE.SESSION);
    });

    it('name should be equal to "dashboard"', function() {
      expect(provider.state.name).toEqual(injections.STATE.DASHBOARD);
    });

    it('url should be equal to "/dashboard"', function() {
      expect(provider.state.url).toEqual(URL);
    });

    it('templateUrl should be equal to "app/session/dashboard/home/main-home-content-template.html"', function() {
      expect(provider.state.templateUrl).toEqual(TEMPLATE_URL);
    });

    it('views should be defined', function() {
      expect(provider.state.views).toBeDefined();
    });

    it('controller of session-wrap view should be equal to "DashboardController as $ctrl"', function() {
      expect(provider.state.views['session-wrap'].templateUrl).toEqual(SESSION_WRAP_TEMPLATE_URL);
    });

    it('controller of dashboard view should be equal to "DashboardController as $ctrl"', function() {
      expect(provider.state.views['dashboard-menu@dashboard'].controller).toEqual(CONTROLLER);
    });

    it('templateUrl of dashboard view should be equal to "app/session/dashboard/menu/dashboard-menu.html"', function() {
      expect(provider.state.views['dashboard-menu@dashboard'].templateUrl).toEqual(DASHBOARD_TEMPLATE_URL);
    });

  });

});
