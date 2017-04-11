xdescribe('otusjs.participant.business.ParticipantSearchService', function() {

  var UNIT_NAME = 'otusjs.participant.business.ParticipantSearchService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$filter_, _$injector_) {
      /* Test data */
      mockParticipantIndexers();

      /* Injectable mocks */
      mockFilter(_$filter_);
      mockParticipantContextService(_$injector_);
      mockParticipantCollectionService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('filter method', function() {

    describe('when query value is an existent participant name', function() {

      it('should return a not empty result', function() {
        service.filter('diogo');

        expect(service.getFilteredData().length).not.toBe(0);
      });

      it('should return all entries that match the query value', function() {
        service.filter('di');

        expect(service.getFilteredData().length).toBe(2);
      });

    });

    describe('when query value is an inexistent participant name', function() {

      it('should return an empty result', function() {
        service.filter('any string');

        expect(service.getFilteredData().length).toBe(0);
      });

    });

    describe('when query value is an existent participant recruitment number', function() {

      it('should return a not empty result', function() {
        service.filter(123456789);

        expect(service.getFilteredData().length).not.toBe(0);
      });

      it('should return all entries that match the query value', function() {
        service.filter(1234);

        expect(service.getFilteredData().length).toBe(3);
      });

    });

    describe('when query value is an inexistent recruitment number', function() {

      it('should return an empty result', function() {
        service.filter(9056);

        expect(service.getFilteredData().length).toBe(0);
      });

    });

    describe('when query value is empty', function() {

      it('should return an empty result', function() {
        service.filter('');

        expect(service.getFilteredData().length).toBe(0);
      });

    });

  });

  describe('getAll method', function() {

    describe('when query value is empty', function() {

      it('should return the original result array', function() {
        service.filter('');

        expect(service.getAll().length).toBe(3);
      });

    });

    describe('when query value match any criteria', function() {

      it('should return the original result array', function() {
        service.filter('di');
        expect(service.getAll().length).toBe(3);

        service.filter(123);
        expect(service.getAll().length).toBe(3);
      });

    });

    describe('when query value does not match any criteria', function() {

      it('should return the original result array', function() {
        service.filter('any string');
        expect(service.getAll().length).toBe(3);

        service.filter(999);
        expect(service.getAll().length).toBe(3);
      });

    });

  });

  describe('selectParticipant method', function() {

    beforeEach(function() {
      service.filter('di');
    });

    it('should set false to hasResultFilter', function() {
      service.selectParticipant(service.getFilteredData()[0]);

      expect(service.hasResultFilter()).toEqual(false);
    });

    it('should clear search result array', function() {
      service.selectParticipant(service.getFilteredData()[0]);

      expect(service.getFilteredData().length).toBe(0);
    });

    it('should setup selected participant on ParticipantContextService', function() {
      var participant = service.getFilteredData()[0];

      service.selectParticipant(participant);

      expect(Mock.ParticipantContextService.selectParticipant).toHaveBeenCalledWith(participant);
    });

  });

  function mockParticipantIndexers() {
    Mock.indexers = [{
      'recruitmentNumber': 123456789,
      'fieldcenter': 'RS',
      'name': 'Diogo Rosas Ferreira'
    }, {
      'recruitmentNumber': 123456799,
      'fieldcenter': 'RS',
      'name': 'Diego Santos'
    }, {
      'recruitmentNumber': 123456899,
      'fieldcenter': 'RS',
      'name': 'Emanoel Vianna'
    }];
  }

  function mockFilter($filter) {
    Mock.$filter = $filter;
    Injections.$filter = Mock.$filter;
  }

  function mockParticipantContextService($injector) {
    Mock.ParticipantContextService = $injector.get('otusjs.participant.core.ContextService');

    spyOn(Mock.ParticipantContextService, 'selectParticipant');

    Injections.ParticipantContextService = Mock.ParticipantContextService;
  }

  function mockParticipantCollectionService($injector) {
    Mock.ParticipantCollectionService = $injector.get('otusjs.participant.repository.ParticipantRepositoryService');

    spyOn(Mock.ParticipantCollectionService, 'listIdexers').and.returnValue(Mock.indexers);

    Injections.ParticipantCollectionService = Mock.ParticipantCollectionService;
  }

});
