(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserAccessPermissionRemoteStorageService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.user.UserAccessPermissionRestService'
  ];

  function Service($q, UserAccessPermissionRestService) {
    var self = this;

    /* Public Interface */
    self.getAllPermission = getAllPermission;
console.log('passou')
    function getAllPermission() {
      var deferred = $q.defer();
      UserAccessPermissionRestService.getAllPermission()
        .then(function (response) {
          console.log(response);
          deferred.resolve(response.data);
        }).catch(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    }
  }
}());
