describe('otusjs.otus.application.state.ParticipantStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.application.state.ParticipantState';
  var TEMPLATE = '<div id="participant-state-template" flex ui-view></div>';
  var URL = '/participant';
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

    it('parent should be equal to "session"', function() {
      expect(provider.state.parent).toEqual(Injections.STATE.DASHBOARD);
    });

    it('name should be equal to "session"', function() {
      expect(provider.state.name).toEqual(Injections.STATE.PARTICIPANT);
    });

    it('url should be defined', function() {
      expect(provider.state.url).toEqual(URL);
    });

    it('template should be defined', function() {
      expect(provider.state.template).toEqual(TEMPLATE);
    });

  });

});
