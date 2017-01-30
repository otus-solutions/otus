describe('otusActivityManagerToolbar', function() {

  var UNIT_NAME = 'otusActivityManagerToolbar';
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
      mockOtusActivityManager(_$injector_);

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('deleteSelectedActivity method', function() {

    it('should call remove method from selected activities collection', function() {
      var collection = {};
      collection.remove = jasmine.createSpy();
      spyOn(Mock.ActivityService, 'getSelectedActivities').and.returnValue(collection);
      component.onDelete = jasmine.createSpy();

      component.deleteSelectedActivity();

      expect(Mock.ActivityService.getSelectedActivities).toHaveBeenCalledWith();;
      expect(Mock.ActivityService.getSelectedActivities().remove).toHaveBeenCalledWith();
    });

    it('should fire onDelete', function() {
      var collection = {};
      collection.remove = jasmine.createSpy();
      spyOn(Mock.ActivityService, 'getSelectedActivities').and.returnValue(collection);
      component.onDelete = jasmine.createSpy();

      component.deleteSelectedActivity();

      expect(Mock.ActivityService.getSelectedActivities).toHaveBeenCalledWith();;
      expect(component.onDelete).toHaveBeenCalledWith();
    });

  });

  describe('$onInit method', function() {

    it('should initialize toolbarComponent attribute of parent component', function() {
      spyOn(Mock.ActivityService, 'getSelectedParticipant');
      spyOn(Mock.ActivityContextService, 'onEvent');
      component.otusActivityManager = Mock.otusActivityManager;

      component.$onInit();

      expect(component.otusActivityManager.toolbarComponent).toEqual(component);
    });

    it('should call ActivityService.getSelectedParticipant', function() {
      spyOn(Mock.ActivityService, 'getSelectedParticipant');
      spyOn(Mock.ActivityContextService, 'onEvent');
      component.otusActivityManager = Mock.otusActivityManager;

      component.$onInit();

      expect(Mock.ActivityService.getSelectedParticipant).toHaveBeenCalledWith();
    });

    it('should call ActivityContextService.onEvent', function() {
      spyOn(Mock.ActivityService, 'getSelectedParticipant');
      spyOn(Mock.ActivityContextService, 'onEvent');
      component.otusActivityManager = Mock.otusActivityManager;

      component.$onInit();

      expect(Mock.ActivityContextService.onEvent).toHaveBeenCalled();
    });

  });

  function mockActivityContextService($injector) {
    Mock.ActivityContextService = $injector.get('otusjs.activity.core.ContextService');
    Injections.ActivityContextService = Mock.ActivityContextService;
  }

  function mockActivityService($injector) {
    Mock.ActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
    Injections.ActivityService = Mock.ActivityService;
  }

  function mockOtusActivityManager() {
    Mock.otusActivityManager = {};
    Bindings.otusActivityManager = Mock.otusActivityManager;
  }

});
