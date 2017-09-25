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
    '$mdSidenav'
  ];

  function Controller($mdComponentRegistry, $mdSidenav) {
    var self = this;
    var _sideNav = null;

    var SIDENAV_ORIGIN = 'left';

    /* Public methods */
    self.launchSidenav = launchSidenav;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function launchSidenav() {
      // if (_sideNav) {
      $mdSidenav(SIDENAV_ORIGIN).toggle();
      // }
    }

    function onInit() {
      // $mdComponentRegistry
      //   .when(SIDENAV_ORIGIN)
      //   .then(function(sidenav) {
      //     console.log('');
      //     _sideNav = sidenav;
      //   });
    }
  }
}());
