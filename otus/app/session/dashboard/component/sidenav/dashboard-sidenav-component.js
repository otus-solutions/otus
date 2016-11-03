(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard')
    .component('otusDashboardSidenav', {
      controller: Controller,
      templateUrl: 'app/session/dashboard/component/sidenav/dashboard-sidenav-template.html',
      bindings: {
        participant: '<'
      }
    });

  Controller.$inject = [
    '$mdSidenav',
    'LogoutService',
    'otusjs.otus.participant.context.ParticipantContextService'
  ];

  function Controller($mdSidenav, LogoutService, ParticipantContextService) {
    var self = this;

    /* Public methods */
    self.close = close;
    self.logout = logout;

    function close() {
      $mdSidenav('left').toggle();
    }

    function logout() {
      LogoutService.logout();
    }

    function openHome() {
      $mdSidenav('left').toggle();
    }
  }
}());
