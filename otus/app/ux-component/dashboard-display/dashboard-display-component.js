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
    self.laboratoryChecking;
    self.userAccessToLaboratory;


    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      _getCheckingExist();
      _checkingLaboratoryPermission();
    }

    function _getCheckingExist() {
      ParticipantLaboratoryService.getCheckingExist()
        .then(function (response) {
          self.laboratoryChecking = response;
        });
    }

    function _checkingLaboratoryPermission() {
      UserAccessPermissionService.getCheckingLaboratoryPermission().then(response => {
        self.userAccessToLaboratory = response;
      });
    }
  }
}());
