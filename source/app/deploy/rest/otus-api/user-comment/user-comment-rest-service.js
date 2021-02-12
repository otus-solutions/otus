(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserCommentRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    let self = this;
    let _rest = null;

    self.initialize = initialize;
    self.getAllUserComment = getAllUserComment;

    function initialize() {
      _rest = OtusRestResourceService.getUserCommentResourceFactory();
    }

    function getAllUserComment(){
      _checkRest();
      return _rest.getAll().$promise;
    }

    function _checkRest(){
      if (!_rest) {
        throw new Error('UserCommentRestService resource is not initialized.');
      }
    }
  }
})();
