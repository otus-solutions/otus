xdescribe('InstallerStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.application.state.InstallerState';
  var TEMPLATE_URL = 'app/module/installer/component/initial-config.html';
  var CONTROLLER = 'otusjs.otus.installer.InitialConfigController as controller';
  var URL = '/installer';
  var provider = {};
  var Injections = {};
  var Mock = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _STATE_) {
      /* State resolve injectable mocks */
      mockInstallerProxyService(_$injector_);
      mockApplicationStateService(_$injector_);

      /* Injectable mocks */
      Injections.STATE = _STATE_;

      provider = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('state definition', function() {

    it('name should be equal to "access"', function() {
      expect(provider.state.name).toEqual(Injections.STATE.INSTALLER);
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

  });

  describe('resolve.onlyOneConfiguration method', function() {

    it('resolve.onlyOneConfiguration should be defined', function() {
      expect(provider.state.resolve.onlyOneConfiguration).toBeDefined();
    });

    it('resolve.onlyOneConfiguration should call InstallerProxyService.ready', function() {
      provider.state.resolve.onlyOneConfiguration(Mock.InstallerProxyService, Mock.ApplicationStateService);

      expect(Mock.InstallerProxyService.ready).toHaveBeenCalled();
    });

    it('resolve.onlyOneConfiguration should call ApplicationStateService.activateInstaller', function() {
      spyOn(Mock.ApplicationStateService, 'activateInstaller');

      provider.state.resolve.onlyOneConfiguration(Mock.InstallerProxyService, Mock.ApplicationStateService);

      expect(Mock.ApplicationStateService.activateInstaller).toHaveBeenCalled();
    });

  });

  function mockInstallerProxyService($injector) {
    var response = {};

    Mock.InstallerProxyService = $injector.get('otusjs.otus.interoperability.rest.otusApi.InstallerProxyService');

    Mock.InstallerProxyService.ready = jasmine.createSpy().and.callFake(function() {
      arguments[0]();
    });
  }

  function mockApplicationStateService($injector) {
    Mock.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
  }

});
