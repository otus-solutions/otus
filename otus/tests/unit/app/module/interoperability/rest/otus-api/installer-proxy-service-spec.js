describe('otusjs.otus.interoperability.rest.otusApi.InstallerProxyService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.rest.otusApi.InstallerProxyService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      /* Injectable mocks */
      mockOtusRestResourceService(_$injector_);
      mockCallbackFunction();

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('initialize method', function() {

    it('should request the REST resource for activity', function() {
      service.initialize();

      expect(Mock.OtusRestResourceService.getOtusInstallerResource).toHaveBeenCalledWith();
    });

  });

  describe('ready method', function() {

    describe('when rest resource is initialized', function() {

      beforeEach(function() {
        service.initialize();
      });

      it('should request the REST resource for activity', function() {
        service.ready(Mock.callback);

        expect(Mock.restResource.ready).toHaveBeenCalledWith(Mock.callback);
      });

    });

    describe('when rest resource is not initialized', function() {

      it('should throw an exception', function() {
        expect(function() {
          service.ready(Mock.callback);
        }).toThrowError('REST resource is not initialized.');
      });

    });

  });

  function mockCallbackFunction() {
    Mock.callback = jasmine.any(Function);
  }

  function mockOtusRestResourceService($injector) {
    Mock.OtusRestResourceService = $injector.get('OtusRestResourceService');

    Mock.restResource = {};
    Mock.restResource.ready = jasmine.createSpy();
    spyOn(Mock.OtusRestResourceService, 'getOtusInstallerResource').and.returnValue(Mock.restResource);

    Injections.OtusRestResourceService = Mock.OtusRestResourceService;
  }

});
