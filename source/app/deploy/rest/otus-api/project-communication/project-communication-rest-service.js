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
    self.listIssue = listIssue;

    function initialize() {
      _rest = OtusRestResourceService.getProjectCommunicationResourceFactory();
    }

    function createMessage(foundProjectCommunicationId, jsonProjectCommunication){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.createMessage({id: foundProjectCommunicationId}, jsonProjectCommunication).$promise;
    }

    function createIssue(jsonProjectCommunication){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.createIssue(jsonProjectCommunication).$promise;
    }

    function getProjectCommunicationById(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getProjectCommunicationById({id: id}).$promise;
    }

    function getProjectCommunicationByIdLimit(id, limit) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getProjectCommunicationByIdLimit({id: id, limit: limit}).$promise;
    }

    function updateReopen(foundProjectCommunicationId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateReopen({id: foundProjectCommunicationId}).$promise;
    }

    function updateClose(foundProjectCommunicationId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateClose({id: foundProjectCommunicationId}).$promise;
    }

    function listIssue(){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.listIssue().$promise;
    }

  }

}());