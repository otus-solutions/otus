xdescribe('otusParticipantSearchResult', function() {

  var UNIT_NAME = 'otusParticipantSearchResult';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var componentController = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_, _$injector_) {
      // Test data
      mockParticipantList();

      // Injections
      mockParticipantSearchService(_$injector_);
      mockBindings();

      componentController = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('selectParticipant method', function() {

    beforeEach(function() {
      Mock.ParticipantSearchService.filter();
    });

    it('should set false to showResultList attribute', function() {
      componentController.selectParticipant(Mock.ParticipantSearchService.getFilteredData()[0]);

      expect(componentController.showResultList).toEqual(false);
    });

    it('should setup selected participant on ParticipantContextService', function() {
      var participant = Mock.ParticipantSearchService.getFilteredData()[0];

      componentController.selectParticipant(participant);

      expect(Mock.ParticipantSearchService.selectParticipant).toHaveBeenCalledWith(participant);
    });

    it('should invoke the onSelect output', function() {
      var participant = Mock.ParticipantSearchService.getFilteredData()[0];
      var onSelectData = {};
      onSelectData.participant = participant;

      componentController.selectParticipant(participant);

      expect(Bindings.onSelect).toHaveBeenCalledWith(onSelectData);
    });

  });

  describe('setResultData method', function() {

    describe('when has result to expose', function() {

      it('should set true to showResultList attribute', function() {
        spyOn(Mock.ParticipantSearchService, 'hasResultFilter').and.returnValue(true);

        componentController.setResultData(Mock.allParticipants);

        expect(componentController.showResultList).toEqual(true);
      });

      it('should setup participants array with result data array value', function() {
        componentController.setResultData(Mock.allParticipants);

        expect(componentController.participants).toEqual(Mock.allParticipants);
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

  function mockParticipantList() {
    var participantA = {};
    participantA.name = 'Participant A';

    var participantB = {};
    participantB.name = 'Participant B';

    Mock.allParticipants = [participantA, participantB];
    Mock.filteredParticipants = [participantA];
  }

  function mockParticipantSearchService($injector) {
    Mock.ParticipantSearchService = $injector.get('otusjs.participant.business.ParticipantManagerService');

    spyOn(Mock.ParticipantSearchService, 'getAll').and.returnValue(Mock.allParticipants)
    spyOn(Mock.ParticipantSearchService, 'getFilteredData').and.returnValue(Mock.filteredParticipants)
    spyOn(Mock.ParticipantSearchService, 'selectParticipant');

    Injections.ParticipantSearchService = Mock.ParticipantSearchService;
  }

  function mockBindings() {
    Bindings.onSelect = jasmine.createSpy('onSelect');
  }

});
