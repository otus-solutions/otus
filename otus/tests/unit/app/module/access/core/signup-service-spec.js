xdescribe('otusjs.user.access.service.SignupService', function() {

  var UNIT_NAME = 'otusjs.user.access.service.SignupService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      /* Test data */
      mockUserData();

      /* Injectable mocks */
      mockPromiseService(_$injector_);
      mockOtusRestResourceService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
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

    describe('when signup is executed with success', function() {

      var response = {};

      beforeEach(function() {
        response.hasErrors = false;
        spyOn(Mock.userResource, 'create').and.callFake(function() {
          arguments[1](response);
        });
      });

      it('should call deferred.resolve', function() {
        spyOn(Mock.deferred, 'resolve');

        service.executeSignup(Mock.user);

        expect(Mock.deferred.resolve).toHaveBeenCalledWith(response);
      });

    });

    describe('when signup is not executed with success', function() {

      var response = {};

      beforeEach(function() {
        response.hasErrors = true;
        spyOn(Mock.userResource, 'create').and.callFake(function() {
          arguments[1](response);
        });
      });

      it('should not call deferred.resolve', function() {
        spyOn(Mock.deferred, 'resolve');

        service.executeSignup(Mock.user);

        expect(Mock.deferred.resolve).not.toHaveBeenCalledWith(response);
      });

    });

  });

  function mockOtusRestResourceService($injector) {
    Mock.OtusRestResourceService = $injector.get('OtusRestResourceService');
    Mock.userResource = $injector.get('otus.client.UserResourceFactory');

    spyOn(Mock.OtusRestResourceService, 'getUserResource').and.returnValue(Mock.userResource);

    Injections.OtusRestResourceService = Mock.OtusRestResourceService;
  }

  function mockPromiseService($injector) {
    Mock.$q = $injector.get('$q');
    Mock.deferred = Mock.$q.defer();

    spyOn(Mock.$q, 'defer').and.returnValue(Mock.deferred);

    Injections.$q = Mock.$q;
  }

  function mockUserData() {
    Mock.user = {};
  }

});
