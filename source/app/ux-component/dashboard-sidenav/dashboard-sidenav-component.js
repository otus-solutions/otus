(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardSidenav', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-sidenav/dashboard-sidenav-template.html',
      bindings: {
        participant: '<'
      },
      transclude: {
        'hideHomeButton':'?hideHomeButton',
        'hideParticipantBox':'?hideParticipantBox'
      }
    });

  Controller.$inject = [
    '$mdComponentRegistry',
    '$mdSidenav',
    'otusjs.user.access.service.LogoutService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.participant.core.ContextService',
    'THEME_CONSTANTS'
  ];

  function Controller($mdComponentRegistry, $mdSidenav,
                      LogoutService, ApplicationStateService, ParticipantContextService, THEME_CONSTANTS) {
    const self = this;
    const SIDENAV_ORIGIN = 'left';

    /* Public methods */
    self.$onInit = onInit;
    self.close = close;
    self.logout = logout;
    self.loadParticipantActivities = loadParticipantActivities;
    self.loadParticipantReports = loadParticipantReports;
    self.home = home;
    self.importActivity = importActivity;

    function onInit() {
      self.projectName = THEME_CONSTANTS.projectName;
      self.iconImage = THEME_CONSTANTS.imageURLs.favicon;
    }

    function close() {
      $mdSidenav(SIDENAV_ORIGIN).toggle();
    }

    function logout() {
      LogoutService.logout();
    }

    function home() {
      ParticipantContextService.removeData('selectedParticipant');
      ApplicationStateService.activateDashboard();
    }

    function importActivity() {
      ParticipantContextService.removeData('selectedParticipant');
      ApplicationStateService.activateActivityImport();
    }

    function loadParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
    }

    function loadParticipantReports() {
      ApplicationStateService.activateParticipantReports();
    }

    function getStateName() {
      ApplicationStateService.getStateName();
    }

  }
}());
