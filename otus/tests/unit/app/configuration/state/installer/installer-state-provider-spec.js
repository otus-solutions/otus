describe('InstallerStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.configuration.state.InstallerState';
  var TEMPLATE_URL = 'app/installer/initial-config.html';
  var CONTROLLER = 'InitialConfigController as controller';
  var URL = '/installer';
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

    it('name should be equal to "access"', function() {
      expect(provider.state.name).toEqual(injections.STATE.INSTALLER);
    });

    it('url should be equal to "/installer"', function() {
      expect(provider.state.url).toEqual(URL);
    });

    it('templateUrl should be equal to "app/installer/initial-config.html"', function() {
      expect(provider.state.templateUrl).toEqual(TEMPLATE_URL);
    });

    it('controller should be equal to "LoginController as $ctrl"', function() {
      expect(provider.state.controller).toEqual(CONTROLLER);
    });

    it('resolve.initialConfiguration should be defined', function() {
      expect(provider.state.resolve.onlyOneConfiguration).toBeDefined();
    });

    it('resolve.onlyOneConfiguration should call RouteRulesResolver.onlyOneConfiguration', function() {
      spyOn(Mock.RouteRulesResolver, 'onlyOneConfiguration');

      provider.state.resolve.onlyOneConfiguration(Mock.RouteRulesResolver);

      expect(Mock.RouteRulesResolver.onlyOneConfiguration).toHaveBeenCalledWith();
    });

  });

  function mockRouteRulesResolver($injector) {
    Mock.RouteRulesResolver = $injector.get('RouteRulesResolver');
  }

});
