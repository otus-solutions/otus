(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.FileUploadRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.post = post;
    self.getByOID = getByOID;
    self.deleteByOID = deleteByOID;
    self.setContentType = setContentType;

    function initialize() {
      _rest = OtusRestResourceService.getFileUploadResourceFactory();
    }

    function post(data, canceler) {
      _restTest();

      return _rest.post(data, canceler);
    }

    function getByOID(oid) {
      _restTest();

      return _rest.getByOID(oid);
    }

    function deleteByOID(oid) {
      _restTest();
      return _rest.deleteByOID(oid);
    }

    function setContentType(type) {
      _restTest();
      _rest.setContentType(type);
   }

    function _restTest(){
      if (!_rest) {
         throw new Error('REST resource is not initialized.');
      }
   }

  }
}());
