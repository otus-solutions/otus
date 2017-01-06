describe('otusjs.otus.interoperability.rest.otusApi.UserRepositoryService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.rest.otusApi.UserRepositoryService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      /* Injectable mocks */
      mockOtusRestResourceService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('initialize method', function() {

    it('should request the REST resource for activity', function() {
      service.initialize();

      expect(Mock.OtusRestResourceService.getUserResource).toHaveBeenCalledWith();
    });

  });

  function mockOtusRestResourceService($injector) {
    Mock.OtusRestResourceService = $injector.get('OtusRestResourceService');

    Mock.promise = {};
    Mock.request = {};
    Mock.request.$promise = Mock.promise;
    Mock.restResource = {};
    spyOn(Mock.OtusRestResourceService, 'getUserResource').and.returnValue(Mock.restResource);

    Injections.OtusRestResourceService = Mock.OtusRestResourceService;
  }

});
