describe('otusDashboardSidenavLauncherCtrl_UnitTest_Suite', function () {
  var ctrl;
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector, $controller) {
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.$mdSidenav = $injector.get('$mdSidenav');
      Injections.THEME_CONSTANTS = $injector.get('THEME_CONSTANTS');
      Injections.STATE = $injector.get('STATE');

      ctrl = $controller('otusDashboardSidenavLauncherCtrl', Injections);
    });
  });

  it('ctrlExistence_check', function () {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', function () {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.launchSidenav).toBeDefined();
    expect(ctrl.verifyStateParticipantDashboard).toBeDefined();
  });

  it('verifyStateParticipantDashboard_method_should_verify_state', function () {
    spyOn(Injections.ApplicationStateService, 'getCurrentState').and.callThrough();

    expect(ctrl.verifyStateParticipantDashboard()).toEqual(false);

    expect(Injections.ApplicationStateService.getCurrentState).toHaveBeenCalledTimes(1);
  });

});
