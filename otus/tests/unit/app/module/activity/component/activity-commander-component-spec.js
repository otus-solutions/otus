describe('otusActivityManagerCommander', function() {

  var UNIT_NAME = 'otusActivityManagerCommander';
  var Mock = {};
  var Bindings = {};
  var Injections = {};
  var component = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _$componentController_) {
      /* Injectable mocks */
      mockApplicationStateService(_$injector_);

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('goToActivityAdder method', function() {

    it('should call ApplicationStateService.activateActivityAdder', function() {
      component.goToActivityAdder();

      expect(Mock.ApplicationStateService.activateActivityAdder).toHaveBeenCalledWith();
    });

  });

  function mockApplicationStateService($injector) {
    Mock.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
    spyOn(Mock.ApplicationStateService, 'activateActivityAdder');
    Injections.ApplicationStateService = Mock.ApplicationStateService;
  }

});
