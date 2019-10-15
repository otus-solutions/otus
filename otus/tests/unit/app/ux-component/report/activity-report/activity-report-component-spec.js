describe('otusActivityReportComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller, $rootScope) => {
      Injections.ActivityReportService = $injector.get('otusjs.otus.uxComponent.ActivityReportService');
      ctrl = $controller('activityReportCtrl', Injections);

      Mock.ACTIVITY_REPORT = Test.utils.data.activityReportResult;
      ctrl.selectedParticipant = Test.utils.data.selectedParticipant;
      Mock.scope = $rootScope.$new();
      Mock.$q = $injector.get('$q');
      Mock.deferred = Mock.$q.defer();

      spyOn(Injections.ActivityReportService, "infoPendingReportAlert");
      spyOn(Injections.ActivityReportService, "generateActivityReport");
    });
  });

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(ctrl.loadActivityReport).toBeDefined();
    expect(ctrl.generateActivityReport).toBeDefined();
    expect(ctrl.pendingActivityReport).toBeDefined();
    expect(ctrl.$onInit).toBeDefined();
  });

  it('$onInitMethod_should_initialize_stateVariables ', () => {
    expect(ctrl.activityReportReady).toBeUndefined();
    expect(ctrl.activityReportInfo).toBeUndefined();
    ctrl.$onInit();
    expect(ctrl.activityReportReady).toBeFalsy();
    expect(ctrl.activityReportInfo).toBeFalsy();
  });

  it('loadActivityReportMethod_should_load_reportContent_by_enableActivityReportArtifactsMethod', () => {
    Mock.deferred.resolve(Mock.ACTIVITY_REPORT);
    spyOn(Injections.ActivityReportService, 'loadActivityReport').and.returnValues(Mock.deferred.promise);

    expect(ctrl.report).toBeUndefined();
    expect(ctrl.activityReportReady).toBeUndefined();
    expect(ctrl.activityReportInfo).toBeUndefined();
    ctrl.loadActivityReport(ctrl.selectedParticipant);
    Mock.scope.$digest();
    expect(ctrl.report.objectType).toBe("ParticipantReport");
    expect(ctrl.activityReportReady).toBeTruthy();
  });

  it('loadActivityReportMethod_should_load_reportContent_by_missingActivityReportArtifactsMethod', () => {
    let activityReportResultWithMissingDataSources = Mock.ACTIVITY_REPORT;
    activityReportResultWithMissingDataSources.report.missingDataSources.push("missingActivity");
    Mock.deferred.resolve(activityReportResultWithMissingDataSources);
    spyOn(Injections.ActivityReportService, 'loadActivityReport').and.returnValues(Mock.deferred.promise);

    expect(ctrl.report).toBeUndefined();
    expect(ctrl.activityReportReady).toBeUndefined();
    expect(ctrl.activityReportInfo).toBeUndefined();
    ctrl.loadActivityReport(ctrl.selectedParticipant);
    Mock.scope.$digest();
    expect(ctrl.report.objectType).toBe("ParticipantReport");
    expect(ctrl.activityReportReady).toBeFalsy();
    expect(ctrl.activityReportInfo).toBeTruthy();
  });

  it('generateActivityReportMethod_should_evoke_generateActivityReport_of_ActivityReportService', () => {
    ctrl.generateActivityReport(Mock.ACTIVITY_REPORT);
    expect(Injections.ActivityReportService.generateActivityReport).toHaveBeenCalledTimes(1);
  });

  it('pendingActivityReportMethod_should_evoke_infoPendingReportAlert_of_ActivityReportService', () => {
    ctrl.pendingActivityReport(Mock.ACTIVITY_REPORT);
    expect(Injections.ActivityReportService.infoPendingReportAlert).toHaveBeenCalledTimes(1);
  });
});


