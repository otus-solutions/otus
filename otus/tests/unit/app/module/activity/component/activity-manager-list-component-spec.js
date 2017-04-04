xdescribe('otusActivityList', function() {

  var UNIT_NAME = 'otusActivityList';
  var Mock = {};
  var Bindings = {};
  var Injections = {};
  var component = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _$componentController_) {
      /* Injectable mocks */
      mockActivityContextService(_$injector_);
      mockActivityService(_$injector_);

      /* Bindable mocks */
      mockOtusActivityManager();

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('selectActivity method', function() {

    it('should call ActivityService.selectActivities', function() {
      spyOn(Mock.ActivityService, 'selectActivities');

      component.selectActivity({});

      expect(Mock.ActivityService.selectActivities).toHaveBeenCalledWith([{ isSelected: true }]);
    });

  });

  describe('update method', function() {

    it('should call ActivityService.listAll', function() {
      spyOn(Mock.ActivityService, 'listAll');

      component.update();

      expect(Mock.ActivityService.listAll).toHaveBeenCalledWith();
    });

  });

  describe('$onInit method', function() {

    it('should initialize the child listComponent attribute with self reference', function() {
      spyOn(Mock.ActivityService, 'listAll');
      spyOn(Mock.ActivityContextService, 'onEvent');

      component.$onInit();

      expect(Mock.otusActivityManager.listComponent).toEqual(component);
    });

    it('should call ActivityService.listAll', function() {
      spyOn(Mock.ActivityService, 'listAll');
      spyOn(Mock.ActivityContextService, 'onEvent');

      component.update();

      expect(Mock.ActivityService.listAll).toHaveBeenCalledWith();
    });

    it('should call ActivityContextService.onEvent', function() {
      spyOn(Mock.ActivityService, 'listAll');
      spyOn(Mock.ActivityContextService, 'onEvent');

      component.$onInit();

      expect(Mock.ActivityContextService.onEvent).toHaveBeenCalled();
    });

  });

  function mockActivityService($injector) {
    Mock.ActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
    Injections.ActivityService = Mock.ActivityService;
  }

  function mockActivityContextService($injector) {
    Mock.ActivityContextService = $injector.get('otusjs.activity.core.ContextService');
    Injections.ActivityContextService = Mock.ActivityContextService;
  }

  function mockOtusActivityManager($injector) {
    Mock.otusActivityManager = {};
    Mock.otusActivityManager.listComponent = {};
    Bindings.otusActivityManager = Mock.otusActivityManager;
  }

});
