xdescribe('otusActivityAdderList', function() {

  var UNIT_NAME = 'otusActivityAdderList';
  var Mock = {};
  var Bindings = {};
  var Injections = {};
  var component = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _$componentController_) {
      /* Injectable mocks */
      mockActivityService(_$injector_);

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('$onInit method', function() {

    it('should call ActivityService.listAvailables', function() {
      component.$onInit();

      expect(Mock.ActivityService.listAvailables).toHaveBeenCalledWith();
    });

  });

  describe('selectActivity method', function() {

    it('should fire onActivitySelection with correct parameter', function() {
      var activity = {};

      component.onActivitySelection = jasmine.createSpy();
      component.selectActivity(activity);

      expect(component.onActivitySelection).toHaveBeenCalledWith({ activity: activity });
    });

  });

  function mockActivityService($injector) {
    Mock.ActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
    spyOn(Mock.ActivityService, 'listAvailables');
    Injections.ActivityService = Mock.ActivityService;
  }

});
