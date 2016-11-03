describe('DashboardStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.configuration.state.DashboardState';
  var URL = '/dashboard';
  var TEMPLATE = '<otus-dashboard layout="column" flex></otus-dashboard>';
  var provider = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs.otus');

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

    it('template should be defined', function() {
      expect(provider.state.template).toEqual(TEMPLATE);
    });

  });

});
