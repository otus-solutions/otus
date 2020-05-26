(function(){
  'use strict';

  angular
    .module('otusjs.project.contact.business')
    .service('otusjs.project.contact.business.ProjectContactService', Service);

  Service.$inject = [
    'otusjs.project.communication.repository.ProjectContactRepositoryService'
  ];

  function Service (ProjectContactRepositoryService){
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
      return ProjectContactRepositoryService.createMessage(projectContact)
    }

    function getProjectContactById(id) {
      return ProjectContactRepositoryService.getProjectContactById(id);
    }

    function getProjectContactByIdLimit(foundProjectContactId, foundProjectContactLimit) {
      return ProjectContactRepositoryService.getProjectContactByIdLimit(foundProjectContactId, foundProjectContactLimit)
    }

    function updateReopen(foundProjectContactId){
      return ProjectContactRepositoryService.updateReopen(foundProjectContactId);
    }

    function updateClose(foundProjectContactId){
      return ProjectContactRepositoryService.updateClose(foundProjectContactId);
    }

    function listIssue(){
      return ProjectContactRepositoryService.listIssue();
    }

  }

}());