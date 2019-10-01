describe('ParticipantReportRepository_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus.report')
    angular.mock.inject($injector => {
        Injections.ParticipantReportCollectionService = $injector.get('otusjs.report.repository.ParticipantReportCollectionService');
        service = $injector.get('otusjs.report.repository.ParticipantReportRepositoryService', Injections);
        Mock.id = "123456789";
        spyOn(Injections.ParticipantReportCollectionService, "getActivityReport").and.callThrough();
      });
  });

  it('serviceExistence_check',() => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.getParticipantReportList).toBeDefined();
    expect(service.getFullReport).toBeDefined();
    expect(service.getActivityReport).toBeDefined();
  });

  it('getActivityReportMethod_should_evoke_ getActivityReport_of_ParticipantReportCollectionService_by_id', () => {
    expect(service.getActivityReport(Mock.id)).toBePromise();
    expect(Injections.ParticipantReportCollectionService.getActivityReport).toHaveBeenCalledTimes(1);
  });
});