(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusDashboardDisplayCtrl', Controller);

  Controller.$inject = [
    'otusjs.user.business.UserAccessPermissionService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService'
  ];

  function Controller(UserAccessPermissionService, ParticipantLaboratoryService) {
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
        .then(response => {
          self.laboratoryChecking = response;
        });
    }

    function _checkingLaboratoryPermission() {
      UserAccessPermissionService.getCheckingLaboratoryPermission()
        .then(response => {
          self.userAccessToLaboratory = response;
        });
    }
  }
}());
