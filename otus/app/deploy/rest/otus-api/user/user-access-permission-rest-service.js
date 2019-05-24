(function () {
  'use strict';

  angular
    .module('otusjs.deploy.user')
    .service('otusjs.deploy.user.UserAccessPermissionRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getAllPermission = getAllPermission;

    function initialize() {
      _rest = OtusRestResourceService.getUserPermissionResource();
    }

    function getAllPermission(userData) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest.getAll({email:userData.email}).$promise;
    }

  }
}());
