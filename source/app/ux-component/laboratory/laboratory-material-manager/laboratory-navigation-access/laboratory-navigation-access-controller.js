(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('laboratoryNavigationAccessCtrl', Controller);

  Controller.$inject = [
    'otusjs.user.business.UserAccessPermissionService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(UserAccessPermissionService, ApplicationStateService) {
    var self = this;

    self.$onInit = onInit;
    self.sampleTransportDashboard = sampleTransportDashboard
    self.unattachedLaboratory = unattachedLaboratory;
    self.examsDashboard = examsDashboard;
    self.sendingExam = sendingExam;

    function onInit() {
      _checkingLaboratoryPermission()
    }

    function _checkingLaboratoryPermission() {
      return UserAccessPermissionService.getCheckingLaboratoryPermission().then(response => {
        self.userAccessToLaboratory = response;
      });
    }

    function sampleTransportDashboard() {
      ApplicationStateService.activateSampleTransportation();
    }

    function unattachedLaboratory() {
      ApplicationStateService.activateUnattachedLaboratory();
    }

    function examsDashboard() {
      ApplicationStateService.activateExamsLotsManagerList();
    }

    function sendingExam() {
      ApplicationStateService.activateExamSending();
    }
  }
}());
