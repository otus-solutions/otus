describe('otusUserActivityPendencyService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector) => {
      Injections.$q = $injector.get('$q');
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.$timeout = $injector.get('$timeout');
      Injections.$mdDialog = $injector.get('$mdDialog');
      Injections.UserActivityPendencyService = $injector.get('otusjs.pendency.business.UserActivityPendencyService');
      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Injections.CheckerItemFactory = $injector.get('otusjs.otus.uxComponent.CheckerItemFactory');
      Injections.UserActivityPendencyFactory = $injector.get('otusjs.model.pendency.UserActivityPendencyFactory');
      Injections.UserActivityPendencyConstant = $injector.get('otusjs.otus.uxComponent.UserActivityPendencyConstant');
      service = $injector.get('otusjs.otus.uxComponent.UserActivityPendencyDialogService', Injections);


      Mock.UserRepositoryService = $injector.get('otusjs.activity.repository.UserRepositoryService');

      Mock.USER_ACTIVITY_PENDENCY = Test.utils.data.userActivityPendency;
      Mock.selectedActivity = Test.utils.data.activity[0].activities[0];
      Mock.foundPendency = Test.utils.data.userActivityPendency;

      spyOn(Injections.ParticipantActivityService, "listActivityCheckers").and.returnValue([])

    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.openUserActivityPendencyDialog).toBeDefined();
    expect(service.DialogController).toBeDefined();
  });

  it('openUserActivityPendencyDialogMethod_should_evoke_getPendencyByActivityId_of_UserActivityPendencyService',() => {
    spyOn(Injections.UserActivityPendencyService, "getPendencyByActivityId").and.returnValue(Promise.resolve(Mock.foundPendency))

    service.openUserActivityPendencyDialog(Mock.selectedActivity);
    expect(Injections.UserActivityPendencyService.getPendencyByActivityId).toHaveBeenCalledTimes(1);
  });

  it('openUserActivityPendencyDialogMethod_should_evoke_getPendencyByActivityId_of_UserActivityPendencyService_and_catch_return_failure_on_foundPendency',() => {
    spyOn(Injections.UserActivityPendencyService, "getPendencyByActivityId").and.returnValue(Promise.reject());

    service.openUserActivityPendencyDialog(Mock.selectedActivity);
    expect(Injections.UserActivityPendencyService.getPendencyByActivityId).toHaveBeenCalledTimes(1);
  });

  it('DialogControllerMethodsExistence_check', () => {
    service.DialogController(Mock.selectedActivity, Mock.foundPendency);

    expect(Injections.ParticipantActivityService.listActivityCheckers).toHaveBeenCalledTimes(1);
  });

});
