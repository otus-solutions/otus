describe('otusjs.otus.interoperability.rest.otusApi.ActivityRepositoryService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.rest.otusApi.ActivityRepositoryService';
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

      expect(Mock.OtusRestResourceService.getActivityResource).toHaveBeenCalledWith();
    });

  });

  describe('update method', function() {

    describe('when rest resource is initialized', function() {

      beforeEach(function() {
        service.initialize();
      });

      it('should request the REST resource for activity', function() {
        service.update({});

        expect(Mock.restResource.update).toHaveBeenCalledWith({});
      });

    });

    describe('when rest resource is not initialized', function() {

      it('should throw an exception', function() {
        expect(function() {
          service.update({});
        }).toThrowError('REST resource is not initialized.');
      });

    });

  });

  xdescribe('list method', function() {

    describe('when rest resource is initialized', function() {

      beforeEach(function() {
        service.initialize();
      });

      it('should request the REST resource for activity', function() {
        service.list();

        expect(Mock.restResource.list).toHaveBeenCalledWith();
      });

    });

    describe('when rest resource is not initialized', function() {

      it('should throw an exception', function() {
        expect(function() {
          service.list();
        }).toThrowError('REST resource is not initialized.');
      });

    });

  });

  describe('remove method', function() {

    describe('when rest resource is initialized', function() {

      beforeEach(function() {
        service.initialize();
      });

      it('should request the REST resource for activity', function() {
        service.remove({});

        expect(Mock.restResource.remove).toHaveBeenCalledWith({});
      });

    });

    describe('when rest resource is not initialized', function() {

      it('should throw an exception', function() {
        expect(function() {
          service.remove({});
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
    Mock.restResource.update = jasmine.createSpy().and.returnValue(Mock.request);
    Mock.restResource.list = jasmine.createSpy().and.returnValue(Mock.request);
    Mock.restResource.remove = jasmine.createSpy().and.returnValue(Mock.request);
    spyOn(Mock.OtusRestResourceService, 'getActivityResource').and.returnValue(Mock.restResource);

    Injections.OtusRestResourceService = Mock.OtusRestResourceService;
  }

  function mockHttp() {
    Mock.$http = {};
    Mock.$http.get = jasmine.createSpy();
    Injections.$http = Mock.$http;
  }

});
