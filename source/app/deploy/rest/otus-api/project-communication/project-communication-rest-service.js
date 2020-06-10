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
    self.updateReopen = updateStatus;//updateReopen;
    self.updateClose = updateStatus;//updateClose;
    self.updateFinalized = updateStatus;//todo
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
      return _rest.updateReopen({id: foundProjectCommunicationId}).$promise;
    }

    function updateClose(foundProjectCommunicationId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateClose({id: foundProjectCommunicationId}).$promise;
    }

    function updateFinalized(foundProjectCommunicationId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateFinalized({id: foundProjectCommunicationId}).$promise;
    }

    function listIssue(){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.listIssue().$promise;
    }

    function filter(searchSettings){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      //return _rest.filter(searchSettings).$promise;//todo descomentar

      //return _rest.listIssue().$promise;//todo temp

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

    //todo temp
    function updateStatus(updatedIssue){
      let url = `http://localhost:3037/project-communication/issues/${updatedIssue.id}`;
      return $http.post(url, updatedIssue);
    }


  }

}());
