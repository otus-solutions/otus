xdescribe('otusjs.otus.application.state.ActivityAdderStateProvider', function() {

  var UNIT_NAME = 'otusjs.otus.application.state.ActivityAdderState';
  var URL = '/activity-adder';
  var TEMPLATE = '<otus-activity-adder layout="column" flex></otus-activity-adder>';
  var provider = {};
  var Injections = {};
  var Mock = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _STATE_) {
      mockActivityContextService(_$injector_);

      /* Injectable mocks */
      Injections.STATE = _STATE_;

      provider = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('state definition', function() {

    it('parent should be equal to "dashboard"', function() {
      expect(provider.state.parent).toEqual(Injections.STATE.PARTICIPANT_DASHBOARD);
    });

    it('name should be equal to "activity-adder"', function() {
      expect(provider.state.name).toEqual(Injections.STATE.ACTIVITY_ADDER);
    });

    it('url should be equal to "/activity-adder"', function() {
      expect(provider.state.url).toEqual(URL);
    });

    it('template should be defined', function() {
      expect(provider.state.template).toEqual(TEMPLATE);
    });

    it('onEnter should be defined', function() {
      expect(provider.state.onEnter).toBeDefined();
    });

  });

  describe('onEnter callback', function() {

    it('should verify if activity context is valid', function() {
      spyOn(Mock.ActivityContextService, 'isValid');

      provider.state.onEnter(Mock.ActivityContextService);

      expect(Mock.ActivityContextService.isValid).toHaveBeenCalledWith();
    });

    describe('when context is valid', function() {

      beforeEach(function() {
        spyOn(Mock.ActivityContextService, 'isValid').and.returnValue(true);
      })

      it('should try restore activity context', function() {
        provider.state.onEnter(Mock.ActivityContextService);

        expect(Mock.ActivityContextService.restore).toHaveBeenCalledWith();
      });

      it('should not try begin activity context', function() {
        provider.state.onEnter(Mock.ActivityContextService);

        expect(Mock.ActivityContextService.begin).not.toHaveBeenCalledWith();
      });

    });

    describe('when context is invalid', function() {

      beforeEach(function() {
        spyOn(Mock.ActivityContextService, 'isValid').and.returnValue(false);
      })

      it('should not try restore activity context', function() {
        provider.state.onEnter(Mock.ActivityContextService);

        expect(Mock.ActivityContextService.restore).not.toHaveBeenCalledWith();
      });

      it('should try begin activity context', function() {
        provider.state.onEnter(Mock.ActivityContextService);

        expect(Mock.ActivityContextService.begin).toHaveBeenCalledWith();
      });

    });

  });

  function mockActivityContextService($injector) {
    Mock.ActivityContextService = $injector.get('otusjs.activity.core.ContextService');
    spyOn(Mock.ActivityContextService, 'begin');
    spyOn(Mock.ActivityContextService, 'restore');
  }

});
