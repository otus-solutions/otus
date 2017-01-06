describe('SingupStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.application.state.SignupResultState';
  var URL = '/signup-result';
  var TEMPLATE_URL = 'app/module/access/component/signup/signup-result.html';
  var CONTROLLER = 'otusjs.otus.uxComponent.SignupController as $ctrl';
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

    it('parent should be equal to "access"', function() {
      expect(provider.state.parent).toEqual(injections.STATE.ACCESS);
    });

    it('name should be equal to "signup-result"', function() {
      expect(provider.state.name).toEqual(injections.STATE.SIGNUP_RESULT);
    });

    it('url should be equal to "/signup-result"', function() {
      expect(provider.state.url).toEqual(URL);
    });

    it('templateUrl should be equal to "app/access/signup/signup-result.html"', function() {
      expect(provider.state.templateUrl).toEqual(TEMPLATE_URL);
    });

    it('controller should be equal to "SignupController as $ctrl"', function() {
      expect(provider.state.controller).toEqual(CONTROLLER);
    });

  });

});
