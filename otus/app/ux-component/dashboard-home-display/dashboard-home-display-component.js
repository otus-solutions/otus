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
    self.createParticipantDashboard = createParticipantDashboard;
    self.ExamsDashboard = ExamsDashboard;
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

    function createParticipantDashboard() {
      ApplicationStateService.activateCreateParticipant();
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


    self.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: "otusParticipantCreateCtrl as $ctrl",
        template: '<otus-participant-create></otus-participant-create>',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true // Only for -xs, -sm breakpoints.
      });
    };

  }
}());
