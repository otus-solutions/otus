describe('SessionStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.configuration.state.SessionState';
  var TEMPLATE = '<div flex layout="column"><div flex layout="row" ui-view></div></div>';
  var provider = {};
  var injections = {};
  var Mock = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _STATE_) {
      mockRouteRulesResolver(_$injector_);
      injections.STATE = _STATE_;
      provider = _$injector_.get(UNIT_NAME, injections);
    });
  });

  describe('state definition', function() {

    it('abstract should be equal to true', function() {
      expect(provider.state.abstract).toBe(true);
    });

    it('name should be equal to "session"', function() {
      expect(provider.state.name).toEqual(injections.STATE.SESSION);
    });

    it('template should be defined', function() {
      expect(provider.state.template).toEqual(TEMPLATE);
    });

    it('resolve.initialConfiguration should be defined', function() {
      expect(provider.state.resolve.loggedUser).toBeDefined();
    });

    it('resolve.loggedUser should call RouteRulesResolver.loggedUser', function() {
      spyOn(Mock.RouteRulesResolver, 'loggedUser');

      provider.state.resolve.loggedUser(Mock.RouteRulesResolver);

      expect(Mock.RouteRulesResolver.loggedUser).toHaveBeenCalledWith();
    });

  });

  function mockRouteRulesResolver($injector) {
    Mock.RouteRulesResolver = $injector.get('RouteRulesResolver');
  }

});
