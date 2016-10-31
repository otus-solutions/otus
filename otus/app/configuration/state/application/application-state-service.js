(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .service('otusjs.otus.configuration.state.ApplicationStateService', Service);

  Service.$inject = [
    'STATE',
    '$state'
  ];

  function Service(STATE, $state) {
    var self = this;

    /* Public Interface */
    self.activateInstaller = activateInstaller;
    self.activateLogin = activateLogin;
    self.activateDashboard = activateDashboard;
    self.activateSignup = activateSignup;
    self.activateSignupResult = activateSignupResult;
    // self.activateErrorOffline = activateErrorOffline;

    function activateInstaller() {
      $state.go(STATE.INSTALLER);
    }

    function activateLogin() {
      $state.go(STATE.LOGIN);
    }

    function activateDashboard() {
      $state.go(STATE.DASHBOARD);
    }

    function activateSignup() {
      self.currentState = 'Instalador do Sistema';
      $state.go(STATE.SIGNUP);
    }

    function activateSignupResult() {
      self.currentState = 'Instalador do Sistema';
      $state.go(STATE.SIGNUP_RESULT);
    }

    // function activateErrorOffline() {
    //   self.currentState = 'Offline';
    //   $state.go(APP_STATE.ERROR_OFFLINE);
    // }
  }
}());
