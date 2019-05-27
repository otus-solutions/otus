(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-display/dashboard-display-template.html'
    });

  Controller.$inject = [
    'otusjs.user.business.UserAccessPermissionService'
  ];

  function Controller(UserAccessPermissionService) {
    var self = this;
    self.userHaveLaboratoryAccessPermission;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      UserAccessPermissionService.getCheckingLaboratoryPermission().then(response => {
        self.userHaveLaboratoryAccessPermission = response;
        console.log(self.userHaveLaboratoryAccessPermission);
      });
    }
  }
}());
