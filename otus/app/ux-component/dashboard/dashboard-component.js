(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard/dashboard-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
      ApplicationStateService.activateParticipantActivities();
    }

    /* Lifecycle methods */
    function onInit() {
      self.selectedParticipant = null;
    }
  }
}());
