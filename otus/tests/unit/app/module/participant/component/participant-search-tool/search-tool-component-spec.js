describe('otusParticipantSearchTool', function() {

  var UNIT_NAME = 'otusParticipantSearchTool';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var componentController = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_, _$injector_) {
      /* Injectable mocks */
      mockParticipantSearchResultService(_$injector_);
      mockBindings();

      componentController = _$componentController_(UNIT_NAME, Injections, Bindings);

      /* Child components bind */
      componentController.resultComponent = {};
      componentController.resultComponent.setResultData = jasmine.createSpy('setResultData');
    });
  });

  describe('filter method', function() {

    beforeEach(function() {
      componentController.query = 'any value';
    });

    it('should uses ParticipantSearchResultService filter method', function() {
      componentController.filter();

      expect(Mock.ParticipantSearchResultService.filter).toHaveBeenCalledWith(componentController.query);
    });

    it('should transfer result data to search result component', function() {
      componentController.filter();

      expect(componentController.resultComponent.setResultData).toHaveBeenCalledWith(Mock.ParticipantSearchResultService.getFilteredData());
    });

  });

  describe('selectParticipant', function() {

    var participant = {};
    var onSelectData = {};

    beforeEach(function() {
      onSelectData.participant = participant;
    });

    it('should invoke the onSelect output', function() {
      componentController.selectParticipant(participant);

      expect(Bindings.onSelect).toHaveBeenCalledWith(onSelectData);
    });

  });

  describe('$onInit method', function() {

    it('should setup an literal object to resultComponent attribute', function() {
      componentController.$onInit();

      expect(componentController.resultComponent).toEqual({});
    });

  });

  function mockParticipantSearchResultService($injector) {
    Mock.ParticipantSearchResultService = $injector.get('otusjs.participant.business.ParticipantSearchService');
    spyOn(Mock.ParticipantSearchResultService, 'filter');
    spyOn(Mock.ParticipantSearchResultService, 'getFilteredData');
    Injections.ParticipantSearchResultService = Mock.ParticipantSearchResultService;
  }

  function mockBindings() {
    Bindings.onSelect = jasmine.createSpy('onSelect');
  }

});
