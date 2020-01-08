describe('otusUserActivityPendencyComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.UserActivityPendencyDialogService = $injector.get('otusjs.otus.uxComponent.UserActivityPendencyDialogService');
      Injections.UserActivityPendencyConstant = $injector.get('otusjs.otus.uxComponent.UserActivityPendencyConstant');
      ctrl = $controller('userActivityPendencyCtrl', Injections);

      Mock.USER_ACTIVITY_PENDENCY = Test.utils.data.userActivityPendency;
      ctrl.selectedActivity = Test.utils.data.activity; //?

      spyOn(Injections.UserActivityPendencyDialogService, "openUserActivityPendencyDialog");
    });
  });

  it('ctrlExistence_check', () => {
    console.log(ctrl);
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.openUserActivityPendencyDialog).toBeDefined();
  });

  it('openUserActivityPendencyDialogMethod_should_evoke_openUserActivityPendencyDialog_of_UserActivityPendencyDialogService', () => {
    ctrl.openUserActivityPendencyDialog();
    expect(Injections.UserActivityPendencyDialogService.openUserActivityPendencyDialog).toHaveBeenCalledTimes(1);
  });

});
