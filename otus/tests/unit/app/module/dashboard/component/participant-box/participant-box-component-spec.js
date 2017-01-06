describe('otusParticipantBox', function() {

  var UNIT_NAME = 'otusParticipantBox';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var component = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_, _$injector_) {
      /* Injectable mocks */
      mockElement();
      mockApplicationStateService(_$injector_);
      mockParticipantContextService(_$injector_);

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('loadParticipantActivities methods', function() {

    it('should activate state of participant activities', function() {
      spyOn(Mock.ApplicationStateService, 'activateParticipantActivities');

      component.loadParticipantActivities();

      expect(Mock.ApplicationStateService.activateParticipantActivities).toHaveBeenCalledWith();
    });

  });

  describe('loadParticipantActivities methods', function() {

    it('should activate state of participant reports', function() {
      spyOn(Mock.ApplicationStateService, 'activateParticipantReports');

      component.loadParticipantReports();

      expect(Mock.ApplicationStateService.activateParticipantReports).toHaveBeenCalledWith();
    });

  });

  describe('$onInit method', function() {

    it('should add listener to event PARTICIPAN_SELECTED', function() {
      spyOn(Mock.ParticipantContextService, 'onEvent');
      spyOn(Mock.ParticipantContextService, 'isValid');

      component.$onInit();

      expect(Mock.ParticipantContextService.onEvent).toHaveBeenCalledWith(Mock.ParticipantContextService.EVENTS.PARTICIPANT_SELECTED, jasmine.any(Function));
    });

    it('should verify if participant context is valid', function() {
      spyOn(Mock.ParticipantContextService, 'isValid');

      component.$onInit();

      expect(Mock.ParticipantContextService.isValid).toHaveBeenCalledWith();
    });

    describe('when participant context is valid', function() {

      beforeEach(function() {
        spyOn(Mock.ParticipantContextService, 'isValid').and.returnValue(true);
      });

      it('should load selected participant', function() {
        spyOn(Mock.ParticipantContextService, 'getSelectedParticipant');

        component.$onInit();

        expect(Mock.ParticipantContextService.getSelectedParticipant).toHaveBeenCalledWith();
      });

      it('should load selected participant and store a reference on component', function() {
        spyOn(Mock.ParticipantContextService, 'getSelectedParticipant').and.returnValue({});

        component.$onInit();

        expect(component.selectedParticipant).toEqual({});
      });

      it('should show the element of component', function() {
        spyOn(Mock.ParticipantContextService, 'getSelectedParticipant').and.returnValue({});

        component.$onInit();

        expect(Mock.$element.show).toHaveBeenCalledWith();
      });

      it('should not hide the element of component', function() {
        spyOn(Mock.ParticipantContextService, 'getSelectedParticipant').and.returnValue({});

        component.$onInit();

        expect(Mock.$element.hide).not.toHaveBeenCalledWith();
      });

    });

    describe('when participant context is not valid', function() {

      beforeEach(function() {
        spyOn(Mock.ParticipantContextService, 'isValid').and.returnValue(false);
      });

      it('should not try load selected participant', function() {
        spyOn(Mock.ParticipantContextService, 'getSelectedParticipant');

        component.$onInit();

        expect(Mock.ParticipantContextService.getSelectedParticipant).not.toHaveBeenCalledWith();
      });

      it('should not store a reference on component', function() {
        component.$onInit();

        expect(component.selectedParticipant).toBeUndefined();
      });

      it('should not show the element of component', function() {
        spyOn(Mock.ParticipantContextService, 'getSelectedParticipant').and.returnValue({});

        component.$onInit();

        expect(Mock.$element.show).not.toHaveBeenCalledWith();
      });

      it('should hide the element of component', function() {
        spyOn(Mock.ParticipantContextService, 'getSelectedParticipant').and.returnValue({});

        component.$onInit();

        expect(Mock.$element.hide).toHaveBeenCalledWith();
      });

    });

  });

  function mockElement() {
    Mock.$element = {};
    Mock.$element.hide = jasmine.createSpy();
    Mock.$element.show = jasmine.createSpy();
    Injections.$element = Mock.$element;
  }

  function mockApplicationStateService($injector) {
    Mock.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
    Injections.ApplicationStateService = Mock.ApplicationStateService;
  }

  function mockParticipantContextService($injector) {
    Mock.ParticipantContextService = $injector.get('otusjs.participant.core.ContextService');
    Injections.ParticipantContextService = Mock.ParticipantContextService;
  }

});
