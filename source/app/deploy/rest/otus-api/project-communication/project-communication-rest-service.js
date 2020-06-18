(function (){
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ProjectCommunicationRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService){
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
    self.filter = filter;
    self.getAllIssueMessages = getAllIssueMessages;
    self.getSenderById = getSenderById;

    function initialize() {
      _rest = OtusRestResourceService.getProjectCommunicationResourceFactory();
    }

    function createMessage(issueId, messageObject){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.createMessage({id: issueId}, messageObject).$promise;
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
      return _rest.updateFinalize({id: foundProjectCommunicationId}).$promise;
    }

    function filter(searchSettings){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.filter(searchSettings).$promise;
    }

    function getAllIssueMessages(issueId, limit){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getMessageByIdLimit({id: issueId, limit: limit});
    }

    function getSenderById(senderId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getSenderById({id: senderId});
    }

  }

}());
