(function (){
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ProjectContactRestService', Service);

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
    self.getProjectContactById = getProjectContactById;
    self.getProjectContactByIdLimit = getProjectContactByIdLimit;
    self.updateReopen = updateReopen;
    self.updateClose = updateClose;
    self.listIssue = listIssue;

    function initialize() {
      _rest = OtusRestResourceService.getProjectCommunicationResourceFactory();
    }

    function createMessage(foundProjectContactId, jsonProjectContact){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.createMessage({id: foundProjectContactId}, jsonProjectContact).$promise;
    }

    function createIssue(jsonProjectContact){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.createIssue(jsonProjectContact).$promise;
    }

    function getProjectContactById(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getMessageById({id: id}).$promise;
    }

    function getProjectContactByIdLimit(id, limit) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getMessageByIdLimit({id: id, limit: limit}).$promise;
    }

    function updateReopen(foundProjectContactId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateReopen({id: foundProjectContactId}).$promise;
    }

    function updateClose(foundProjectContactId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateClose({id: foundProjectContactId}).$promise;
    }

    function listIssue(){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.listIssue().$promise;
    }

  }

}());