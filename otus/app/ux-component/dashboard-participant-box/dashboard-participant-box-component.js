(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantBox', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-participant-box/dashboard-participant-box-template.html'
    });

  Controller.$inject = [
    '$element',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.participant.core.ContextService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService'
  ];

  function Controller($element, ApplicationStateService, ParticipantContextService, EventService, DashboardService) {
    var self = this;

    /* Public methods */
    self.loadParticipantActivities = loadParticipantActivities;
    self.loadParticipantReports = loadParticipantReports;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function loadParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
    }

    function loadParticipantReports() {
      ApplicationStateService.activateParticipantReports();
    }

    function onInit() {
      // $element.hide();
      self.isEmpty = true;
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        // $element.show();
        self.isEmpty = false;
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function(participantData) {
            self.selectedParticipant = participantData;
            // $element.show();
            self.isEmpty = false;
          });
      }
    }
  }
}());
