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
      /*Prepare Mock bindings*/
      ctrl.data = {
        activity: Mock.ActivityFactory.fromJsonObject(Test.utils.data.activitySharingArtfacts.data.activity),
        cancel: jasmine.createSpy()
      }
      spyOn(Injections.ActivitySharingService, 'parseActivitySharing').and.callThrough();
      spyOn(Injections.ActivitySharingService, 'copyLinkToClipboard').and.callThrough();
      spyOn(Injections.ActivitySharingService, 'callToast');
      spyOn(Injections.LoadingScreenService, 'finish');
      spyOn(Injections.LoadingScreenService, 'start');
    });
  });

  function mockInitialize($injector, $rootScope, $q){
    Mock.ActivityFactory = $injector.get('otusjs.model.activity.ActivityFactory')
    Mock.scope = $rootScope.$new();
    Mock.responseActivityShared = Test.utils.data.activitySharingArtfacts.data.dataSharingJson;
    Mock.ActivitySharing = Injections.ActivitySharingService.parseActivitySharing(Mock.responseActivityShared.data);
    Mock.$q = $q;
    Mock.deferred = Mock.$q.defer();
    Mock.deferred.resolve(Mock.responseActivityShared);
    Mock.deferredFail = Mock.$q.defer();
    Mock.deferredFail.reject();
  }

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.getSharedURL).toBeDefined();
    expect(ctrl.renovateSharedURL).toBeDefined();
    expect(ctrl.deleteSharedURL).toBeDefined();
    expect(ctrl.copyLinkToClipboard).toBeDefined();
  });

  it('$onInit method should call actions to prepare the initial data for the template', () => {
    spyOn(Injections.ActivitySharingService, 'getSharedURL').and.returnValue(Mock.deferred.promise);
    ctrl.$onInit();
    expect(Injections.LoadingScreenService.start).toHaveBeenCalledTimes(1);
  });

  it('getSharedURL method should perform a pipeline of actions to prepare the initial data for the template', () => {
    spyOn(Injections.ActivitySharingService, 'getSharedURL').and.returnValue(Mock.deferred.promise);
    expect(ctrl.activitySharing).toBeUndefined();
    expect(ctrl.liveLink).toBeFalsy();
    ctrl.getSharedURL();
    Mock.scope.$digest();
    expect(Injections.ActivitySharingService.parseActivitySharing).toHaveBeenCalledTimes(1);
    expect(ctrl.activitySharing.objectType).toBe('ActivitySharing')
    expect(ctrl.liveLink).toBeTruthy();
    expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
  });

  it('getSharedURL method should should catch any errors during the pipeline execution', () => {
    spyOn(Injections.ActivitySharingService, 'getSharedURL').and.returnValue(Mock.deferredFail.promise);
    ctrl.getSharedURL();
    Mock.scope.$digest();
    expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
    expect(ctrl.data.cancel).toHaveBeenCalledTimes(1);
    expect(Injections.ActivitySharingService.callToast).toHaveBeenCalledTimes(1);
  });

  it('renovateSharedURL method should perform an action pipeline to receive an update of the data for the template', () => {
    ctrl.activitySharing = Mock.ActivitySharing;
    spyOn(Injections.ActivitySharingService, 'renovateSharedURL').and.returnValue(Mock.deferred.promise);
    ctrl.renovateSharedURL();
    Mock.scope.$digest();
    expect(Injections.ActivitySharingService.parseActivitySharing).toHaveBeenCalledTimes(1);
    expect(ctrl.activitySharing.objectType).toBe('ActivitySharing')
    expect(ctrl.liveLink).toBeTruthy();
    expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
  });

  it('renovateSharedURL method should should catch any errors during the pipeline execution', () => {
    ctrl.activitySharing = Mock.ActivitySharing;
    spyOn(Injections.ActivitySharingService, 'renovateSharedURL').and.returnValue(Mock.deferredFail.promise);
    ctrl.renovateSharedURL();
    Mock.scope.$digest();
    expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
    expect(ctrl.data.cancel).toHaveBeenCalledTimes(1);
    expect(Injections.ActivitySharingService.callToast).toHaveBeenCalledTimes(1);
  });

  it('deleteSharedURL method should perform an action pipeline to delete of the data for the template', () => {
    ctrl.activitySharing = Mock.ActivitySharing;
    spyOn(Injections.ActivitySharingService, 'deleteSharedURL').and.returnValue(Mock.deferred.promise);
    ctrl.deleteSharedURL();
    Mock.scope.$digest();
    expect(ctrl.activitySharing).toBe(null);
    expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
    expect(Injections.ActivitySharingService.callToast).toHaveBeenCalledTimes(1);
  });

  it('deleteSharedURL method should should catch any errors during the pipeline execution', () => {
    ctrl.activitySharing = Mock.ActivitySharing;
    spyOn(Injections.ActivitySharingService, 'deleteSharedURL').and.returnValue(Mock.deferredFail.promise);
    ctrl.deleteSharedURL();
    Mock.scope.$digest();
    expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
    expect(ctrl.data.cancel).toHaveBeenCalledTimes(1);
    expect(Injections.ActivitySharingService.callToast).toHaveBeenCalledTimes(1);
  });

  it('copyLinkToClipboard method should direct the action according to the link mode', () => {
    ctrl.copyLinkToClipboard(Mock.ActivitySharing.url, 'link')
    expect(Injections.ActivitySharingService.copyLinkToClipboard).toHaveBeenCalledWith(Mock.ActivitySharing.url)
    expect(Injections.ActivitySharingService.callToast)
      .toHaveBeenCalledWith(Injections.ActivitySharingDialogValues.toaster.copyLink, 3000);
  });

  it('copyLinkToClipboard method should direct the action according to the msg mode', () => {
    ctrl.copyLinkToClipboard(Mock.ActivitySharing.url, 'msg')
    expect(Injections.ActivitySharingService.copyLinkToClipboard).toHaveBeenCalledTimes(1)
    expect(Injections.ActivitySharingService.callToast)
      .toHaveBeenCalledWith(Injections.ActivitySharingDialogValues.toaster.copyMsg, 3000);
  });
});