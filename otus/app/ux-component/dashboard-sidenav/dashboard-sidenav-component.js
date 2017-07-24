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
      transclude: true
    });

  Controller.$inject = [
    '$mdComponentRegistry',
    'otusjs.user.access.service.LogoutService',
    'otusjs.application.state.ApplicationStateService',
    '$mdSidenav',
    'otusjs.participant.core.ContextService'
  ];

  function Controller($mdComponentRegistry, LogoutService, ApplicationStateService, $mdSidenav, ParticipantContextService) {
    var self = this;
    var _sideNav = null;
    var SIDENAV_ORIGIN = 'left';

    /* Public methods */
    self.close = close;
    self.logout = logout;
    self.loadParticipantActivities = loadParticipantActivities;
    self.loadParticipantReports = loadParticipantReports;
    self.home = home;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function close() {
      // _sideNav.toggle();
      $mdSidenav(SIDENAV_ORIGIN).toggle();
    }

    function logout() {
      LogoutService.logout();
    }

    function home() {
      ParticipantContextService.removeData('selectedParticipant');
      ApplicationStateService.activateDashboard();
    }

    function loadParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
    }

    function loadParticipantReports() {
      ApplicationStateService.activateParticipantReports();
    }

    function onInit() {
      // $mdComponentRegistry
      //   .when(SIDENAV_ORIGIN)
      //   .then(function(sidenav) {
      //     _sideNav = sidenav;
      //   });
    }
  }
}());
