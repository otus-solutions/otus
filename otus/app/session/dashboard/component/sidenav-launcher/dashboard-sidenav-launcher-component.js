(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard')
    .component('otusDashboardSidenavLauncher', {
      controller: Controller,
      templateUrl: 'app/session/dashboard/component/sidenav-launcher/dashboard-sidenav-launcher-template.html'
    });

  Controller.$inject = [
    '$mdSidenav',
    'LogoutService'
  ];

  function Controller($mdSidenav, LogoutService) {
    var self = this;

    /* Public methods */
    self.open = open;

    function open() {
      $mdSidenav('left').toggle();
    }
  }
}());
