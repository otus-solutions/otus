(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .config(Configuration);

  Configuration.$inject = [
    '$urlRouterProvider',
    '$stateProvider',
    'otusjs.otus.configuration.state.AccessStateProvider',
    'otusjs.otus.configuration.state.LoginStateProvider',
    'otusjs.otus.configuration.state.SignupStateProvider',
    'otusjs.otus.configuration.state.SignupResultStateProvider'
  ];

  function Configuration($urlRouterProvider, $stateProvider, AccessStateProvider, LoginStateProvider, SignupStateProvider, SignupResultStateProvider) {
    $stateProvider.state(AccessStateProvider.state);
    $stateProvider.state(LoginStateProvider.state);
    $stateProvider.state(SignupStateProvider.state);
    $stateProvider.state(SignupResultStateProvider.state);
  }
}());
