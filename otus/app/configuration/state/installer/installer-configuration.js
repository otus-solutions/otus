(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .config(Configuration);

  Configuration.$inject = [
    '$stateProvider',
    'otusjs.otus.configuration.state.InstallerStateProvider'
  ];

  function Configuration($stateProvider, InstallerStateProvider) {
    $stateProvider.state(InstallerStateProvider.state);
  }
}());
