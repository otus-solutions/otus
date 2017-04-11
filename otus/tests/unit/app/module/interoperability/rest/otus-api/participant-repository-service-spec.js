xdescribe('otusjs.otus.interoperability.rest.otusApi.ParticipantRepositoryService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.rest.otusApi.ParticipantRepositoryService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      /* Injectable mocks */
      mockOtusRestResourceService(_$injector_);
      mockHttp();

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('initialize method', function() {

    it('should request the REST resource for activity', function() {
      service.initialize();

      expect(Mock.OtusRestResourceService.getParticipantResource).toHaveBeenCalledWith();
    });

  });

  describe('listIdexers method', function() {

    describe('when rest resource is initialized', function() {

      beforeEach(function() {
        service.initialize();
      });

      it('should request the REST resource for activity', function() {
        service.listIdexers();

        expect(Mock.restResource.listIndexers).toHaveBeenCalledWith();
      });

    });

    describe('when rest resource is not initialized', function() {

      it('should throw an exception', function() {
        expect(function() {
          service.listIdexers({});
        }).toThrowError('REST resource is not initialized.');
      });

    });

  });

  function mockOtusRestResourceService($injector) {
    Mock.OtusRestResourceService = $injector.get('OtusRestResourceService');

    Mock.promise = {};
    Mock.request = {};
    Mock.request.$promise = Mock.promise;
    Mock.restResource = {};
    Mock.restResource.listIndexers = jasmine.createSpy().and.returnValue(Mock.request);
    spyOn(Mock.OtusRestResourceService, 'getParticipantResource').and.returnValue(Mock.restResource);

    Injections.OtusRestResourceService = Mock.OtusRestResourceService;
  }

  function mockHttp() {
    Mock.$http = {};
    Mock.$http.get = jasmine.createSpy();
    Injections.$http = Mock.$http;
  }

});
