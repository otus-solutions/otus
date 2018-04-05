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
    'STATE'
  ];

  function Controller(ContextService, EventService, ApplicationStateService, ProjectContextService, STATE) {
    var self = this;
    self.setFocus = setFocus;
    self.sampleTransportDashboard = sampleTransportDashboard;
    self.ExamsDashboard = ExamsDashboard;
    self.sendingExam = sendingExam;
    self.$onInit = onInit;

    /* Public methods */
    function setFocus() {
      setTimeout(function () {
        document.querySelector('#participantSearchAutoCompleteId').focus();
      }, 0);
    }

    function sampleTransportDashboard() {
      ApplicationStateService.activateSampleTransportation();
    }

    function ExamsDashboard() {
      ApplicationStateService.activateExamsLotsManagerList()
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
