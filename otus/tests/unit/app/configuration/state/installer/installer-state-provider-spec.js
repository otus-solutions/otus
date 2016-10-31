describe('InstallerStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.configuration.state.InstallerState';
  var TEMPLATE_URL = 'app/installer/initial/initial-config.html';
  var CONTROLLER = 'InitialConfigController as controller';
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

    it('name should be equal to "access"', function() {
      expect(provider.state.name).toEqual(injections.STATE.INSTALLER);
    });

    it('views should be defined', function() {
      expect(provider.state.views).toBeDefined();
    });

    it('views.system-wrap.templateUrl should be defined', function() {
      expect(provider.state.views['system-wrap'].templateUrl).toEqual(TEMPLATE_URL);
    });

    it('views.system-wrap.controller should be defined', function() {
      expect(provider.state.views['system-wrap'].controller).toEqual(CONTROLLER);
    });

    it('resolve.initialConfiguration should be defined', function() {
      expect(provider.state.resolve.onlyOneConfiguration).toBeDefined();
    });

  });

});
