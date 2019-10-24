describe('LogoutService test', function () {
  var Mock = {};
  var service,logoutService;
  var Injections = [];

  beforeEach(function () {

    mockInjections();

    angular.mock.module('otusjs.user.access');
    angular.mock.module('otusjs.deploy.user', function ($provide) {
      $provide.service('OtusRestResourceService', function () {
        this.getOtusAuthenticatorResource = function () {
          return {};
        }
      })
    });

    angular.mock.module(function ($provide) {
      $provide.value('$mdDialog', []);
      $provide.value('otusjs.application.state.ApplicationStateService', {});
      $provide.value('otusjs.application.dialog.DialogShowService', Mock.DialogShowService);
    });

    angular.mock.inject(function (_$injector_) {

      Injections.$mdDialog= _$injector_.get('$mdDialog');
      Injections.DialogShowService = _$injector_.get('otusjs.application.dialog.DialogShowService');
      Injections.ApplicationStateService = _$injector_.get('otusjs.application.state.ApplicationStateService');
      Injections.LogoutServiceService = _$injector_.get('otusjs.user.access.service.LogoutServiceService');

      service =  _$injector_.get('otusjs.user.access.service.LogoutService', Injections);

      spyOn(Injections.DialogShowService, 'showDialog').and.callThrough();

    });
  });

  it('serviceExistence_check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', function () {
    expect(service.logout).toBeDefined();
    expect(service.forceLogout).toBeDefined();
  });

  it('logout_method_should_evoke_internalMethods', function () {
    service.logout();
    expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
  });

  it('forceLogout_method_should_evoke_internalMethods', function () {
    service.forceLogout("Teste","Realizado o teste.");
    expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
  });

  describe('LogoutServiceService test', function () {
    beforeEach(function () {

      angular.mock.inject(function (_$injector_) {

        Injections.AuthenticationRestService = _$injector_.get('otusjs.deploy.user.AuthenticationRestService');
        Injections.EventService = _$injector_.get('otusjs.user.access.core.EventService');

        logoutService =  _$injector_.get('otusjs.user.access.service.LogoutServiceService', Injections);

      });
    });

    it('logoutServiceExistence_check', function () {
      expect(logoutService).toBeDefined();
    });

    it('serviceMethodsExistence_check', function () {
      expect(logoutService.logout).toBeDefined();
    });

    it('logout_method_should_evoke_internalMethods', function () {
      var promise = Promise.resolve();

      spyOn(Injections.AuthenticationRestService, 'invalidate').and.returnValue(promise);
      spyOn(Injections.EventService, 'fireLogout').and.callThrough();

      logoutService.logout();
      expect(Injections.AuthenticationRestService.invalidate).toHaveBeenCalledTimes(1);
      promise.then(resp => {
        expect(Injections.EventService.fireLogout).toHaveBeenCalledTimes(1);
      });
    });
  });

  function mockInjections() {
    Mock.DialogShowService = {
      showDialog: function (data) {
        var self = this;
        self.test = data;
        return Promise.resolve(self);
      }
    }
  }
});