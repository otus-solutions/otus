describe('ActivititySharingDialogShowController_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller) => {
      Injections.ActivitySharingService = $injector.get('otusjs.activity.business.ActivitySharingService');
      Injections.ActivitySharingDialogValues = $injector.get('otusjs.otus.uxComponent.ActivitySharingDialogValues');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      ctrl = $controller('activititySharingDialogShowController', Injections);
      // mockInitialize();
    });
  });

  function mockInitialize(){}

  it('ctrlExistence_check', () => {
    console.log(ctrl);
    //expect(ctrl).toBeDefined();
  });

  xit('ctrlMethodsExistence_check', () => {
    //expect(ctrl.).toBeDefined();
  });

  xit('should ', () => { });
});
