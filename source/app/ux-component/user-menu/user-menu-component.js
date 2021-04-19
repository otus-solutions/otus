(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserMenu', {
      controller: 'otusUserMenuCtrl as $ctrl',
      templateUrl: 'app/ux-component/user-menu/user-menu-template.html',
      bindings: {
        loggedUser: '<'
      }
    })
    .controller('otusUserMenuCtrl', Controller)

  Controller.$inject = [
    'THEME_CONSTANTS',
    'otusjs.user.access.service.LogoutService',
    'STATE'
  ];

  function Controller(THEME_CONSTANTS, LogoutService, STATE) {
    const self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.logout = logout;

    function onInit() {
      self.projectName = THEME_CONSTANTS.projectName;
    }

    function logout() {
      LogoutService.logout();
    }
  }
}());
