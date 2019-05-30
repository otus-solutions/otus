describe('LogoutService test', function () {
  var Mock= {};
  var service;
  var Injections = [];

  beforeEach(function () {

    angular.mock.module('otusjs.user');

    angular.mock.inject(function (_$injector_) {

      Injections.ContextService = _$injector_.get('otusjs.user.core.ContextService');

      service =  _$injector_.get('otusjs.user.business.UserAccessPermissionService', Injections);

      Mock.LABORATORY_PERMISSION = {
        find: function(){
          return Promise.resolve({
            objectType: "LaboratoryPermission",
            access: true
          });
        }
      }

    });
  });

  it('serviceExistence_check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', function () {
    expect(service.getCheckingLaboratoryPermission).toBeDefined();
  });

  it('getCheckingLaboratoryPermission_method_should_evoke_internalMethods', function () {
    var promise = Promise.resolve(Mock.LABORATORY_PERMISSION);

    spyOn(Injections.ContextService, 'getUserPermissions').and.returnValue(promise);

    service.getCheckingLaboratoryPermission();
    expect(Injections.ContextService.getUserPermissions).toHaveBeenCalledTimes(1);

    promise.then(resp => {
      expect(resp).toEqual(Mock.LABORATORY_PERMISSION)
    });
  });
});