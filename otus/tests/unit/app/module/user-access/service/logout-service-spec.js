describe('otusDashboardDisplay test', function () {
  var Mock = {};
  var service;
  var Injections = [];

  beforeEach(function () {

    mockInjections();

    angular.mock.module('otusjs.user.access');
    angular.mock.module('otusjs.deploy.user', function ($provide) {
      $provide.service('OtusRestResourceService', function () {
      })
    });
    angular.mock.module(function ($provide) {
      $provide.value('$mdDialog', []);
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateService);
      $provide.value('otusjs.application.dialog.DialogShowService', Mock.DialogShowService);
    });

    angular.mock.inject(function (_$injector_) {

      Injections.$mdDialog= _$injector_.get('$mdDialog');
      Injections.DialogShowService = _$injector_.get('otusjs.application.dialog.DialogShowService');
      Injections.ApplicationStateService = _$injector_.get('otusjs.application.state.ApplicationStateService');
      Injections.LogoutServiceService = _$injector_.get('otusjs.user.access.service.LogoutServiceService');

      service =  _$injector_.get('otusjs.user.access.service.LogoutService', Injections);

      spyOn(Injections.DialogShowService, 'showDialog').and.callThrough();
      spyOn(Injections.ApplicationStateService, 'activateLogin').and.callThrough();
      spyOn(Injections.LogoutServiceService, 'logout').and.callThrough();

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
    // expect(Injections.LogoutServiceService.logout).toHaveBeenCalledTimes(1);
    // expect(Injections.ApplicationStateService.activateLogin).toHaveBeenCalledTimes(1);
    expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
  });

  function mockInjections() {
    Mock.ApplicationStateService = {
      activateLogin: function () {
        return Promise.resolve();
      }
    };
     Mock.DialogShowService = {
      showDialog: function (data) {
        var self = this;
        self.test = data;
        return Promise.resolve(self);
      }
    }
  }
});