(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardSidenav', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-sidenav/dashboard-sidenav-template.html',
      bindings: {
        participant: '<'
      }
    });

  Controller.$inject = [
    '$mdComponentRegistry',
    'otusjs.user.access.service.LogoutService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($mdComponentRegistry, LogoutService, ApplicationStateService) {
    var self = this;
    var _sideNav = null;
    var SIDENAV_ORIGIN = 'left';

    /* Public methods */
    self.close = close;
    self.logout = logout;
    self.loadParticipantActivities = loadParticipantActivities;
    self.loadParticipantReports = loadParticipantReports;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function close() {
      _sideNav.toggle();
    }

    function logout() {
      LogoutService.logout();
    }

    function loadParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
    }

    function loadParticipantReports() {
      ApplicationStateService.activateParticipantReports();
    }

    function onInit() {
      $mdComponentRegistry
        .when(SIDENAV_ORIGIN)
        .then(function(sidenav) {
          _sideNav = sidenav;
        });
    }
  }
}());
