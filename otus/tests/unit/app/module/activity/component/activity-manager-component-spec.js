describe('otusActivityManager', function() {

  var UNIT_NAME = 'otusActivityManager';
  var Mock = {};
  var Bindings = {};
  var Injections = {};
  var component = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _$componentController_) {
      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('handleDeleteAction method', function() {

    it('should call self.listComponent.update', function() {
      component.$onInit();
      component.listComponent.update = jasmine.createSpy();

      component.handleDeleteAction();

      expect(component.listComponent.update).toHaveBeenCalledWith();
    });

  });

  describe('$onInit method', function() {

    it('should define toolbarComponent property', function() {
      component.$onInit();

      expect(component.toolbarComponent).toBeDefined();
    });

    it('should define listComponent property', function() {
      component.$onInit();

      expect(component.listComponent).toBeDefined();
    });

  });

});
