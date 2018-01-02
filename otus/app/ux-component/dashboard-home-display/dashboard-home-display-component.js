(function() {
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
    self.sampleTransportDashboard = sampleTransportDashboard;
    self.ExamsLotDashboard = ExamsLotDashboard;
    self.ResultUploadDashboard = ResultUploadDashboard;
    self.setFocus = setFocus;
    self.$onInit = onInit;

    /* Public methods */
    function sampleTransportDashboard() {
      ApplicationStateService.activateSampleTransportation();
    }

    function ExamsLotDashboard() {
      ApplicationStateService.activateExamsLotsDashBoard();
    }

    function ResultUploadDashboard() {
      ApplicationStateService.activateExamResultUpload();
    }

    function setFocus() {
      setTimeout(function() {
        document.querySelector('#participantSearchAutoCompleteId').focus();
      }, 0);
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
          .then(function(userData) {
            self.loggedUser = userData;
          });
      }
    }
  }
}());
