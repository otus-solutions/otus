(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantDashboardToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-dashboard-toolbar/participant-dashboard-toolbar-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    self.managerParticipantsDashboard = managerParticipantsDashboard;


    function managerParticipantsDashboard() {
      ApplicationStateService.activateParticipantsList();
    }
  }
}());
