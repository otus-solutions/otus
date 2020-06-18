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
    self.updateFinalized = updateFinalized;
    self.filter = filter;
    self.getAllIssueMessages = getAllIssueMessages;
    self.getSenderById = getSenderById;

    function createMessage(issueId, messageObject) {
      return ProjectCommunicationCollectionService.createMessage(issueId, messageObject);
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

    function updateFinalized(id) {
      return ProjectCommunicationCollectionService.updateFinalized(id);
    }

    function filter(searchSettings) {
      return ProjectCommunicationCollectionService.filter(searchSettings);
    }

    function getAllIssueMessages(issueId, limit) {
      return ProjectCommunicationCollectionService.getAllIssueMessages(issueId, limit);
    }

    function getSenderById(senderId) {
      return ProjectCommunicationCollectionService.getSenderById(senderId);
    }

  }
}());