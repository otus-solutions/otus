(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantBox', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-participant-box/dashboard-participant-box-template.html',
      bindings: {
        onClose: '&'
      }
    });

  Controller.$inject = [
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.user.business.UserAccessPermissionService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService'
  ];

  function Controller(EventService, DashboardService, UserAccessPermissionService, ApplicationStateService, ParticipantLaboratoryService) {
    var self = this;
    self.userHaveLaboratoryAccessPermissio;

    /* Public methods */
    self.loadParticipantActivities = loadParticipantActivities;
    self.loadParticipantReports = loadParticipantReports;
    self.loadLaboratory = loadLaboratory;
    self.home = home;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.isEmpty = true;
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      _getCheckingExist();
      UserAccessPermissionService.getCheckingLaboratoryPermission().then(response => {
        self.userHaveLaboratoryAccessPermission = response;
      });
    }

    function home() {
      ApplicationStateService.activateParticipantDashboard();
      self.onClose();
    }

    function loadParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
      self.onClose();
    }

    function loadParticipantReports() {
      ApplicationStateService.activateParticipantReports();
    }

    function loadLaboratory() {
      ApplicationStateService.activateLaboratory();
      self.onClose();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function (participantData) {
            self.selectedParticipant = participantData;
            self.isEmpty = false;
          });
      }
    }

    function _getCheckingExist() {
      ParticipantLaboratoryService.getCheckingExist()
        .then(function (response) {
          self.laboratoryChecking = response;
        });
    }
  }
}());
