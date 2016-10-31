describe('AccessStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.configuration.state.AccessState';
  var TEMPLATE = '<div flex layout="column"><div ui-view flex layout="row"></div></div>';
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

    it('abstract should be equal to true', function() {
      expect(provider.state.abstract).toBe(true);
    });

    it('name should be equal to "access"', function() {
      expect(provider.state.name).toEqual(injections.STATE.ACCESS);
    });

    it('template should be defined', function() {
      expect(provider.state.template).toEqual(TEMPLATE);
    });

    it('resolve.initialConfiguration should be defined', function() {
      expect(provider.state.resolve.initialConfiguration).toBeDefined();
    });

  });

});
