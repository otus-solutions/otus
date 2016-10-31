(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .constant('STATE', {
      'ACCESS': 'access',
      'INSTALLER': 'installer',
      'SESSION': 'session',
      'DASHBOARD': 'dashboard',
      'LOGIN': 'login',
      'SIGNUP': 'signup',
      'SIGNUP_RESULT': 'signup-result'
    })
    .config(Configuration);

  Configuration.$inject = [
    '$urlRouterProvider',
    'otusjs.otus.configuration.state.LoginStateProvider'
  ];

  function Configuration($urlRouterProvider, LoginStateProvider) {
    /* Default state (route) */
    $urlRouterProvider.otherwise(LoginStateProvider.state.url);
    // $locationProvider.html5Mode(true);
  }
}());
