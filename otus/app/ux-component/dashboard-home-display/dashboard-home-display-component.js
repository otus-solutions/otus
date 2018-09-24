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
    'otusjs.laboratory.core.project.ContextService',
    'STATE',
    '$mdDialog'
  ];

  function Controller(ContextService, EventService, ApplicationStateService, ProjectContextService, STATE, $mdDialog) {
    var self = this;
    self.setFocus = setFocus;
    self.sampleTransportDashboard = sampleTransportDashboard;
    self.managerParticipantsDashboard = managerParticipantsDashboard;
    self.ExamsDashboard = ExamsDashboard;
    self.FlagsDashboard = FlagsDashboard;
    self.sendingExam = sendingExam;
    self.$onInit = onInit;
    self.startMonitoring = startMonitoring;

    /* Public methods */
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

    function ExamsDashboard() {
      ApplicationStateService.activateExamsLotsManagerList();
    }

    function FlagsDashboard() {
      ApplicationStateService.activateFlagsReportDashboard();
    }

    function sendingExam() {
      ApplicationStateService.activateExamSending();
    }

    function onInit() {
      _loadLoggedUser();
      EventService.onLogin(_loadLoggedUser);
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
