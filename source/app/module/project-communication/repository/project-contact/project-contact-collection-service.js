(function () {
  'use strict';

  angular
    .module('otusjs.project.communication.repository')
    .service('otusjs.project.communication.ProjectCommunicationCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.project.communication.ModuleService'
  ];

  function Service($q, ModuleService) {
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

  }
}());