(function (){
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ProjectCommunicationRestService', Service);

  Service.$inject = [
    '$http',//todo temp
    'OtusRestResourceService'
  ];

  function Service($http,
                   OtusRestResourceService){
    const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';
    const self = this;
    let _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.createMessage = createMessage;
    self.createIssue = createIssue;
    self.getProjectCommunicationById = getProjectCommunicationById;
    self.getProjectCommunicationByIdLimit = getProjectCommunicationByIdLimit;
    self.updateReopen = updateReopen;
    self.updateClose = updateClose;
    self.updateFinalized = updateFinalized;
    self.listIssue = listIssue;
    self.filter = filter;
    self.getLastIssueMessage = getLastIssueMessage;
    self.getAllIssueMessages = getAllIssueMessages;
    self.getIssueSenderInfo = getIssueSenderInfo;

    function initialize() {
      _rest = OtusRestResourceService.getProjectCommunicationResourceFactory();
    }

    function createMessage(issueId, messageObject){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      // return _rest.createMessage({id: issueId}, messageObject).$promise;

      messageObject.sender = "5d1bbabe995e20d290d94e49";
      let url = `http://localhost:3037/project-communication/issues/${issueId}/messages`;
      return $http.post(url, messageObject);
    }


    function createIssue(jsonProjectCommunication){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.createIssue(jsonProjectCommunication).$promise;
    }

    function getProjectCommunicationById(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getMessageById({id: id}).$promise;
    }

    function getProjectCommunicationByIdLimit(id, limit) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getMessageByIdLimit({id: id, limit: limit}).$promise;
    }

    function updateReopen(foundProjectCommunicationId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      // return _rest.updateReopen({id: foundProjectCommunicationId}).$promise;//todo descomentar

      return updateStatus(foundProjectCommunicationId);
    }

    function updateClose(foundProjectCommunicationId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      // return _rest.updateClose({id: foundProjectCommunicationId}).$promise;//todo descomentar

      return updateStatus(foundProjectCommunicationId);
    }

    function updateFinalized(foundProjectCommunicationId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      // return _rest.updateFinalized({id: foundProjectCommunicationId}).$promise;//todo descomentar

      return updateStatus(foundProjectCommunicationId);
    }

    //todo temp
    function updateStatus(issue){
      const updatedIssue = angular.copy(issue);
      delete updatedIssue.participant;
      console.log(`http://localhost:3037/project-communication/issues/${issue.id}\n`, JSON.stringify(updatedIssue, null, 2))
      let url = `http://localhost:3037/project-communication/issues/${issue.id}`;
      return $http.put(url, updatedIssue);
    }

    function listIssue(){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.listIssue().$promise;
    }

    function filter(searchSettings){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      //return _rest.filter(searchSettings).$promise;//todo descomentar

      let url = `http://localhost:3037/project-communication/issues`;
      return $http.get(url);
    }

    //todo
    function getLastIssueMessage(issueId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);

      let url = `http://localhost:3037/project-communication/issues/${issueId}/last-message`;
      return $http.get(url);
    }

    //todo
    function getAllIssueMessages(issueId, limit){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);

      let url = `http://localhost:3037/project-communication/issues/${issueId}/messages`;
      return $http.get(url);
    }

    //todo
    function getIssueSenderInfo(senderId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);

      let url = `http://localhost:3037/project-communication/senders/${senderId}`;
      return $http.get(url);
    }

  }

}());
