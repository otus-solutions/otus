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
    self.updateFinalized = updateFinalized;
    self.filter = filter;
    self.getAllIssueMessages = getAllIssueMessages;
    self.getSenderById = getSenderById;

    function createMessage(issueId, messageObject) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.createMessage(issueId, messageObject))
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

    function updateFinalized(id) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.updateFinalized(id))
        .then(response => response.data);
    }

    function filter(searchSettings) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.filter(searchSettings))
        .then(response => response.data);
    }

    function getAllIssueMessages(issueId, skip, limit) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getAllIssueMessages(issueId, skip, limit))
        .then(response => response.data);
    }

    function getSenderById(senderId) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getSenderById(senderId))
        .then(response => response.data);
    }

  }
}());