describe('ActivititySharingDialogShowController_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller, $rootScope, $q) => {
      Injections.ActivitySharingService = $injector.get('otusjs.activity.business.ActivitySharingService');
      Injections.ActivitySharingDialogValues = $injector.get('otusjs.otus.uxComponent.ActivitySharingDialogValues');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      ctrl = $controller('activititySharingDialogShowController', Injections);
      mockInitialize($injector, $rootScope, $q);
      ctrl.data = {
        activity: Mock.ActivityFactory.fromJsonObject(Test.utils.data.activitySharingArtfacts.data.activity)
      }
      spyOn(Injections.ActivitySharingService, 'getSharedURL').and.returnValue(Mock.getSharedURLDefered.promise);
    });
  });

  function mockInitialize($injector, $rootScope, $q){
    Mock.ActivityFactory = $injector.get('otusjs.model.activity.ActivityFactory')
    Mock.scope = $rootScope.$new();
    Mock.responseActivityShared = Test.utils.data.activitySharingArtfacts.data.dataSharingJson;
    Mock.$q = $q;
    Mock.getSharedURLDefered = Mock.$q.defer();
    Mock.getSharedURLDefered.resolve(Mock.responseActivityShared);
    // Mock.scope.$digest();
  }

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.getSharedURL).toBeDefined();
    expect(ctrl.renovateSharedURL).toBeDefined();
    expect(ctrl.deleteSharedURL).toBeDefined();
    expect(ctrl.copyLinkToClipboard).toBeDefined();
  });

  it('getSharedURLMethod_should', () => {
    expect(ctrl.activitySharing).toBeUndefined();
    expect(ctrl.liveLink).toBeFalsy();
    ctrl.getSharedURL();
    Mock.scope.$digest();
    expect(ctrl.liveLink).toBeTruthy();
    expect(ctrl.activitySharing.objectType).toBe('ActivitySharing')




  });

  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });


});


