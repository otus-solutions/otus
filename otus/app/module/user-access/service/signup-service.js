(function() {
  'use strict';

  angular
    .module('otusjs.user.access.service')
    .service('otusjs.user.access.service.SignupService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;

    /* Public Interface */
    self.executeSignup = executeSignup;

    function executeSignup(user) {
      var userResource = OtusRestResourceService.getUserResource();
      var deferred = $q.defer();
      userResource.create(user, function(response) {
         console.log(response);
        if (!response.hasErrors) {
          deferred.resolve(response);
        } else {
          deferred.reject(response);
        }
     }, function(err){
        deferred.reject(err);
     });
      return deferred.promise;
    }
  }
}());
