xdescribe('LoginStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.application.state.LoginState';
  var URL = '/login';
  var TEMPLATE_URL = 'app/module/access/component/login/login.html';
  var CONTROLLER = 'otusjs.otus.uxComponent.LoginController as $ctrl';
  var provider = {};
  var Injections = {};
  var Mock = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _STATE_) {
      /* Injectables mocks */
      Injections.STATE = _STATE_;

      provider = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('state definition', function() {

    it('parent should be equal to "access"', function() {
      expect(provider.state.parent).toEqual(Injections.STATE.ACCESS);
    });

    it('name should be equal to "login"', function() {
      expect(provider.state.name).toEqual(Injections.STATE.LOGIN);
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

  });

});
