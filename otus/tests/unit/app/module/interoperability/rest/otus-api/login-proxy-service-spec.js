describe('otusjs.otus.interoperability.rest.otusApi.LoginProxyService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.rest.otusApi.LoginProxyService';
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

      expect(Mock.OtusRestResourceService.getOtusAuthenticatorResource).toHaveBeenCalledWith();
    });

  });

  describe('authenticate method', function() {

    describe('when rest resource is initialized', function() {

      beforeEach(function() {
        service.initialize();
      });

      it('should request the REST resource for activity', function() {
        service.authenticate(Mock.callback);

        expect(Mock.restResource.authenticate).toHaveBeenCalledWith(Mock.callback);
      });

    });

    describe('when rest resource is not initialized', function() {

      it('should throw an exception', function() {
        expect(function() {
          service.authenticate(Mock.callback);
        }).toThrowError('REST resource is not initialized.');
      });

    });

  });

  function mockCallbackFunction() {
    Mock.callback = jasmine.any(Function);
  }

  function mockOtusRestResourceService($injector) {
    Mock.OtusRestResourceService = $injector.get('OtusRestResourceService');

    Mock.request = {};
    Mock.request.$promise = {};
    Mock.restResource = {};
    Mock.restResource.authenticate = jasmine.createSpy().and.returnValue(Mock.request);
    spyOn(Mock.OtusRestResourceService, 'getOtusAuthenticatorResource').and.returnValue(Mock.restResource);

    Injections.OtusRestResourceService = Mock.OtusRestResourceService;
  }

});
