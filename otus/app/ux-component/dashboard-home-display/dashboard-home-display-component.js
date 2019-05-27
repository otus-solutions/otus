(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardHomeDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-home-display/dashboard-home-display-template.html'
    });

  Controller.$inject = [
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.business.UserAccessPermissionService'
  ];

  function Controller(ContextService, EventService, ApplicationStateService, UserAccessPermissionService) {
    var self = this;
    self.participantsReady = false;
    self.userHaveLaboratoryAccessPermission;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.setFocus = setFocus;
    self.sendingExam = sendingExam;
    self.examsDashboard = examsDashboard;
    self.startMonitoring = startMonitoring;
    self.laboratoryMonitoring = laboratoryMonitoring;
    self.sampleTransportDashboard = sampleTransportDashboard;
    self.managerParticipantsDashboard = managerParticipantsDashboard;
    self.activateActivityFlagsReport = activateActivityFlagsReport;
    self.laboratoryActivityFlagsReport = laboratoryActivityFlagsReport;

    function onInit() {
      _loadLoggedUser();
      EventService.onLogin(_loadLoggedUser);
      UserAccessPermissionService.getCheckingLaboratoryPermission().then(response => {
        self.userHaveLaboratoryAccessPermission = response;
      });
    }

    function startMonitoring() {
      ApplicationStateService.activateMonitoring();
    }

    function setFocus() {
      setTimeout(function () {
        document.querySelector('#participantSearchAutoCompleteId').focus();
      }, 0);
    }

    function sampleTransportDashboard() {
      ApplicationStateService.activateSampleTransportation();
    }

    function managerParticipantsDashboard() {
      ApplicationStateService.activateParticipantsList();
    }

    function examsDashboard() {
      ApplicationStateService.activateExamsLotsManagerList();
    }

    function activateActivityFlagsReport() {
      ApplicationStateService.activateActivityFlagsReport();
    }

    function laboratoryActivityFlagsReport() {
      ApplicationStateService.laboratoryActivityFlagsReport();
    }

    function sendingExam() {
      ApplicationStateService.activateExamSending();
    }

    function laboratoryMonitoring() {
      ApplicationStateService.activateLaboratoryMonitoring();
    }

    function _loadLoggedUser(userData) {
      if (userData) {
        self.loggedUser = userData;
      } else {
        ContextService
          .getLoggedUser()
          .then(function (userData) {
            self.loggedUser = userData;
          });
      }
    }

  }
}());
