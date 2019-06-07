describe('UserAccessPermissionRestService test', function () {
  var Mock= {};
  var service;
  var Injections = [];

  const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';

  beforeEach(function () {

    angular.mock.module('otusjs.deploy.user');
    angular.mock.module('otus.client');

    angular.mock.inject(function (_$injector_) {

      Injections.OtusRestResourceService = _$injector_.get('OtusRestResourceService');

      service =  _$injector_.get('otusjs.deploy.user.UserAccessPermissionRestService', Injections);

      Mock.userData = {
        email: "otus@email.com"
      };

    });

    spyOn(Injections.OtusRestResourceService, 'getUserPermissionResource').and.callThrough();

  });

  it('serviceExistence_check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', function () {
    expect(service.initialize).toBeDefined();
    expect(service.getAllPermission).toBeDefined();
  });

  it('initialize_method_should_evoke_internalMethods', function () {
    service.initialize();
    expect(Injections.OtusRestResourceService.getUserPermissionResource).toHaveBeenCalledTimes(1);
  });

  it('getAllPermission_method_should_evoke_internalMethods', function () {
    service.initialize();
    expect(service.getAllPermission(Mock.userData)).toBePromise();
  });

  it('getAllPermission_method_should_throw_error_with_message_if_permissionResource_is_not_initialized', function () {
    expect(service.getAllPermission).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
  });
});