(function(){
  'use strict';

  angular
    .module('otusjs.project.communication.business')
    .service('otusjs.project.communication.business.ProjectCommunicationService', Service);

  Service.$inject = [
    'otusjs.project.communication.repository.ProjectCommunicationRepositoryService'
  ];

  function Service (ProjectCommunicationRepositoryService){
    const self = this;

    /* Public methods */
    self.createMessage = createMessage;
    self.createIssue = createIssue;
    self.getProjectCommunicationById = getProjectCommunicationById;
    self.getProjectCommunicationByIdLimit = getProjectCommunicationByIdLimit;
    self.updateReopen = updateReopen;
    self.updateClose = updateClose;
    self.filter = filter;

    function createMessage(ProjectCommunication) {
      return ProjectCommunicationRepositoryService.createMessage(ProjectCommunication)
    }

    function createIssue(id, ProjectCommunication) {
      return ProjectCommunicationRepositoryService.createIssue(id, ProjectCommunication)
    }

    function getProjectCommunicationById(id) {
      return ProjectCommunicationRepositoryService.getProjectCommunicationById(id);
    }

    function getProjectCommunicationByIdLimit(foundProjectCommunicationId, foundProjectCommunicationLimit) {
      return ProjectCommunicationRepositoryService.getProjectCommunicationByIdLimit(foundProjectCommunicationId, foundProjectCommunicationLimit)
    }

    function updateReopen(foundProjectCommunicationId){
      return ProjectCommunicationRepositoryService.updateReopen(foundProjectCommunicationId);
    }

    function updateClose(foundProjectCommunicationId){
      return ProjectCommunicationRepositoryService.updateClose(foundProjectCommunicationId);
    }

    function filter(searchSettings){
      return ProjectCommunicationRepositoryService.filter(searchSettings);
    }

  }

}());