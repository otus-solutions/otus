describe('otusActivityAdder', function() {

  var UNIT_NAME = 'otusActivityAdder';
  var Mock = {};
  var Bindings = {};
  var Injections = {};
  var component = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _$componentController_) {
      /* Test data */
      mockActivities();

      /* Injectable mocks */
      mockActivityService(_$injector_);
      mockApplicationStateService(_$injector_);

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('addActivities method', function() {

    it('should call ActivityService.add', function() {
      component.addActivities();

      expect(Mock.ActivityService.add).toHaveBeenCalledWith([]);
    });

    it('should call ApplicationStateService.activateParticipantActivities', function() {
      component.addActivities();

      expect(Mock.ApplicationStateService.activateParticipantActivities).toHaveBeenCalledWith();
    });

  });

  describe('catchActivity method', function() {

    describe('when the catched activity is added to selected activities array', function() {

      it('the addActivities method should gets an array with the catched activities', function() {
        component.catchActivity(Mock.activityA);
        component.catchActivity(Mock.activityB);

        component.addActivities();
        expect(Mock.ActivityService.add).toHaveBeenCalledWith([Mock.activityA, Mock.activityB]);
      });

    });

    describe('when the catched activity is removed from selected activities array', function() {

      it('the addActivities method should gets an array without the catched activities', function() {
        component.catchActivity(Mock.activityA);
        component.catchActivity(Mock.activityB);
        component.catchActivity(Mock.activityB);

        component.addActivities();
        expect(Mock.ActivityService.add).toHaveBeenCalledWith([Mock.activityA]);
      });

    });

    describe('when the catched activity already exist into selected activities array', function() {

      it('the catched activity should be removed from array', function() {
        component.catchActivity(Mock.activityA);
        component.catchActivity(Mock.activityB);
        component.catchActivity(Mock.activityC);
        component.catchActivity(Mock.activityD);
        component.catchActivity(Mock.activityD);
        component.catchActivity(Mock.activityA);

        component.addActivities();
        expect(Mock.ActivityService.add).toHaveBeenCalledWith([Mock.activityB, Mock.activityC]);
      });

    });

  });

  function mockActivities() {
    Mock.activityA = { id: 'A' };
    Mock.activityB = { id: 'B' };
    Mock.activityC = { id: 'C' };
    Mock.activityD = { id: 'D' };
  }

  function mockActivityService($injector) {
    Mock.ActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
    spyOn(Mock.ActivityService, 'add');
    Injections.ActivityService = Mock.ActivityService;
  }

  function mockApplicationStateService($injector) {
    Mock.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
    spyOn(Mock.ApplicationStateService, 'activateParticipantActivities');
    Injections.ApplicationStateService = Mock.ApplicationStateService;
  }
});
