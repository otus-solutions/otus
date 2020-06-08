(function () {
  'use strict';

  angular
    .module('otusjs.project.communication.repository')
    .service('otusjs.project.communication.repository.ProjectCommunicationRepositoryService', Service);

  Service.$inject = [
    'otusjs.project.communication.repository.ProjectCommunicationCollectionService'
  ];

  function Service(ProjectCommunicationCollectionService) {
    const self = this;

    /* Public methods */
    self.createMessage = createMessage;
    self.createIssue = createIssue;
    self.getProjectCommunicationById = getProjectCommunicationById;
    self.getProjectCommunicationByIdLimit = getProjectCommunicationByIdLimit;
    self.updateReopen = updateReopen;
    self.updateClose = updateClose;
    self.listIssue = listIssue;
    self.filter = filter;
    self.getLastIssueMessage = getLastIssueMessage;
    self.getAllIssueMessages = getAllIssueMessages;
    self.getIssueSenderInfo = getIssueSenderInfo;

    function createMessage(ProjectCommunication) {
      return ProjectCommunicationCollectionService.createMessage(ProjectCommunication);
    }

    function createIssue(id, ProjectCommunication) {
      return ProjectCommunicationCollectionService.createIssue(id, ProjectCommunication);
    }

    function getProjectCommunicationById(id) {
      return ProjectCommunicationCollectionService.getProjectCommunicationById(id);
    }

    function getProjectCommunicationByIdLimit(id, limit) {
      return ProjectCommunicationCollectionService.getProjectCommunicationByIdLimit(id, limit);
    }

    function updateReopen(id) {
      return ProjectCommunicationCollectionService.updateReopen(id);
    }

    function updateClose(id) {
      return ProjectCommunicationCollectionService.updateClose(id);
    }

    function listIssue() {
      return ProjectCommunicationCollectionService.listIssue();
    }

    function filter(searchSettings) {
      return ProjectCommunicationCollectionService.filter(searchSettings);
    }

    function getLastIssueMessage(issueId) {
      return ProjectCommunicationCollectionService.getLastIssueMessage(issueId);
    }

    function getAllIssueMessages(issueId, limit) {
      return ProjectCommunicationCollectionService.getAllIssueMessages(issueId, limit);
    }

    function getIssueSenderInfo(senderId) {
      return ProjectCommunicationCollectionService.getIssueSenderInfo(senderId);
    }

  }
}());