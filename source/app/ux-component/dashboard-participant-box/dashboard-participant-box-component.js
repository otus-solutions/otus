(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantBox', {
      controller: 'otusParticipantBoxCtrl as $ctrl',
      templateUrl: 'app/ux-component/dashboard-participant-box/dashboard-participant-box-template.html',
      bindings: {
        onClose: '&'
      }
    })
    .controller('otusParticipantBoxCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.user.business.UserAccessPermissionService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'STATE',
    '$mdColors',
  ];

  function Controller(EventService, DashboardService, UserAccessPermissionService, ApplicationStateService, ParticipantLaboratoryService, STATE, $mdColors) {
    var self = this;

    /* Public methods */
    self.loadParticipantActivities = loadParticipantActivities;
    self.loadParticipantActivityStage = loadParticipantActivityStage;
    self.loadParticipantReports = loadParticipantReports;
    self.loadUserCommentAboutParticipant = loadUserCommentAboutParticipant;
    self.loadLaboratory = loadLaboratory;
    self.loadFollowUps = loadFollowUps;
    self.home = home;
    self.selectedStateColor = selectedStateColor;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.isEmpty = true;
      self.state = STATE;
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      _getCheckingExist();
      _checkingActivityPermission();
    }

    function home() {
      ApplicationStateService.activateParticipantDashboard();
      self.onClose();
    }

    function loadParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
      self.onClose();
    }

    function loadParticipantActivityStage() {
      ApplicationStateService.activateParticipantActivityStage();
      self.onClose();
    }

    function loadParticipantReports() {
      ApplicationStateService.activateParticipantReports();
    }

    function loadLaboratory() {
      ApplicationStateService.activateLaboratory();
      self.onClose();
    }

    function loadFollowUps() {
      ApplicationStateService.activateParticipantFollowUps();
      self.onClose();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
      } else {
        DashboardService.getSelectedParticipant()
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
          if (self.laboratoryChecking) {
            _checkingLaboratoryPermission();
          }
        });
    }

    function _checkingLaboratoryPermission() {
      UserAccessPermissionService.getCheckingLaboratoryPermission().then(response => {
        self.userAccessToLaboratory = response;
      });
    }

    function _checkingActivityPermission() {
      return UserAccessPermissionService.getCheckingActivityPermission().then(response => {
        self.userAccessToActivity = response;
      });
    }

    function loadUserCommentAboutParticipant() {
      ApplicationStateService.userCommentAboutParticipant();
    }

    function selectedStateColor(selected) {
      if (selected == ApplicationStateService.getCurrentState()) {
        return _menuSelectedColor();
      }
      return { background: '##f5f5f5'};
    }

    function _menuSelectedColor() {
      return { background: $mdColors.getThemeColor('primary-hue-1-0.41')};
    }

  }
}());
