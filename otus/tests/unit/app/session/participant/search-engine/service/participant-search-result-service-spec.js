describe('ParticipantSearchResultService', function() {

  var UNIT_NAME = 'ParticipantSearchResultService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _$filter_) {
      mockFilter(_$filter_);
      mockParticipantContextService(_$injector_);
      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('filter method', function() {

    describe('when query value is an existent participant name', function() {

      it('should return a not empty result', function() {
        service.filter('diogo');

        expect(service.getFiltered().length).not.toBe(0);
      });

      it('should return all entries that match the query value', function() {
        service.filter('di');

        expect(service.getFiltered().length).toBe(2);
      });

    });

    describe('when query value is an inexistent participant name', function() {

      it('should return an empty result', function() {
        service.filter('any string');

        expect(service.getFiltered().length).toBe(0);
      });

    });

    describe('when query value is an existent participant recruitment number', function() {

      it('should return a not empty result', function() {
        service.filter(123456789);

        expect(service.getFiltered().length).not.toBe(0);
      });

      it('should return all entries that match the query value', function() {
        service.filter(1234);

        expect(service.getFiltered().length).toBe(3);
      });

    });

    describe('when query value is an inexistent recruitment number', function() {

      it('should return an empty result', function() {
        service.filter(9056);

        expect(service.getFiltered().length).toBe(0);
      });

    });

    describe('when query value is empty', function() {

      it('should return an empty result', function() {
        service.filter('');

        expect(service.getFiltered().length).toBe(0);
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

  function mockFilter($filter) {
    Mock.$filter = $filter;
    Injections.$filter = Mock.$filter;
  }

  function mockParticipantContextService($injector) {
    var preList = [{
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

    Mock.ParticipantContextService = $injector.get('otusjs.otus.participant.context.ParticipantContextService');

    spyOn(Mock.ParticipantContextService, 'getPreList').and.returnValue(preList);

    Injections.ParticipantContextService = Mock.ParticipantContextService;
  }

});
