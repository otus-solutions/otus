(function () {
  'use strict';

  angular
    .module('otusjs.user.business')
    .service('otusjs.user.business.UserAccessPermissionService', Service);

  Service.$inject = [
    'otusjs.user.core.ContextService'
  ];

  function Service(ContextService) {

    const self = this;

    const LABORATORY_PERMISSION = 'LaboratoryPermission';
    const MONITORING_PERMISSION = 'MonitoringPermission';
    const PARTICIPANT_PERMISSION = 'ParticipantPermission';
    const ACTIVITY_PERMISSION = 'ActivityPermission';

    /* Public methods */
    self.getCheckingLaboratoryPermission = getCheckingLaboratoryPermission;
    self.getCheckingMonitoringPermission = getCheckingMonitoringPermission;
    self.getCheckingParticipantPermission = getCheckingActivityPermission;
    self.getCheckingActivityPermission = getCheckingActivityPermission;

    function getCheckingLaboratoryPermission() {
      return ContextService.getUserPermissions().then(permissions => permissions.find(function (permission) {
        if (permission.objectType === LABORATORY_PERMISSION) {
          return permission.access;
        }
      }));
    }
    function getCheckingMonitoringPermission() {
      return ContextService.getUserPermissions().then(permissions => permissions.find(function (permission) {
        if (permission.objectType === MONITORING_PERMISSION) {
          return permission.access;
        }
      }));
    }
    function getCheckingMonitoringPermission() {
      return ContextService.getUserPermissions().then(permissions => permissions.find(function (permission) {
        if (permission.objectType === PARTICIPANT_PERMISSION) {
          return permission.access;
        }
      }));
    }
    function getCheckingActivityPermission() {
      return ContextService.getUserPermissions().then(permissions => permissions.find(function (permission) {
        if (permission.objectType === ACTIVITY_PERMISSION) {
          return permission.access;
        }
      }));
    }
  }
}());
