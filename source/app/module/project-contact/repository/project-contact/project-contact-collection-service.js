(function () {
  'use strict';

  angular
    .module('otusjs.project.contact.repository')
    .service('otusjs.project.contact.repository.ProjectContactCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.project.contact.ModuleService'
  ];

  function Service($q, ModuleService) {
    const self = this;
    let _remoteStorage = ModuleService.getProjectContactRemoteStorage();

    /* Public methods */
    self.createMessage = createMessage;
    self.createIssue = createIssue;
    self.getProjectContactById = getProjectContactById;
    self.getProjectContactByIdLimit = getProjectContactByIdLimit;
    self.updateReopen = updateReopen;
    self.updateClose = updateClose;
    self.listIssue = listIssue;

    function createMessage(projectContact) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.createMessage(projectContact))
        .then(response => response.data);
    }

    function createIssue(id, projectContact) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.createIssue(id, projectContact))
        .then(response => response.data);
    }

    function getProjectContactById(id) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getProjectContactById(id))
        .then(response => response.data);
    }

    function getProjectContactByIdLimit(id, projectContact) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getProjectContactByIdLimit(id, projectContact))
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