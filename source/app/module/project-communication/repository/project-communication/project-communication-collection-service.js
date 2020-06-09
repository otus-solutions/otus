(function () {
  'use strict';

  angular
    .module('otusjs.project.communication.repository')
    .service('otusjs.project.communication.repository.ProjectCommunicationCollectionService', Service);

  Service.$inject = [
    'otusjs.project.communication.core.ModuleService'
  ];

  function Service(ModuleService) {
    const self = this;
    let _remoteStorage = ModuleService.getProjectCommunicationRemoteStorage();

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
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.createMessage(ProjectCommunication))
        .then(response => response.data);
    }

    function createIssue(id, ProjectCommunication) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.createIssue(id, ProjectCommunication))
        .then(response => response.data);
    }

    function getProjectCommunicationById(id) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getProjectCommunicationById(id))
        .then(response => response.data);
    }

    function getProjectCommunicationByIdLimit(id, ProjectCommunication) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getProjectCommunicationByIdLimit(id, ProjectCommunication))
        .then(response => response.data);
    }

    function updateReopen(id) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.updateReopen(id))
        .then(response => response.data);
    }

    function updateClose(id) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.updateClose(id))
        .then(response => response.data);
    }

    function listIssue() {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.listIssue())
        .then(response => response.data);
    }

    function filter(searchSettings) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.filter(searchSettings))
        // .then(response => JSON.parse(response.data.data));//todo check if will be data.data and a string?
        .then(response => response.data);//todo temp
    }

    function getLastIssueMessage(issueId) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getLastIssueMessage(issueId))
        .then(response => response.data[0]);
    }

    function getAllIssueMessages(issueId, limit) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getAllIssueMessages(issueId, limit))
        .then(response => response.data);
    }

    function getIssueSenderInfo(senderId) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getIssueSenderInfo(senderId))
        .then(response => response.data);
    }

  }
}());