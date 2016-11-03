describe('otusParticipantSearchResult', function() {

  var UNIT_NAME = 'otusParticipantSearchResult';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var componentController = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_, _$injector_) {
      mockParticipantContextService(_$injector_);
      mockBindings();
      componentController = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('selectParticipant method', function() {

    var participant = {};

    beforeEach(function() {
      componentController.participants = [{}, {}, {}];
      participant.name = 'Participant Name';
      componentController.selectParticipant(participant)
    });

    it('should set false to showResultList attribute', function() {
      expect(componentController.showResultList).toEqual(false);
    });

    it('should clear search result array', function() {
      expect(componentController.participants.length).toBe(0);
    });

    it('should setup selected participant on ParticipantContextService', function() {
      expect(Mock.ParticipantContextService.selectParticipant).toHaveBeenCalledWith(participant);
    });

    it('should invoke the onSelect output', function() {
      var onSelectData = {};
      onSelectData.participant = participant;
      expect(Bindings.onSelect).toHaveBeenCalledWith(onSelectData);
    });

  });

  describe('setResultData method', function() {

    var participant = {};
    var resultData = [participant];

    beforeEach(function() {
      participant.name = 'Participant Name';
    });

    describe('when has result to expose', function() {

      beforeEach(function() {
        componentController.setResultData(resultData);
      });

      it('should set true to showResultList attribute', function() {
        expect(componentController.showResultList).toEqual(true);
      });

      it('should setup participants array with result data array value', function() {
        expect(componentController.participants).toEqual(resultData);
      });

    });

    describe('when has not result to expose', function() {

      beforeEach(function() {
        componentController.setResultData([]);
      });

      it('should set false to showResultList attribute', function() {
        expect(componentController.showResultList).toEqual(false);
      });

      it('should setup participants array with result data array value', function() {
        expect(componentController.participants).toEqual([]);
      });

    });

  });

  describe('$onInit method', function() {

    it('should setup itself on otusParticipantSearchTool component', function() {
      componentController.otusParticipantSearchTool = {};

      componentController.$onInit();

      expect(componentController.otusParticipantSearchTool.resultComponent).toEqual(componentController);
    });

  });

  function mockParticipantContextService($injector) {
    Mock.ParticipantContextService = $injector.get('otusjs.otus.participant.context.ParticipantContextService');
    spyOn(Mock.ParticipantContextService, 'selectParticipant');
    Injections.ParticipantContextService = Mock.ParticipantContextService;
  }

  function mockBindings() {
    Bindings.onSelect = jasmine.createSpy('onSelect');
  }

});
