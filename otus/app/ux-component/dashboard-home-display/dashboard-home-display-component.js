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
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ContextService, EventService, ApplicationStateService) {
    var self = this;
    /* Public methods */
    self.$onInit = onInit;
    self.startMonitoring = startMonitoring;
    self.setFocus = setFocus;
    self.sampleTransportDashboard = sampleTransportDashboard;
    self.managerParticipantsDashboard = managerParticipantsDashboard;
    self.examsDashboard = examsDashboard;
    self.flagsDashboard = flagsDashboard;
    self.sendingExam = sendingExam;
    self.laboratoryMonitoring = laboratoryMonitoring;
    self.participantsReady = false;

    function onInit() {
      _loadLoggedUser();
      EventService.onLogin(_loadLoggedUser);
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

    function flagsDashboard() {
      ApplicationStateService.activateFlagsReportDashboard();
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
