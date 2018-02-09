(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-display/dashboard-display-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    self.goToParticipantReport = goToParticipantReport;

    function goToParticipantReport() {
      ApplicationStateService.activateParticipantReports();
    }
  }
}());
