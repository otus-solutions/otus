describe('ParticipantReportRepository_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus.report')
    angular.mock.inject($injector => {
        Injections.ParticipantReportCollectionService = $injector.get('otusjs.report.repository.ParticipantReportCollectionService');
        service = $injector.get('otusjs.report.repository.ParticipantReportRepositoryService', Injections);
        Mock.rn = "987654";
        Mock.id = "123456789";
        spyOn(Injections.ParticipantReportCollectionService, "getParticipantReportList").and.callThrough();
        spyOn(Injections.ParticipantReportCollectionService, "getFullReport").and.callThrough();
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

  it('getActivityReportMethod_should_evoke_getParticipantReportList_of_ParticipantReportCollectionService_by_rn', () => {
    expect(service.getParticipantReportList(Mock.rn)).toBePromise();
    expect(Injections.ParticipantReportCollectionService.getParticipantReportList).toHaveBeenCalledTimes(1);
  });

  it('getFullReportMethod_should_evoke_getFullReport_of_ParticipantReportCollectionService_by_rn_and_id', () => {
    expect(service.getFullReport(Mock.rn, Mock.id)).toBePromise();
    expect(Injections.ParticipantReportCollectionService.getFullReport).toHaveBeenCalledTimes(1);
  });

  it('getActivityReportMethod_should_evoke_ getActivityReport_of_ParticipantReportCollectionService_by_id', () => {
    expect(service.getActivityReport(Mock.id)).toBePromise();
    expect(Injections.ParticipantReportCollectionService.getActivityReport).toHaveBeenCalledTimes(1);
  });
});