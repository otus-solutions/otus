xdescribe('SessionStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.application.state.SessionState';
  var TEMPLATE = '<div flex layout="column"><div flex layout="row" ui-view></div></div>';
  var provider = {};
  var Injections = {};
  var Mock = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _STATE_) {
      /* Injectable mocks */
      Injections.STATE = _STATE_;

      provider = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('state definition', function() {

    it('abstract should be equal to true', function() {
      expect(provider.state.abstract).toBe(true);
    });

    it('name should be equal to "session"', function() {
      expect(provider.state.name).toEqual(Injections.STATE.SESSION);
    });

    it('template should be defined', function() {
      expect(provider.state.template).toEqual(TEMPLATE);
    });

    it('resolve.data.redirect should be defined', function() {
      expect(provider.state.data.redirect).toBeDefined();
    });

    it('resolve.loadContext should be defined', function() {
      expect(provider.state.resolve.loadContext).toBeDefined();
    });

    it('onExit should be defined', function() {
      expect(provider.state.onExit).toBeDefined();
    });

  });

  function mockRouteRulesResolver($injector) {
    Mock.RouteRulesResolver = $injector.get('otusjs.otus.application.state.RouteRulesResolver');
  }

});
