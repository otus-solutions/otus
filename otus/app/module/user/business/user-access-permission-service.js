(function () {
  'use strict';

  angular
    .module('otusjs.user.business')
    .service('otusjs.user.business.UserAccessPermissionService', Service);

  Service.$inject = [
    'otusjs.user.core.ContextService'
  ];

  function Service(ContextService) {
    const LABORATORY_PERMISSION = 'LaboratoryPermission';
    var self = this;

    /* Public methods */
    self.getCheckingLaboratoryPermission = getCheckingLaboratoryPermission;

    function getCheckingLaboratoryPermission() {
      var result;
      ContextService.getUserPermissions().permissions.find(function (permission) {
        if (permission.objectType === LABORATORY_PERMISSION) {
          result = permission.access;
          return;
        }
      });
      return result;
    }
  }
}());
