describe('ParticipantReportService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.ParticipantReportRepositoryService = $injector.get('otusjs.report.repository.ParticipantReportRepositoryService');
      service = $injector.get('otusjs.report.business.ParticipantReportService');
      Mock.id = '123456789';
      Mock.participant = {recruitmentNumber: '987654'}
      spyOn(Injections.ParticipantReportRepositoryService, 'getParticipantReportList').and.callThrough();
      spyOn(Injections.ParticipantReportRepositoryService, 'getFullReport').and.callThrough();
      spyOn(Injections.ParticipantReportRepositoryService, 'getActivityReport').and.callThrough();
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.fetchReportList).toBeDefined();
    expect(service.getFullReport).toBeDefined();
    expect(service.fetchActivityReport).toBeDefined();
  });

  it('fetchReportListMethod_should_return_promise_by_getParticipantReportList_of_ParticipantReportRepositoryService', () => {
    expect(service.fetchReportList(Mock.participant)).toBePromise();
    expect(Injections.ParticipantReportRepositoryService.getParticipantReportList).toHaveBeenCalledTimes(1);
  });

  it('getFullReportMethod_should_return_promise_by_getFullReport_of_ParticipantReportRepositoryService', () => {
    expect(service.getFullReport(Mock.participant, Mock.id)).toBePromise();
    expect(Injections.ParticipantReportRepositoryService.getFullReport).toHaveBeenCalledTimes(1);
  });

  it('fetchActivityReportMethod_should_return_promise_by_getActivityReport_of_ParticipantReportRepositoryService', () => {
    expect(service.fetchActivityReport(Mock.id)).toBePromise();
    expect(Injections.ParticipantReportRepositoryService.getActivityReport).toHaveBeenCalledTimes(1);
  });
});