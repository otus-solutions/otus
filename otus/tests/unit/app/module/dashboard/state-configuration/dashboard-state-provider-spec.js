xdescribe('DashboardStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.application.state.DashboardState';
  var URL = '/dashboard';
  var TEMPLATE = '<otus-dashboard layout="column" flex></otus-dashboard>';
  var provider = {};
  var Injections = {};
  var Mock = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _STATE_) {
      mockSessionContextService(_$injector_);
      mockParticipantContextService(_$injector_);

      Injections.STATE = _STATE_;
      provider = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('state definition', function() {

    it('parent should be equal to "session"', function() {
      expect(provider.state.parent).toEqual(Injections.STATE.SESSION);
    });

    it('name should be equal to "dashboard"', function() {
      expect(provider.state.name).toEqual(Injections.STATE.PARTICIPANT_DASHBOARD);
    });

    it('url should be equal to "/dashboard"', function() {
      expect(provider.state.url).toEqual(URL);
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

    describe('when session context is valid', function() {

      it('should return undefined', function() {
        spyOn(Mock.SessionContextService, 'isValid').and.returnValue(true);

        expect(provider.state.data.redirect(Mock.SessionContextService)).toBeUndefined();
      });

    });

    describe('when session context is valid', function() {

      it('should return STATE.LOGIN', function() {
        spyOn(Mock.SessionContextService, 'isValid').and.returnValue(false);

        expect(provider.state.data.redirect(Mock.SessionContextService)).toEqual(Injections.STATE.LOGIN);
      });

    });

  });

  describe('resolve.loadParticipantContext method', function() {

    describe('when participant context is valid', function() {

      it('should restore participant context undefined', function() {
        spyOn(Mock.ParticipantContextService, 'isValid').and.returnValue(true);
        spyOn(Mock.ParticipantContextService, 'restore');

        provider.state.resolve.loadParticipantContext(Mock.ParticipantContextService)

        expect(Mock.ParticipantContextService.restore).toHaveBeenCalledWith();
      });

    });

    describe('when participant context is not valid', function() {

      it('should not restore participant context undefined', function() {
        spyOn(Mock.ParticipantContextService, 'isValid').and.returnValue(false);
        spyOn(Mock.ParticipantContextService, 'restore');

        provider.state.resolve.loadParticipantContext(Mock.ParticipantContextService)

        expect(Mock.ParticipantContextService.restore).not.toHaveBeenCalledWith();
      });

    });

  });

  function mockSessionContextService($injector) {
    Mock.SessionContextService = $injector.get('otusjs.application.session.core.ContextService');
  }

  function mockParticipantContextService($injector) {
    Mock.ParticipantContextService = $injector.get('otusjs.participant.core.ContextService');
  }

});
