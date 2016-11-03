(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard')
    .component('otusDashboardSidenavLauncher', {
      controller: Controller,
      templateUrl: 'app/session/dashboard/component/sidenav-launcher/dashboard-sidenav-launcher-template.html'
    });

  Controller.$inject = [
    '$mdSidenav'
  ];

  function Controller($mdSidenav) {
    var self = this;
    var _sideNav = null;

    var SIDENAV_ORIGIN = 'left';

    /* Public methods */
    self.launchSidenav = launchSidenav;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function launchSidenav() {
      _sideNav.toggle();
    }

    function onInit() {
      _sideNav = $mdSidenav(SIDENAV_ORIGIN);
    }
  }
}());
