(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardSidenavLauncher', {
      controller: 'otusDashboardSidenavLauncherCtrl as $ctrl',
      templateUrl: 'app/ux-component/dashboard-sidenav-launcher/dashboard-sidenav-launcher-template.html'
    })
    .controller('otusDashboardSidenavLauncherCtrl', Controller)

  Controller.$inject = [
    '$mdSidenav',
    'THEME_CONSTANTS',
    'otusjs.application.state.ApplicationStateService',
    'STATE'
  ];

  function Controller($mdSidenav, THEME_CONSTANTS, ApplicationStateService, STATE) {
    const self = this;
    const SIDENAV_ORIGIN = 'left';

    /* Public methods */
    self.$onInit = onInit;
    self.launchSidenav = launchSidenav;
    self.verifyStateParticipantDashboard = verifyStateParticipantDashboard;

    function onInit() {
      self.projectName = THEME_CONSTANTS.projectName;
    }

    function launchSidenav() {
      $mdSidenav(SIDENAV_ORIGIN).toggle();
    }

    function verifyStateParticipantDashboard() {
      let selectedState = ApplicationStateService.getCurrentState();
      let response = false;

      switch (selectedState) {
        case STATE.PARTICIPANT_ACTIVITY: {
          response = true;
          break;
        }
        case STATE.PARTICIPANT_DASHBOARD: {
          response = true;
          break;
        }
        case STATE.PARTICIPANT_REPORT: {
          response = true;
          break;
        }
        case STATE.PARTICIPANT_ACTIVITY_STAGE: {
          response = true;
          break;
        }
        case STATE.LABORATORY: {
          response = true;
          break;
        }
        case STATE.USER_COMMENT_ABOUT_PARTICIPANT: {
          response = true;
          break;
        }
        case STATE.PARTICIPANT_FOLLOW_UPS: {
          response = true;
          break;
        }
        default: {
          break;
        }
      }

      return response;
    }
  }
}());
