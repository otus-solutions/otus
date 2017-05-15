(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.FileUploadDatasourceService', service);

  service.$inject = [
         '$q',
         'otusjs.utils.FileUploadFactory',
         'otusjs.deploy.FileUploadRestService'
      ];

  function service($q, FileUploadService, FileUploadRestService) {
    var self = this;

    /* Public Interface */
    self.up = up;
    self.setupUploader = setupUploader;


    function up() {
      var defer = $q.defer();
      FileUploadRestService.initialize();
      defer.resolve(true);
      return defer.promise;
    }

    function setupUploader() {
      var defer = $q.defer();
      FileUploadService.setUploadInterface(FileUploadRestService)
        .then(function() {
          defer.resolve(true);
       }, function(){
          defer.reject(true);
       });
      return defer.promise;
    }
  }
}());
