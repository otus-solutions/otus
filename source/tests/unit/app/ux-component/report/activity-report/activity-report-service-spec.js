describe('ActivityReportService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $rootScope) => {
      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Injections.ParticipantReportWidgetFactory = $injector.get('otusjs.report.business.ParticipantReportWidgetFactory');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.$mdDialog = $injector.get('$mdDialog');

      service = $injector.get('otusjs.otus.uxComponent.ActivityReportService', Injections);

      Mock.selectedParticipant = Test.utils.data.selectedParticipant;
      Mock.getSelectedActivities = _mockGetSelectedActivities();
      spyOn(Injections.ParticipantActivityService, 'getSelectedActivities')
        .and.callFake(Mock.getSelectedActivities);

      Mock.scope = $rootScope.$new();
      Mock.$q = $injector.get('$q');
      Mock.deferred = Mock.$q.defer();
      Mock.deferred.resolve({data: Test.utils.data.activityReport});
      spyOn(Injections.ParticipantReportWidgetFactory, 'getActivityReport')
        .and.returnValue(Mock.deferred.promise);

      service.loadActivityReport(Mock.selectedParticipant).then(data => data);
      Mock.scope.$digest();

      spyOn(Injections.LoadingScreenService, "changeMessage");
      spyOn(Injections.LoadingScreenService, "start");
      spyOn(Injections.$mdDialog, "show");
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.loadActivityReport).toBeDefined();
    expect(service.generateActivityReport).toBeDefined();
    expect(service.infoPendingReportAlert).toBeDefined();
  });

  it('loadActivityReportMethod_should_return_product_of_ParticipantReportWidgetFactory', () => {
    expect(service.reportResult.activityID).toBe("123456");
    expect(service.reportResult.activityReportReady).toBeTruthy();
    expect(service.reportResult.activityReportInfo).toBeFalsy();
  });

  it('generateActivityReport_should_invoke_internalFunctions', () => {
    service.reportResult.report.getLoadingMessage = jasmine.createSpy();
    service.reportResult.report.generateReport = jasmine.createSpy();
    service.generateActivityReport(service.reportResult.report);
    expect(Injections.LoadingScreenService.changeMessage).toHaveBeenCalledTimes(1);
    expect(Injections.LoadingScreenService.start).toHaveBeenCalledTimes(1);
  });

  it('infoPendingReportAlert_should_called_Dialog_with_template_of_activityReportDialog', () => {
    service.infoPendingReportAlert(service.reportResult.report);
    expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1)
  });
});

function _mockGetSelectedActivities() {
  return function () {
    return {
      list: function list() {
        return [{
          getID: function () {
            return "123456"
          }
        }]
      }
    }
  }
}