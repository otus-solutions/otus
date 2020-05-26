(function () {
  'use strict';

  angular
    .module('otusjs.project.contact.repository')
    .service('otusjs.project.contact.repository.ProjectContactRepositoryService', Service);

  Service.$inject = [
    'otusjs.project.contact.repository.ProjectContactCollectionService'
  ];

  function Service(ProjectContactCollectionService) {
    const self = this;

    /* Public methods */
    self.createMessage = createMessage;
    self.createIssue = createIssue;
    self.getProjectContactById = getProjectContactById;
    self.getProjectContactByIdLimit = getProjectContactByIdLimit;
    self.updateReopen = updateReopen;
    self.updateClose = updateClose;
    self.listIssue = listIssue;

    function createMessage(projectContact) {
      return ProjectContactCollectionService.createMessage(projectContact);
    }

    function createIssue(id, projectContact) {
      return ProjectContactCollectionService.createIssue(id, projectContact);
    }

    function getProjectContactById(id) {
      return ProjectContactCollectionService.getProjectContactById(id);
    }

    function getProjectContactByIdLimit(id, limit) {
      return ProjectContactCollectionService.getProjectContactByIdLimit(id, limit);
    }

    function updateReopen(id) {
      return ProjectContactCollectionService.updateReopen(id);
    }

    function updateClose(id) {
      return ProjectContactCollectionService.updateClose(id);
    }

    function listIssue() {
      return ProjectContactCollectionService.listIssue();
    }

  }
}());