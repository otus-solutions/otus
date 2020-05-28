describe('ProjectCommunicationRepositoryService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};
  let LIMIT = "12";

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.ProjectCommunicationCollectionService = $injector.get('otusjs.project.communication.repository.ProjectCommunicationCollectionService');
      service = $injector.get('otusjs.project.communication.repository.ProjectCommunicationRepositoryService', Injections);

      spyOn(Injections.ProjectCommunicationCollectionService, 'createMessage');
      spyOn(Injections.ProjectCommunicationCollectionService, 'createIssue');
      spyOn(Injections.ProjectCommunicationCollectionService, 'getProjectCommunicationById');
      spyOn(Injections.ProjectCommunicationCollectionService, 'getProjectCommunicationByIdLimit');
      spyOn(Injections.ProjectCommunicationCollectionService, 'updateReopen');
      spyOn(Injections.ProjectCommunicationCollectionService, 'updateClose');
      spyOn(Injections.ProjectCommunicationCollectionService, 'listIssue');

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
  });

  it('createMessageMethod_should_evoke_createMessage_by_ProjectCommunicationCollectionService', () => {
    service.createMessage(Mock)
    expect(Injections.ProjectCommunicationCollectionService.createMessage).toHaveBeenCalledTimes(1)
  });

  it('createIssueMethod_should_evoke_createIssue_by_ProjectCommunicationCollectionService', () => {
    service.createIssue(Mock)
    expect(Injections.ProjectCommunicationCollectionService.createIssue).toHaveBeenCalledTimes(1)
  });

  it('getProjectCommunicationByIdMethod_should_evoke_getProjectCommunicationById_by_ProjectCommunicationCollectionService', () => {
    service.getProjectCommunicationById(Mock)
    expect(Injections.ProjectCommunicationCollectionService.getProjectCommunicationById).toHaveBeenCalledTimes(1)
  });

  it('getProjectCommunicationByIdLimitMethod_should_evoke_getProjectCommunicationByIdLimit_by_ProjectCommunicationCollectionService', () => {
    service.getProjectCommunicationByIdLimit(Mock, LIMIT)
    expect(Injections.ProjectCommunicationCollectionService.getProjectCommunicationByIdLimit).toHaveBeenCalledTimes(1)
  });

  it('updateReopenMethod_should_evoke_updateReopen_by_ProjectCommunicationCollectionService', () => {
    service.updateReopen(Mock)
    expect(Injections.ProjectCommunicationCollectionService.updateReopen).toHaveBeenCalledTimes(1)
  });

  it('updateCloseMethod_should_evoke_updateClose_by_ProjectCommunicationCollectionService', () => {
    service.updateClose(Mock)
    expect(Injections.ProjectCommunicationCollectionService.updateClose).toHaveBeenCalledTimes(1)
  });

  it('listIssueMethod_should_evoke_listIssue_by_ProjectCommunicationCollectionService', () => {
    service.listIssue()
    expect(Injections.ProjectCommunicationCollectionService.listIssue).toHaveBeenCalledTimes(1)
  });

});
