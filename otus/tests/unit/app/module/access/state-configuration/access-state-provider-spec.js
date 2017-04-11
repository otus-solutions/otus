xdescribe('AccessStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.application.state.AccessState';
  var TEMPLATE = '<div flex layout="column"><div ui-view flex layout="row"></div></div>';
  var provider = {};
  var Injections = {};
  var Mock = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _STATE_) {
      /* Resolve injectable mocks */
      mockAccessContextService(_$injector_);

      /* Resolve injectable mocks */
      mockInstallerProxyService(_$injector_);
      mockApplicationStateService(_$injector_);

      /* Injectable mocks */
      Injections.STATE = _STATE_;

      provider = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('state definition', function() {

    it('abstract should be equal to true', function() {
      expect(provider.state.abstract).toBe(true);
    });

    it('name should be equal to "access"', function() {
      expect(provider.state.name).toEqual(Injections.STATE.ACCESS);
    });

    it('template should be defined', function() {
      expect(provider.state.template).toEqual(TEMPLATE);
    });

    it('data should be defined', function() {
      expect(provider.state.data).toBeDefined();
    });

    it('resolve should be defined', function() {
      expect(provider.state.resolve).toBeDefined();
    });

  });

  describe('data.redirect method', function() {

    describe('when access context is valid', function() {

      it('data.redirect should return undefined', function() {
        spyOn(Mock.AccessContextService, 'isValid').and.returnValue(true);

        var state = provider.state.data.redirect(Mock.AccessContextService);

        expect(state).toBeUndefined();
      });

    });

    describe('when access context is not valid', function() {

      it('data.redirect should return STATE.DASHBOARD', function() {
        spyOn(Mock.AccessContextService, 'isValid').and.returnValue(false);

        var state = provider.state.data.redirect(Mock.AccessContextService);

        expect(state).toEqual(Injections.STATE.DASHBOARD);
      });

    });

  });

  xdescribe('resolve.applicationReady method', function() {

    it('resolve.applicationReady should call RouteRulesResolver.applicationReady', function() {
      spyOn(Mock.RouteRulesResolver, 'applicationReady');

      provider.state.resolve.applicationReady(Mock.RouteRulesResolver);

      expect(Mock.RouteRulesResolver.applicationReady).toHaveBeenCalledWith();
    });

  });

  function mockAccessContextService($injector) {
    Mock.AccessContextService = $injector.get('otusjs.user.access.core.ContextService');
  }

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
