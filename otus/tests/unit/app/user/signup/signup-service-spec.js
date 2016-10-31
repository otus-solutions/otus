describe('SignupService', function() {

  var Mock = {};
  var service;

  beforeEach(function() {
    module('otus');

    mockUserData();

    inject(function(_$injector_) {
      service = _$injector_.get('SignupService', {
        $q: mockPromiseService(_$injector_),
        OtusRestResourceService: mockOtusRestResourceService(_$injector_)
      });
    });
  });

  describe('executeSignup method', function() {

    it('should call OtusRestResourceService.getUserResource', function() {
      service.executeSignup(Mock.user);

      expect(Mock.OtusRestResourceService.getUserResource).toHaveBeenCalled();
    });

    it('should call $q.defer', function() {
      service.executeSignup(Mock.user);

      expect(Mock.$q.defer).toHaveBeenCalled();
    });

    it('should call OtusRestResourceService.create', function() {
      spyOn(Mock.userResource, 'create');

      service.executeSignup(Mock.user);

      expect(Mock.userResource.create).toHaveBeenCalled();
    });

    it('should return a promise', function() {
      var promise = service.executeSignup(Mock.user);

      expect(promise).toBeDefined();
    });

  });

  function mockOtusRestResourceService($injector) {
    Mock.OtusRestResourceService = $injector.get('OtusRestResourceService');
    Mock.userResource = $injector.get('otus.client.UserResourceFactory');

    spyOn(Mock.OtusRestResourceService, 'getUserResource').and.returnValue(Mock.userResource);

    return Mock.OtusRestResourceService;
  }

  function mockPromiseService($injector) {
    Mock.$q = $injector.get('$q');

    spyOn(Mock.$q, 'defer').and.callThrough();

    return Mock.$q;
  }

  function mockUserData() {
    Mock.user = {};
  }

});
