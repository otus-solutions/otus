xdescribe('ErrorStateProvider', function() {

  var UNIT_NAME = 'otusjs.deploy.ErrorState';
  var URL = '/error';
  var TEMPLATE_URL = '<otus-error flex></otus-error>';
  // var CONTROLLER = 'otusjs.otus.uxComponent.LoginController as $ctrl';
  var provider = {};
  var Injections = {};
  var Mock = {};

  beforeEach(function() {
    angular.mock.module('otusjs.otus');
  });

  beforeEach(function() {
    inject(function(_$injector_) {
      Injections.STATE = _$injector_.get('STATE');
      provider = _$injector_.get(UNIT_NAME, Injections);

    });
  });

  describe('state definition', function() {

    it('name should be equal to "login"', function() {
      expect(provider.state.name).toEqual(Injections.STATE.ERROR);
    });

    it('url should be equal to "/error"', function() {
      expect(provider.state.url).toEqual(URL);
    });

    it('templateUrl should be equal to "app/access/login/login.html"', function() {
      expect(provider.state.template).toEqual(TEMPLATE_URL);
    });

  });

});
