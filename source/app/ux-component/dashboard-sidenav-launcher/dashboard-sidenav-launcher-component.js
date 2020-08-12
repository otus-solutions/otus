(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardSidenavLauncher', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-sidenav-launcher/dashboard-sidenav-launcher-template.html'
    });

  Controller.$inject = [
    '$mdComponentRegistry',
    '$mdSidenav',
    'THEME_CONSTANTS'
  ];

  function Controller($mdComponentRegistry, $mdSidenav, THEME_CONSTANTS) {
    const self = this;
    const SIDENAV_ORIGIN = 'left';

    /* Public methods */
    self.$onInit = onInit;
    self.launchSidenav = launchSidenav;

    function onInit() {
      self.projectName = THEME_CONSTANTS.projectName;
    }

    function launchSidenav() {
      $mdSidenav(SIDENAV_ORIGIN).toggle();
    }

  }
}());
