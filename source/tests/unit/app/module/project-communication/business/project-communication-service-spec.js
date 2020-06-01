describe('ProjectCommunicationService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};
  let LIMIT = "12";

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.ProjectCommunicationRepositoryService = $injector.get('otusjs.project.communication.repository.ProjectCommunicationRepositoryService');
      service = $injector.get('otusjs.project.communication.business.ProjectCommunicationService', Injections);
      spyOn(Injections.ProjectCommunicationRepositoryService, 'createMessage');
      spyOn(Injections.ProjectCommunicationRepositoryService, 'createIssue');
      spyOn(Injections.ProjectCommunicationRepositoryService, 'getProjectCommunicationById');
      spyOn(Injections.ProjectCommunicationRepositoryService, 'getProjectCommunicationByIdLimit');
      spyOn(Injections.ProjectCommunicationRepositoryService, 'updateReopen');
      spyOn(Injections.ProjectCommunicationRepositoryService, 'updateClose');
      spyOn(Injections.ProjectCommunicationRepositoryService, 'listIssue');
      spyOn(Injections.ProjectCommunicationRepositoryService, 'filter');

    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.createMessage).toBeDefined();
    expect(service.createIssue).toBeDefined();
    expect(service.getProjectCommunicationById).toBeDefined();
    expect(service.getProjectCommunicationByIdLimit).toBeDefined();
    expect(service.updateReopen).toBeDefined();
    expect(service.updateClose).toBeDefined();
    expect(service.listIssue).toBeDefined();
    expect(service.filter).toBeDefined();
  });

  it('createMessageMethod_should_evoke_createMessage_by_repositoryService', () => {
    service.createMessage(Mock._id, Mock);
    expect(Injections.ProjectCommunicationRepositoryService.createMessage).toHaveBeenCalledTimes(1)
  });

  it('createIssueMethod_should_evoke_createIssue_by_repositoryService', () => {
    service.createIssue(Mock);
    expect(Injections.ProjectCommunicationRepositoryService.createIssue).toHaveBeenCalledTimes(1)
  });

  it('getProjectCommunicationByIdMethod_should_evoke_getProjectCommunicationById_by_repositoryService', () => {
    service.getProjectCommunicationById(Mock._id);
    expect(Injections.ProjectCommunicationRepositoryService.getProjectCommunicationById).toHaveBeenCalledTimes(1)
  });

  it('getProjectCommunicationByIdLimitMethod_should_evoke_getProjectCommunicationByIdLimit_by_repositoryService', () => {
    service.getProjectCommunicationByIdLimit(Mock._id, LIMIT);
    expect(Injections.ProjectCommunicationRepositoryService.getProjectCommunicationByIdLimit).toHaveBeenCalledTimes(1)
  });

  it('updateReopenMethod_should_evoke_updateReope_by_repositoryService', () => {
    service.updateReopen(Mock._id);
    expect(Injections.ProjectCommunicationRepositoryService.updateReopen).toHaveBeenCalledTimes(1)
  });

  it('updateCloseMethod_should_evoke_updateClose_by_repositoryService', () => {
    service.updateClose(Mock._id);
    expect(Injections.ProjectCommunicationRepositoryService.updateClose).toHaveBeenCalledTimes(1)
  });

  it('listIssueMethod_should_evoke_listIssue_by_repositoryService', () => {
    service.listIssue();
    expect(Injections.ProjectCommunicationRepositoryService.listIssue).toHaveBeenCalledTimes(1)
  });

  it('filterMethod_should_evoke_filter_by_repositoryService', () => {
    service.filter(Mock);
    expect(Injections.ProjectCommunicationRepositoryService.filter).toHaveBeenCalledTimes(1)
  });

});
