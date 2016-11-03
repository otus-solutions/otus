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
    'LogoutService'
  ];

  function Controller($mdSidenav, LogoutService) {
    var self = this;
    var _sideNav = null;
    var SIDENAV_ORIGIN = 'left';

    /* Public methods */
    self.close = close;
    self.logout = logout;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function close() {
      _sideNav.toggle();
    }

    function logout() {
      LogoutService.logout();
    }

    function onInit() {
      _sideNav = $mdSidenav(SIDENAV_ORIGIN);
    }
  }
}());
