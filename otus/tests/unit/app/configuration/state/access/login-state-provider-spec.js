describe('LoginStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.configuration.state.LoginState';
  var URL = '/login';
  var TEMPLATE_URL = 'app/access/login/login.html';
  var CONTROLLER = 'LoginController as $ctrl';
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

    it('parent should be equal to "access"', function() {
      expect(provider.state.parent).toEqual(injections.STATE.ACCESS);
    });

    it('name should be equal to "login"', function() {
      expect(provider.state.name).toEqual(injections.STATE.LOGIN);
    });

    it('url should be equal to "/login"', function() {
      expect(provider.state.url).toEqual(URL);
    });

    it('templateUrl should be equal to "app/access/login/login.html"', function() {
      expect(provider.state.templateUrl).toEqual(TEMPLATE_URL);
    });

    it('controller should be equal to "LoginController as $ctrl"', function() {
      expect(provider.state.controller).toEqual(CONTROLLER);
    });

    it('resolve.alreadyLogged should be defined', function() {
      expect(provider.state.resolve.alreadyLogged).toBeDefined();
    });

    it('resolve.alreadyLogged should call RouteRulesResolver.alreadyLogged', function() {
      spyOn(Mock.RouteRulesResolver, 'alreadyLogged');

      provider.state.resolve.alreadyLogged(Mock.RouteRulesResolver);

      expect(Mock.RouteRulesResolver.alreadyLogged).toHaveBeenCalledWith();
    });

  });

  function mockRouteRulesResolver($injector) {
    Mock.RouteRulesResolver = $injector.get('RouteRulesResolver');
  }

});
