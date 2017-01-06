describe('otusActivityAdderToolbar', function() {

  var UNIT_NAME = 'otusActivityAdderToolbar';
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

  describe('addActivities method', function() {

    it('should fire onAddActivities', function() {
      component.onAddActivities = jasmine.createSpy();

      component.addActivities();

      expect(component.onAddActivities).toHaveBeenCalledWith();
    });

  });

  describe('returnToParticipantActivities method', function() {

    it('should fire onAddActivities', function() {
      component.returnToParticipantActivities();

      expect(Mock.ApplicationStateService.activateParticipantActivities).toHaveBeenCalledWith();
    });

  });

  function mockApplicationStateService($injector) {
    Mock.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
    spyOn(Mock.ApplicationStateService, 'activateParticipantActivities');
    Injections.ApplicationStateService = Mock.ApplicationStateService;
  }

});
