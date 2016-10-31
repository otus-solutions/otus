(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .config(Configuration);

  Configuration.$inject = [
    '$stateProvider',
    'otusjs.otus.configuration.state.DashboardStateProvider',
    'otusjs.otus.configuration.state.SessionStateProvider'
  ];

  function Configuration($stateProvider, DashboardStateProvider, SessionStateProvider) {
    $stateProvider.state(DashboardStateProvider.state);
    $stateProvider.state(SessionStateProvider.state);
  }
}());
